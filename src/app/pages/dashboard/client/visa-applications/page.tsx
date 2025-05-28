"use client";
import React, { useEffect, useState } from "react";

import { DashboardSidebar } from "@/components/dashboard-sidebar";

import axios from "axios";
import { Visa } from "@/types";
import Cookies from "js-cookie";
import { VisaModal } from "@/components/modals/visa-modal";
import { FileText, Upload, Filter, X } from "lucide-react";
import DataTable from "@/components/DataTable";
import PaymentButton from "@/components/PaymentButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";

interface VisaApplication {
  _id: string;
  fullName: string;
  destinationCountry: string;
  travelDate: string;
  travelDurationInDays: number;
  applicationStatus: string;
  priority: string;
}

interface FilterParams {
  fromDate: string;
  toDate: string;
  status: string;
  priority: string;
}

const VisaApplication = () => {
  const [visaApplications, setVisaApplications] = useState<Visa[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterParams>({
    fromDate: "",
    toDate: "",
    status: "",
    priority: "",
  });

  const rowsPerPage = 10;

  const handleOpenModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleSubmitForm = (formType: string) => {
    handleCloseModal();
    // setApprovalModal(formType);
  };

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      status: "",
      priority: "",
    });
    setCurrentPage(1);
  };

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    params.append('page', currentPage.toString());
    params.append('limit', rowsPerPage.toString());
    
    if (filters.fromDate) params.append('fromDate', filters.fromDate);
    if (filters.toDate) params.append('toDate', filters.toDate);
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    
    return params.toString();
  };

  const token = Cookies.get("token") || "";

  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const queryString = buildQueryParams();
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/visa-application?${queryString}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVisaApplications(res.data.data.applications);
        setTotalApplications(res.data.data.total);
      } catch (error) {
        console.error("Failed to fetch visa applications", error);
      }
    };

    fetchVisa();
  }, [token, currentPage, filters]);

  const columns = [
    { key: "fullName", label: "Full Name" },
    { key: "destinationCountry", label: "Destination" },
    { key: "phone", label: "Mobile" },
    { key: "email", label: "Email" },
    {
      key: "travelDate",
      label: "Travel Date",
      render: (row: VisaApplication) =>
        new Date(row.travelDate).toLocaleDateString(),
    },
    {
      key: "travelDurationInDays",
      label: "Duration",
      render: (row: VisaApplication) => `${row.travelDurationInDays} days`,
    },
    {
      key: "applicationStatus",
      label: "Status",
      render: (row: VisaApplication) => (
        <span
          className={`capitalize font-medium inline-flex items-center gap-1 ${
            row.applicationStatus.toLowerCase() === "pending"
              ? "text-yellow-600"
              : row.applicationStatus.toLowerCase() === "under review"
              ? "text-blue-600"
              : row.applicationStatus.toLowerCase() === "rejected"
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full inline-block ${
              row.applicationStatus.toLowerCase() === "pending"
                ? "bg-yellow-400"
                : row.applicationStatus.toLowerCase() === "under review"
                ? "bg-blue-400"
                : row.applicationStatus.toLowerCase() === "rejected"
                ? "bg-red-400"
                : "bg-green-400"
            }`}
          ></span>
          {row.applicationStatus}
        </span>
      ),
    }, 
    // {
    //   key: "priority",
    //   label: "Priority",
    //   render: (row: VisaApplication) => (
    //     <span className="capitalize">{row.priority}</span>
    //   ),
    // },
    {
      key: "actions",
      label: "Actions",
      render: (row: VisaApplication) => (
        <div className="flex items-center space-x-2 justify-end">
          <PaymentButton
            token={token}
            currentUser={row._id}
            totalAmount={999}
            productId="product_123"
            selectedAddressId={{ id: "addr_789" }}
          />
          <Button variant="outline" size="sm" asChild>
            <Link href={`/pages/dashboard/client/visatrack?visa_id=${row._id}`}>
              View
            </Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full bg-white shadow">
        <DashboardHeader />
      </div>

      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <div className="fixed top-20 bottom-0 left-0 bg-gray-100 z-40">
          <DashboardSidebar userRole="client" />
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-6 bg-gray-50">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                  Visa Management
                </h1>
                <p className="text-lg text-gray-600 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Upload, view, and manage your Visa
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl shadow hover:shadow-md duration-200 flex items-center gap-2 hover:bg-gray-200 transition-colors"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>

                <button
                  className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl duration-200 flex items-center gap-2 space-x-2 hover:from-amber-500 hover:to-amber-700 transition-colors"
                  onClick={() => handleOpenModal("visa")}
                >
                  <Upload className="w-5 h-5" />
                  Upload Visa Application
                </button>
              </div>

              <VisaModal
                isOpen={activeModal === "visa"}
                onClose={handleCloseModal}
                onSubmit={() => handleSubmitForm("visa")}
                // userId="userId"
              />
            </div>
          </div>

          {/* Filters Section */}
          {showFilters && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filter Applications</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* From Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={filters.fromDate}
                    onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* To Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={filters.toDate}
                    onChange={(e) => handleFilterChange('toDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="under review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Priority Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={filters.priority}
                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div>
            <DataTable<VisaApplication>
              columns={columns}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              rowsPerPage={rowsPerPage}
              totalCount={totalApplications}
              data={visaApplications}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaApplication;