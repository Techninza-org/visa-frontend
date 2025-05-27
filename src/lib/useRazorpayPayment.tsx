import { useState } from "react";

export const useRazorpayPayment = ({
  token,
  currentUser,
  totalAmount,
  productId,
  selectedAddressId,
  router,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failed to load Razorpay SDK.");
        setIsProcessing(false);
        return;
      }

      const amountToPay = totalAmount * 100; // Razorpay expects in paise

      // Step 1: Create Razorpay Order from backend
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/web/create-razorpay-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: amountToPay }),
        }
      );

      const orderData = await orderRes.json();
      if (!orderData?.order?.id) throw new Error("Order creation failed");

      // Step 2: Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: amountToPay,
        currency: "INR",
        name: "ShopNest",
        description: "Complete your purchase",
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            // Step 3: Verify Razorpay Signature
            const formBody = new URLSearchParams();
            formBody.append("razorpay_order_id", response.razorpay_order_id);
            formBody.append("razorpay_payment_id", response.razorpay_payment_id);
            formBody.append("razorpay_signature", response.razorpay_signature);
            formBody.append("amount", amountToPay.toString());
            formBody.append("currency", "INR");
            formBody.append("product_id", productId);

            const verifyRes = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/user/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Authorization: `Bearer ${token}`,
                },
                body: formBody.toString(),
              }
            );

            const verifyData = await verifyRes.json();
            if (
              verifyRes.status !== 200 ||
              verifyData.message !== "Payment verified successfully"
            ) {
              throw new Error("Payment verification failed");
            }

            // Step 4: Final Order Creation
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/create-order`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                paymentMode: "razorpay",
                paymentOrderId: response.razorpay_payment_id,
                orderStatus: "SUCCESS",
                addressId: selectedAddressId, // Ensure this is just the ID, not an object
                gst: 49.0,
                discount: 50.0,
                couponCode: "NEWUSER50",
                totalAmount,
                notes: "Ring the bell on arrival",
              }),
            });

            // Clear cart and redirect
            localStorage.setItem("cartItems", JSON.stringify([]));
            router.push("/order/success");
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Something went wrong during payment verification.");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: currentUser?.username || "Guest",
          email: currentUser?.email || "guest@example.com",
          contact: currentUser?.phone || "",
        },
        theme: {
          color: "#4f46e5",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment initialization failed.");
      setIsProcessing(false);
    }
  };

  return { handleRazorpayPayment, isProcessing };
};
