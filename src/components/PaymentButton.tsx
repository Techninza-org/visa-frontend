"use client";
import { useRouter } from "next/navigation";
import { useRazorpayPayment } from "@/lib/useRazorpayPayment";

const PaymentButton = ({
  token,
  currentUser,
  totalAmount,
  productId,
  selectedAddressId,
}) => {
  const router = useRouter();

  const { handleRazorpayPayment, isProcessing } = useRazorpayPayment({
    token,
    currentUser,
    totalAmount,
    productId,
    selectedAddressId,
    router,
  });

  return (
    <button
      onClick={handleRazorpayPayment}
      disabled={isProcessing}
      className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
    >
      {isProcessing ? "Processing..." : "Pay"}
    </button>
  );
};

export default PaymentButton;
