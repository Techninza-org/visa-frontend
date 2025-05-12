"use client";

import { Suspense } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrackKYC from "@/components/kyctrack";
// import {
//   CheckCircle2,
//   Clock,
//   FileText,
//   AlertCircle,
//   CheckCheck,
// } from "lucide-react";

export default function TrackStatusPage() {
  return (
    <div className="flex ml-8 p-8 bg-gray-50 min-h-screen">
      <DashboardSidebar userRole="client" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              Track Applications
            </h1>
            <p className="text-lg text-gray-600">
              Monitor the status of your visa applications
            </p>
          </div>
        </div>

        <Tabs defaultValue="active" className="mt-8">
          <TabsList className="border-b border-gray-200">
            <TabsTrigger
              value="active"
              className="px-6 py-2 text-lg font-semibold text-gray-700 hover:text-gray-900"
            >
              Active Applications
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="px-6 py-2 text-lg font-semibold text-gray-700 hover:text-gray-900"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="kyc"
              className="px-6 py-2 text-lg font-semibold text-gray-700 hover:text-gray-900"
            >
              KYC Details
            </TabsTrigger>
          </TabsList>

          {/* ...Active and Completed TabsContent (unchanged)... */}
        </Tabs>
        <Suspense fallback={<div>Loading...</div>}>
          <TrackKYC />
        </Suspense>
      </div>
    </div>
  );
}
