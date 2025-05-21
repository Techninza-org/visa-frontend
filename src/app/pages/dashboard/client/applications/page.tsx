import React from "react";
import { ProcessButtons } from "@/components/process-buttons";
import Header from "@/components/header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

const Page = () => {
  return (
    <div>
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar userRole="client" />

        <div className="flex-1 p-4">
          {/* ProcessButtons at the top of main content */}
          <div className="mb-4 mt-20">
            <ProcessButtons />
          </div>

          {/* Other content here if needed */}
        </div>
      </div>
    </div>
  );
};

export default Page;
