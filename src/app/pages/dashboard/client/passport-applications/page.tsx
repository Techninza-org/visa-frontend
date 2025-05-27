"use client";
import React, { useEffect, useState } from "react";

import Header from "@/components/header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { PassportModal } from "@/components/modals/passport-modal";
import axios from "axios";
import { Visa } from "@/types";
import Cookies from "js-cookie";
import { FileText, Upload } from "lucide-react";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VisaApplication } from "@/types/visa-application";

interface PassportProps {
  data: VisaApplication[];
  token: string;
}

const PassportApplication = () => {
  const [PassportApplications, setPassportApplications] = useState<Visa[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);

  const rowsPerPage = 10;
  const token = Cookies.get("token") || "";

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

  useEffect(() => {
    const fetchPassports = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/passport-application?page=${currentPage}&limit=${rowsPerPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Passport Applications:", res.data);

        setPassportApplications(res.data.data.applications);
        setTotalApplications(res.data.data.total);
      } catch (error) {
        console.error("Failed to fetch passport applications", error);
      }
    };

    fetchPassports();
  }, [token]);

  const columns = [
    { key: "fullName", label: "Full Name" },
    { key: "gender", label: "Gender" },
    { key: "maritalStatus", label: "Marital Status" },
    { key: "phone", label: "Mobile" },
    { key: "email", label: "Email" },

    {
      key: "applicationStatus",
      label: "Status",
      render: (row: VisaApplication) => (
        <span
          className={`capitalize font-medium ${
            row.status.toLowerCase() === "pending"
              ? "text-yellow-600"
              : row.status.toLowerCase() === "under review"
              ? "text-blue-600"
              : "text-green-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "priority",
      label: "Priority",
      render: (row: VisaApplication) => (
        <span className="capitalize">{row.priority}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: VisaApplication) => (
        <div className="flex items-center space-x-2 justify-end">
          {/* <PaymentButton
          token={token}
          currentUser={row._id}
          totalAmount={999}
          productId="product_123"
          selectedAddressId={{ id: "addr_789" }}
        /> */}
          <Button variant="outline" size="sm" asChild>
            <Link
              href={`/pages/dashboard/client/passporttrack?pass_id=${row._id}`}
            >
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
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <Header />
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
                  Passport Management
                </h1>
                <p className="text-lg text-gray-600 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Upload, view, and manage your Passport
                </p>
              </div>

              <button
                className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl duration-200 flex items-center gap-2 space-x-2 hover:from-amber-500 hover:to-amber-700 transition-colors"
                onClick={() => handleOpenModal("passport")}
              >
                <Upload className="w-5 h-5" />
                Upload Passport Application
              </button>

              <PassportModal
                isOpen={activeModal === "passport"}
                onClose={handleCloseModal}
                onSubmit={() => handleSubmitForm("passport")}
                userId="userId"
              />
            </div>
          </div>
          <div>
            <DataTable<VisaApplication>
              columns={columns}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              rowsPerPage={rowsPerPage}
              totalCount={totalApplications}
              data={PassportApplications}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportApplication;
