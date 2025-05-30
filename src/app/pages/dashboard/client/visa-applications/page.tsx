"use client";
import React, { useEffect, useState } from "react";

import ChecklistModal from "@/components/modals/ChecklistModal";

import axios from "axios";
import { Visa } from "@/types";
import Cookies from "js-cookie";
import { VisaModal } from "@/components/modals/visa-modal";
import {
  FileText,
  Upload,
  Filter,
  X,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
} from "lucide-react";
import DataTable from "@/components/DataTable";
import PaymentButton from "@/components/PaymentButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface VisaApplication {
  _id: string;
  fullName: string;
  destinationCountry: string;
  travelDate: string;
  travelDurationInDays: number;
  applicationStatus: string;
  priority: string;
  checklist?: Array<{
    _id: string;
    note: string;
    file?: string;
  }>;
  paymentStatus?: boolean;
  totalFee?: number;
}

interface FilterParams {
  fromDate: string;
  toDate: string;
  status: string;
  priority: string;
}

interface ChecklistItem {
  _id: string;
  note: string;
  file?: string;
}

const VisaApplication = () => {
  const [visaApplications, setVisaApplications] = useState<Visa[]>([]);

      const [fetchLoading, setFetchLoading] = useState(true);
  
  const [activeModal, setActiveModal] = useState<{
    name: string;
    id?: string;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterParams>({
    fromDate: "",
    toDate: "",
    status: "",
    priority: "",
  });

  // Add checklist modal state
  const [checklistModal, setChecklistModal] = useState<{
    isOpen: boolean;
    checklist: ChecklistItem[];
    applicationId: string;
  }>({
    isOpen: false,
    checklist: [],
    applicationId: "",
  });

  const rowsPerPage = 10;

  const handleOpenModal = (modalName: string, id?: string) => {
    setActiveModal({ name: modalName, id });
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleSubmitForm = (formType: string) => {
    handleCloseModal();
  };

  // Add checklist modal handler
  const handleCheckListModal = (
    checklist: ChecklistItem[],
    applicationId: string
  ) => {
    setChecklistModal({
      isOpen: true,
      checklist: checklist || [],
      applicationId: applicationId,
    });
  };

  const handleFilterChange = (key: keyof FilterParams, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
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
    params.append("page", currentPage.toString());
    params.append("limit", rowsPerPage.toString());

    if (filters.fromDate) params.append("fromDate", filters.fromDate);
    if (filters.toDate) params.append("toDate", filters.toDate);
    if (filters.status) params.append("status", filters.status);
    if (filters.priority) params.append("priority", filters.priority);

    return params.toString();
  };

  const token = Cookies.get("token") || "";

  const fetchVisa = React.useCallback(async () => {
    try {
      setFetchLoading(true);
      const queryString = buildQueryParams();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/visa-application?${queryString}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVisaApplications(res.data.data.applications);
      setTotalApplications(res.data.data.total);
    } catch (error) {
      console.error("Failed to fetch visa applications", error);
    }finally {
      setFetchLoading(false);
    }

  }, [token, currentPage, filters]);

  useEffect(() => {
    fetchVisa();
  }, [fetchVisa]);

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
      key: "status",
      label: "Status",
      render: (row: VisaApplication) => (
        <div
          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            row.applicationStatus.toLowerCase()
          )}`}
        >
          {getStatusIcon(row.applicationStatus.toLowerCase())}
          <span className="capitalize">
            {row.applicationStatus.toLowerCase()}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: VisaApplication) => (
        <div className="flex items-center space-x-2 justify-end">
          {/* Checklist button - Updated */}
          <button
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl shadow hover:shadow-md duration-200 flex items-center gap-2 hover:bg-gray-200 transition-colors"
            onClick={() => handleCheckListModal(row.checklist || [], row._id)}
          >
            <FileText className="w-5 h-5" />
          </button>

          <button
            className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl duration-200 flex items-center gap-2 space-x-2 hover:from-amber-500 hover:to-amber-700 transition-colors"
            onClick={() => handleOpenModal("visa", row._id)}
          >
            <Edit className="w-5 h-5" />
          </button>

          {!row.paymentStatus && (
            <PaymentButton
              token={token}
              currentUser={row._id}
              totalAmount={row.totalFee}
              productId={row._id}
              selectedAddressId={{ id: "addr_789" }}
            />
          )}
          <Button variant="outline" size="sm" asChild>
            <Link href={`/pages/dashboard/client/visatrack?visa_id=${row._id}`}>
              <Eye className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      ),
    },
  ];


  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
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
              Apply Visa Application
            </button>
          </div>

          <VisaModal
            isOpen={activeModal?.name === "visa"}
            onClose={handleCloseModal}
            onSubmit={() => handleSubmitForm("visa")}
            userId={activeModal?.id}
          />

          {/* Add Checklist Modal */}
          <ChecklistModal
            isOpen={checklistModal.isOpen}
            onClose={() =>
              setChecklistModal({
                isOpen: false,
                checklist: [],
                applicationId: "",
              })
            }
            checklist={checklistModal.checklist}
            applicationId={checklistModal.applicationId}
          />
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Filter Applications
            </h3>
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
                onChange={(e) => handleFilterChange("fromDate", e.target.value)}
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
                onChange={(e) => handleFilterChange("toDate", e.target.value)}
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
                onChange={(e) => handleFilterChange("status", e.target.value)}
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
                onChange={(e) => handleFilterChange("priority", e.target.value)}
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

      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
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
  );
};

export default VisaApplication;
