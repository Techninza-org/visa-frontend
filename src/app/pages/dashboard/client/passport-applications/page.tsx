"use client";
import React, { useEffect, useState } from "react";
import { ProcessButtons } from "@/components/process-buttons";
import Header from "@/components/header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import axios from "axios";
import { Visa } from "@/types";
import Cookies from "js-cookie";
import PassportTable from "@/components/dashboar-components/PassPortTable";

const PassportApplication = () => {
  const [PassportApplications, setPassportApplications] = useState<Visa[]>([]);
  const token = Cookies.get("token") || "";

  useEffect(() => {
    const fetchPassports = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/passport-application`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Passport Applications:", res.data.applications);
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
          <div className="mb-6">
            <ProcessButtons />
          </div>

          <div>
           <PassportTable data={PassportApplications} token={token} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportApplication;
