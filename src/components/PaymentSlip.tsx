import { useRef, useState } from "react";

const PaymentSlip = ({ payment, onClose }) => {
  const invoiceRef = useRef();
  const [selectedPayment, setSelectedPayment] = useState(0);

  // Payment data from the provided response
  const visaPayments = [
    {
      "_id": "6838404bb30f628c035884d1",
      "user": {
        "_id": "6836e9b59fee9347df949138",
        "email": "satishpal9910@gmail.com",
        "name": "satish"
      },
      "order_id": "order_QairiC9M9VmPhG",
      "payment_id": "pay_QaisFZcl1sICU7",
      "product_id": "6836ea9b9fee9347df949150",
      "amount": 6.5,
      "type_of_payment": "visa",
      "status": "success",
      "created_at": "2025-05-29T11:08:59.502Z",
      "productDetails": {
        "_id": "6836ea9b9fee9347df949150",
        "destinationCountry": "India",
        "travelPurpose": "Tourism",
        "travelDate": "2025-05-22T00:00:00.000Z",
        "applicationStatus": "Pending",
        "paymentStatus": "Paid"
      }
    },
    {
      "_id": "68384228b30f628c035884f3",
      "user": {
        "_id": "6836e9b59fee9347df949138",
        "email": "satishpal9910@gmail.com",
        "name": "satish"
      },
      "order_id": "order_Qaj0TAFokrcT7s",
      "payment_id": "pay_Qaj0c1QOLYkOuV",
      "product_id": "68384204b30f628c035884e1",
      "amount": 6.5,
      "type_of_payment": "visa",
      "status": "success",
      "created_at": "2025-05-29T11:16:56.153Z",
      "productDetails": {
        "_id": "68384204b30f628c035884e1",
        "destinationCountry": "India",
        "travelPurpose": "Tourism",
        "travelDate": "2025-05-30T00:00:00.000Z",
        "applicationStatus": "Pending",
        "paymentStatus": "Paid"
      }
    }
  ];

  const currentPayment = visaPayments[selectedPayment];

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const invoiceNumber = `INV-${currentPayment.order_id.replace('order_', '')}`;
  const serviceFee = currentPayment.amount;
  const tax = (serviceFee * 0.18).toFixed(2); // 18% GST
  const totalAmount = (parseFloat(serviceFee) + parseFloat(tax)).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 p-4 print:p-0 print:bg-white">
      <style jsx>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Payment Selection */}
      <div className="no-print max-w-4xl mx-auto mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Select Payment Receipt:</h3>
          <div className="flex gap-4">
            {visaPayments.map((payment, index) => (
              <button
                key={payment._id}
                onClick={() => setSelectedPayment(index)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedPayment === index
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Payment #{index + 1} - ${payment.amount}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={invoiceRef} className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-full">
        <div className="print-area">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">AXE VISA</h1>
                <p className="text-blue-100 mt-2">Professional Visa Services</p>
                <div className="mt-4 text-sm">
                  <p>📧 support@axevisa.com</p>
                  <p>📞 +1 (555) 123-4567</p>
                  <p>🌐 www.axevisa.com</p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white text-blue-800 px-4 py-2 rounded-lg">
                  <div className="text-sm font-medium">INVOICE</div>
                  <div className="text-lg font-bold">{invoiceNumber}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="p-8">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Bill To:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold capitalize">{currentPayment.user.name}</p>
                  <p className="text-gray-600">{currentPayment.user.email}</p>
                  <p className="text-sm text-gray-500 mt-2">Customer ID: {currentPayment.user._id.slice(-8)}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Invoice Details:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice Date:</span>
                    <span className="font-medium">{formatDate(currentPayment.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Date:</span>
                    <span className="font-medium">{formatDate(currentPayment.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{currentPayment.order_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment ID:</span>
                    <span className="font-medium">{currentPayment.payment_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {currentPayment.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Details:</h3>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="mb-3">
                      <span className="text-sm text-gray-600">Destination Country:</span>
                      <p className="font-semibold text-blue-800">{currentPayment.productDetails.destinationCountry}</p>
                    </div>
                    <div className="mb-3">
                      <span className="text-sm text-gray-600">Travel Purpose:</span>
                      <p className="font-medium">{currentPayment.productDetails.travelPurpose}</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-3">
                      <span className="text-sm text-gray-600">Travel Date:</span>
                      <p className="font-medium">{formatDate(currentPayment.productDetails.travelDate)}</p>
                    </div>
                    <div className="mb-3">
                      <span className="text-sm text-gray-600">Application Status:</span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 ml-2">
                        {currentPayment.productDetails.applicationStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary Table */}
            <div className="mb-8">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                    <th className="border border-gray-300 px-4 py-3 text-center">Qty</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">Rate</th>
                    <th className="border border-gray-300 px-4 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">
                      <div>
                        <div className="font-medium">Visa Processing Service</div>
                        <div className="text-sm text-gray-600">
                          {currentPayment.productDetails.travelPurpose} visa for {currentPayment.productDetails.destinationCountry}
                        </div>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">1</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">${serviceFee}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">${serviceFee}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="border border-gray-300 px-4 py-3 text-right font-medium">Subtotal:</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">${serviceFee}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="border border-gray-300 px-4 py-3 text-right font-medium">Tax (18% GST):</td>
                    <td className="border border-gray-300 px-4 py-3 text-right">${tax}</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td colSpan="3" className="border border-gray-300 px-4 py-4 text-right font-bold text-lg">Total Amount:</td>
                    <td className="border border-gray-300 px-4 py-4 text-right font-bold text-lg text-blue-800">
                      ${totalAmount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Information */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">✅ Payment Confirmed</h4>
                <div className="text-sm space-y-1">
                  <p><span className="text-gray-600">Payment Method:</span> <span className="font-medium">VISA Card</span></p>
                  <p><span className="text-gray-600">Transaction ID:</span> <span className="font-medium">{currentPayment.payment_id}</span></p>
                  <p><span className="text-gray-600">Payment Time:</span> <span className="font-medium">{formatTime(currentPayment.created_at)}</span></p>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">📋 Next Steps</h4>
                <div className="text-sm space-y-1">
                  <p>• Check your email for confirmation</p>
                  <p>• Upload required documents</p>
                  <p>• Track application status online</p>
                  <p>• Contact support if needed</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 border-t pt-6">
              <p className="mb-2">Thank you for choosing AXE VISA for your travel needs!</p>
              <p>This is a computer-generated invoice. No signature required.</p>
              <p className="mt-2">For support, contact us at support@axevisa.com or +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Print Button */}
        <div className="no-print p-6 text-center bg-gray-50 border-t">
          <button 
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg mr-4"
          >
            🖨️ Print Invoice
          </button>
          <button 
            onClick={() => window.location.href = `mailto:${currentPayment.user.email}?subject=Invoice ${invoiceNumber}&body=Please find your visa service invoice attached.`}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            📧 Email Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSlip;