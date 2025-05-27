"use client";
import React, { useEffect, useState } from "react";

import Header from "@/components/header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { PassportModal } from "@/components/modals/passport-modal";
import axios from "axios";
import { Visa } from "@/types";
import Cookies from "js-cookie";
import PassportTable from "@/components/dashboar-components/PassPortTable";
import { FileText, Upload } from "lucide-react";

const PassportApplication = () => {
  const [PassportApplications, setPassportApplications] = useState<Visa[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
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
          `${process.env.NEXT_PUBLIC_API_URL}/user/passport-application`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPassportApplications(res.data.applications);
      } catch (error) {
        console.error("Failed to fetch passport applications", error);
      }
    };

    fetchPassports();
  }, [token]);

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
          <div >
            <PassportTable data={PassportApplications} token={token} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportApplication;
