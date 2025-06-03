import { useRef } from "react";

const PaymentSlip = ({ payment, onClose }) => {
  const printRef = useRef();

  const currentPayment = payment;

  const handlePrint = () => {
    const printContent = printRef.current;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const invoiceNumber = `INV-${currentPayment.order_id.replace("order_", "")}`;
  const serviceFee = parseFloat(currentPayment.amount);
  const tax = (serviceFee * 0.18);
  const totalAmount = serviceFee + tax;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <style jsx>{`
        @media print {
          @page {
            size: A4;
            margin: 0.5in;
          }
          body {
            font-size: 11px;
            line-height: 1.4;
            color: #000;
          }
          .no-print {
            display: none !important;
          }
          .print-area {
            box-shadow: none !important;
            margin: 0 !important;
          }
        }
      `}</style>

      {/* Payment Slip */}
      <div ref={printRef} className="print-area max-w-4xl mx-auto bg-white shadow-lg border">
        {/* Header */}
        <div className="text-center py-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Payment Receipt</h1>
          <p className="text-lg font-semibold text-gray-600 mt-1">AXE VISA</p>
          <p className="text-sm text-gray-500">123 Business Avenue, Suite 100</p>
          <p className="text-sm text-gray-500">New York, NY 10001</p>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Customer and Receipt Details */}
          <div className="grid grid-cols-4 gap-6 mb-8 text-sm">
            <div>
              <p className="font-semibold text-gray-700">Receipt Date</p>
              <p className="text-gray-600">: {formatDate(currentPayment.created_at)}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Receipt Period</p>
              <p className="text-gray-600">: {formatDate(currentPayment.created_at)}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Customer Name</p>
              <p className="text-gray-600 capitalize">: {currentPayment.user.name}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Receipt Number</p>
              <p className="text-gray-600">: {invoiceNumber}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Service Type</p>
              <p className="text-gray-600">: Visa Processing</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Destination</p>
              <p className="text-gray-600">: {currentPayment.productDetails.destinationCountry}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Travel Purpose</p>
              <p className="text-gray-600">: {currentPayment.productDetails.travelPurpose}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Email</p>
              <p className="text-gray-600">: {currentPayment.user.email}</p>
            </div>
          </div>

          {/* Payment Summary Table */}
          <table className="w-full border-collapse border border-gray-400 mb-6">
            <thead>
              <tr>
                <th className="border border-gray-400 bg-gray-100 px-4 py-3 text-left font-semibold text-gray-700">
                  Services
                </th>
                <th className="border border-gray-400 bg-gray-100 px-4 py-3 text-right font-semibold text-gray-700">
                  Amount
                </th>
                <th className="border border-gray-400 bg-gray-100 px-4 py-3 text-left font-semibold text-gray-700">
                  Taxes
                </th>
                <th className="border border-gray-400 bg-gray-100 px-4 py-3 text-right font-semibold text-gray-700">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 px-4 py-2">Visa Processing Service</td>
                <td className="border border-gray-400 px-4 py-2 text-right">{serviceFee.toFixed(0)}</td>
                <td className="border border-gray-400 px-4 py-2">GST (18%)</td>
                <td className="border border-gray-400 px-4 py-2 text-right">{tax.toFixed(0)}</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">Service Charges</td>
                <td className="border border-gray-400 px-4 py-2 text-right">0</td>
                <td className="border border-gray-400 px-4 py-2">Processing Fee</td>
                <td className="border border-gray-400 px-4 py-2 text-right">0</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">Additional Services</td>
                <td className="border border-gray-400 px-4 py-2 text-right">0</td>
                <td className="border border-gray-400 px-4 py-2">Other Charges</td>
                <td className="border border-gray-400 px-4 py-2 text-right">0</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-4 py-2">Express Processing</td>
                <td className="border border-gray-400 px-4 py-2 text-right">0</td>
                <td className="border border-gray-400 px-4 py-2"></td>
                <td className="border border-gray-400 px-4 py-2 text-right"></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-400 px-4 py-3 font-semibold">Total Services</td>
                <td className="border border-gray-400 px-4 py-3 text-right font-semibold">{serviceFee.toFixed(0)}</td>
                <td className="border border-gray-400 px-4 py-3 font-semibold">Total Taxes</td>
                <td className="border border-gray-400 px-4 py-3 text-right font-semibold">{tax.toFixed(0)}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-400 px-4 py-3 font-semibold" colSpan="3">Net Pay</td>
                <td className="border border-gray-400 px-4 py-3 text-right font-semibold">{totalAmount.toFixed(0)}</td>
              </tr>
            </tbody>
          </table>

          {/* Amount in Words */}
          <div className="text-center mb-8">
            <p className="text-lg font-semibold text-gray-800">
              {totalAmount.toFixed(0)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {totalAmount < 1000 ? 'Dollars' : totalAmount < 10000 ? 'Thousands' : 'Ten Thousands'} Only
            </p>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-16 mb-8">
            <div className="text-center">
              <div className="border-b border-gray-400 mb-2 pb-8"></div>
              <p className="text-sm font-semibold text-gray-700">Company Signature</p>
            </div>
            <div className="text-center">
              <div className="border-b border-gray-400 mb-2 pb-8"></div>
              <p className="text-sm font-semibold text-gray-700">Customer Signature</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center border-t pt-4">
            <p className="text-xs text-gray-500">This is system generated payment receipt</p>
            <div className="mt-2 text-xs text-gray-400">
              <p>Transaction ID: {currentPayment.payment_id}</p>
              <p>Generated on: {formatDate(new Date())}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center gap-4 no-print">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
        >
          Print Receipt
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold shadow-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentSlip;