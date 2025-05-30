import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";




interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col h-screen ">
        <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar userRole="client" />
        <main className="flex-1 ml-28 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
