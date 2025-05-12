import { DashboardSidebar } from "@/components/dashboard-sidebar";
import VisaTrackDetails from "@/components/visatrack";
import { Suspense } from "react";

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
        <Suspense fallback={<div>Loading...</div>}>
          <VisaTrackDetails />
        </Suspense>
      </div>
    </div>
  );
}
