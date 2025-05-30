"use client";

import { useEffect, useState } from "react";

import {
  Search,
  Download,
  CreditCard,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Receipt,
  Eye,
} from "lucide-react";

import ModalPayment from "@/components/modals/modal-payment";
import PaymentSlip from "@/components/PaymentSlip";
import DataTable from "@/components/DataTable";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import axios from "axios";
import Cookies from "js-cookie";

const PaymentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [payments, setPayments] = useState([]);
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = Cookies.get("token");
  const rowsPerPage = 5;



  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Clock className="h-4 w-4" />;
      case "failed":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };


const fetchPaymentHistory = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/payment-history`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const paymentsRaw = response.data.payments || [];

    // Transform real data to expected structure
    const transformed = paymentsRaw.map((p) => ({
      transactionId: p.payment_id,
      destinationCountry: p.productDetails.destinationCountry,
      // travelPurpose: p.productDetails.travelPurpose,

      purpose: ` ${p.productDetails.travelPurpose || "Other"} `, // You can customize this
      // applicationId: p.order_id,
      amount: p.amount,
      date: new Date(p.created_at).toISOString().split("T")[0],
      method: p.type_of_payment === "visa" ? "Visa" : "Other",
      status: p.status === "success" ? "completed" : p.status,
      receipt: null, // Handle this if receipts are available
      raw: p, // Keep original object if needed later
    }));

    setPayments(transformed);
    console.log("Transformed payment data:", transformed);
  } catch (error) {
    console.error("Error fetching payment history:", error);
  }
};


  useEffect(() => {
    const fetchData = async () => {
      const paymentData = await fetchPaymentHistory();
      if (paymentData) {
        setPayments(paymentData);
      }
    };

    fetchData();
  }
  , [token]);


  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      // payment.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "this-month" && payment.date.startsWith("2024-01")) ||
      (dateFilter === "last-month" && payment.date.startsWith("2023-12"));
    return matchesSearch && matchesStatus && matchesDate;
  });

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleViewReceipt = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  // DataTable columns configuration
  const columns = [
    {
      key: "transactionId",
      label: "Transaction ID",
      render: (payment) => (
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {payment.transactionId}
        </span>
      ),
    },
    {
      key: "purpose",
      label: "Purpose",
      render: (payment) => (
        <div>
          <p className="font-medium text-sm">{payment.purpose}</p>
          <p className="text-xs text-gray-500">
            {/* App ID: {payment.applicationId} */}
          </p>
        </div>
      ),
    },
    {
      key: "destinationCountry",
      label: "Destination Country",
      render: (payment) => (
        <span className="text-sm text-gray-700">
          {payment.destinationCountry || "US"} 
        </span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      render: (payment) => (
        <span className="font-semibold text-green-600">₹{payment.amount}</span>
      ),
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "method",
      label: "Method",
    },
    {
      key: "status",
      label: "Status",
      render: (payment) => (
        <div
          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            payment.status
          )}`}
        >
          {getStatusIcon(payment.status)}
          <span className="capitalize">{payment.status}</span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (payment) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewReceipt(payment)}
            className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>

          {payment.receipt ? (
            <button className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Receipt className="h-4 w-4" />
            </button>
          ) : (
            <button className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md opacity-50 cursor-not-allowed">
              <Receipt className="h-4 w-4" />
            </button>
          )}

          {payment.status === "failed" && (
            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors">
              Retry
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-30  bg-white shadow">
        <DashboardHeader />
      </div>

      <div className="flex flex-1 justify-center">
        <div className="fixed top-20 bottom-0 left-0 bg-gray-100 z-40">
          <DashboardSidebar userRole="client" />
        </div>
        {/* Payment Summary Cards */}
         <div className="flex-1 p-6 max-w-6xl mx-auto mt-20 md:mt-12 lg:mt-12 mr-18 ">
      

        {/* Main Table Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  Payment History
                </h2>
                <p className="text-gray-600 mt-1">
                  View and manage all your payment transactions
                </p>
              </div>
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
                <Download className="h-4 w-4" />
                <span>Export PDF</span>
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search payments, transaction ID, or application..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-year">This Year</option>
              </select>
            </div>
          </div>

          <div className="p-6">
            {/* Enhanced DataTable */}
            <DataTable
              columns={columns}
              data={paginatedPayments}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              totalCount={filteredPayments.length}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Modal for Payment Slip */}
        <ModalPayment
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Payment Receipt"
        >
          {selectedPayment && <PaymentSlip payment={selectedPayment} />}
        </ModalPayment>
      </div>
    </div>
      </div>
  );
};

export default PaymentsPage;

export { PaymentsPage };
