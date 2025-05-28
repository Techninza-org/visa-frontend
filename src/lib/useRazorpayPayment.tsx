import { useState } from "react";
import Cookies from "js-cookie";

export const useRazorpayPayment = ({
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
    const token = Cookies.get("token");
    setIsProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failed to load Razorpay SDK.");
        setIsProcessing(false);
        return;
      }

      const amountToPay = totalAmount * 100; // in paise

      // Step 1: Call /user/create-order to get Razorpay Order ID
      const formBody = new URLSearchParams();
      formBody.append("amount", amountToPay.toString());

      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          body: formBody.toString(),
        }
      );

      const orderData = await orderRes.json();

      console.log("Order Data:", orderData);

      if (!orderData?.id) {
        throw new Error("Failed to create order or fetch Razorpay order ID.");
      }

      // Step 2: Initialize Razorpay payment
      const options = {
        key:"rzp_test_eaw8FUWQWt0bHV",
        amount: amountToPay,
        currency: "INR",
        name: "ShopNest",
        description: "Complete your purchase",
        order_id: orderData.id,
        handler: async function (response) {
          console.log("Payment Response:", response);
          try {
            const verifyBody = new URLSearchParams();
            verifyBody.append("razorpay_order_id", response.razorpay_order_id);
            verifyBody.append(
              "razorpay_payment_id",
              response.razorpay_payment_id
            );
            verifyBody.append(
              "razorpay_signature",
              response.razorpay_signature
            );
            verifyBody.append("product_id", productId);
            verifyBody.append("amount", totalAmount.toString());
           
            
          

            const verifyRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/user/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Authorization: `Bearer ${token}`,
                },
                body: verifyBody.toString(),
              }
            );

            const verifyData = await verifyRes.json();
            console.log("Verification Data:", verifyData);
            if (
              verifyRes.status !== 200 ||
              verifyData.message !== "Payment verified successfully"
            ) {
              throw new Error("Payment verification failed");
            }

          
      
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
