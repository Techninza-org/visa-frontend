"use client";
import React, { useEffect, useState, JSX } from "react";

import ChecklistModal from "@/components/modals/ChecklistModal";

import axios from "axios";

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
  CreditCard,
  CalendarDays,
  Phone,
  Mail,
  Loader2,
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
  const [visaApplications, setVisaApplications] = useState<any[]>([]);

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

interface StatusColorMap {
  [key: string]: string;
}

const getStatusColor = (status: string): string => {
  const colorMap: StatusColorMap = {
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-200/50",
    pending: "bg-amber-50 text-amber-700 border-amber-200 ring-amber-200/50",
    processing: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-200/50",
    failed: "bg-red-50 text-red-700 border-red-200 ring-red-200/50",
  };
  return colorMap[status] || "bg-gray-50 text-gray-700 border-gray-200 ring-gray-200/50";
};


const getStatusIcon = (status: string): JSX.Element => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-emerald-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-amber-600" />;
    case "processing":
      return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
    case "failed":
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

interface VisaApplicationRow extends VisaApplication {
  phone?: string;
  email?: string;
}

interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
}

const columns: Column<VisaApplicationRow>[] = [
  { 
    key: "fullName", 
    label: "Full Name",
    render: (row: VisaApplicationRow) => (
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {row.fullName?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{row.fullName}</p>
          <p className="text-sm text-gray-500">ID: {row._id?.slice(-6)}</p>
        </div>
      </div>
    )
  },
  { 
    key: "destinationCountry", 
    label: "Destination",
    render: (row: VisaApplicationRow) => (
      <div className="flex items-center space-x-2">
        <div className="w-6 h-4 rounded-sm bg-gray-200 flex items-center justify-center">
          <span className="text-xs">🌍</span>
        </div>
        <span className="font-medium text-gray-900">{row.destinationCountry || "N/A"}</span>
      </div>
    )
  },
  { 
    key: "phone", 
    label: "Contact",
    render: (row: VisaApplicationRow) => (
      <div className="space-y-1">
        <div className="flex items-center space-x-2 text-sm">
          <Phone className="h-3 w-3 text-gray-400" />
          <span className="text-gray-900">{row.phone || "N/A"}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Mail className="h-3 w-3 text-gray-400" />
          <span className="text-gray-600 truncate max-w-32">{row.email || "N/A"}</span>
        </div>
      </div>
    )
  },
  {
    key: "travelDate",
    label: "Travel Details",
    render: (row: VisaApplicationRow) => (
      <div className="space-y-1">
        <div className="flex items-center space-x-2 text-sm">
          <CalendarDays className="h-3 w-3 text-gray-400" />
          <span className="text-gray-900 font-medium">
            {new Date(row.travelDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            }) || "N/A"}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="h-3 w-3 text-gray-400" />
          <span className="text-gray-600">{row.travelDurationInDays || "N/A"} days</span>
        </div>
      </div>
    )
  },
  {
    key: "status",
    label: "Status",
    render: (row: VisaApplicationRow) => (
      <div className="flex flex-col space-y-2">
        <div
          className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold border ring-1 ${getStatusColor(
            row.applicationStatus.toLowerCase()
          )}`}
        >
          {getStatusIcon(row.applicationStatus.toLowerCase())}
          <span className="capitalize">
            {row.applicationStatus.toLowerCase()}
          </span>
        </div>
        {row.paymentStatus === false && (
          <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs bg-orange-50 text-orange-700 border border-orange-200">
            <CreditCard className="h-3 w-3" />
            <span>Payment Due</span>
          </div>
        )}
      </div>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (row: VisaApplicationRow) => (
      <div className="flex items-center justify-end space-x-2">
        {/* Checklist Button */}
        <button
          className="group relative bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          onClick={() => handleCheckListModal(row.checklist || [], row._id)}
          title="View Checklist"
        >
          <FileText className="w-4 h-4" />
          <span className="sr-only">Checklist</span>
        </button>

        {/* Edit Button */}
        <button
          className="group relative bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          onClick={() => handleOpenModal("visa", row._id)}
          title="Edit Application"
        >
          <Edit className="w-4 h-4" />
          <span className="sr-only">Edit</span>
        </button>

        {/* Payment Button */}
        {row.paymentStatus === false && (
          <div className="relative">
            <PaymentButton
              token={token}
              currentUser={row._id}
              totalAmount={row.totalFee}
              productId={row._id}
              selectedAddressId={{ id: "addr_789" }}
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* View Details Button */}
        <Button 
          variant="outline" 
          size="sm" 
          asChild
          className="bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          <Link 
            href={`/pages/dashboard/client/visatrack?visa_id=${row._id}`}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View</span>
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
