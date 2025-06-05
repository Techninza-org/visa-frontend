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
      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl shadow hover:shadow-md duration-200 flex items-center gap-2 hover:bg-gray-200 transition-colors"
    >
      {isProcessing ? "Processing..." : "Pay"}
    </button>
  );
};

export default PaymentButton;
