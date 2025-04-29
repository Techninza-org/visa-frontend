"use client"
import Image from "next/image";
import Link from "next/link";
import { AppSidebar } from "../../../components/app-sidebar"
import { Header } from "../../header"
import { StatusCard } from "../../status-card"
import { ApplicationTimeline } from "../../../components/application-timeline"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  // Removed unused activeTab state

  // Sample data - in a real app, this would come from an API
  const applications: {
    passport: {
      status: "pending" | "approved" | "rejected" | "in-review"
      appliedDate: string
      approvedDate: string | null
      estimatedDays: number
      daysRemaining: number
      documentNumber: string
      expiryDate: string
    }
    visa: {
      status: "pending" | "approved" | "rejected" | "in-review"
      appliedDate: string
      approvedDate: string | null
      estimatedDays: number
      daysRemaining: number
      country: string
      type: string
    }
    kyc: {
      status: "pending" | "approved" | "rejected" | "in-review"
      appliedDate: string
      approvedDate: string | null
      estimatedDays: number
      daysRemaining: number
    }
  } = {
    passport: {
      status: "approved",
      appliedDate: "2023-12-10",
      approvedDate: "2024-01-15",
      estimatedDays: 30,
      daysRemaining: 0,
      documentNumber: "P12345678",
      expiryDate: "2034-01-15",
    },
    visa: {
      status: "pending",
      appliedDate: "2024-03-20",
      approvedDate: null,
      estimatedDays: 45,
      daysRemaining: 15,
      country: "United States",
      type: "Tourist (B2)",
    },
    kyc: {
      status: "in-review",
      appliedDate: "2024-03-15",
      approvedDate: null,
      estimatedDays: 7,
      daysRemaining: 2,
    },
  }

  return (
    <div>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex ml-32 min-h-screen flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-6 ml-32">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight">Welcome back, John Doe</h1>
              <p className="text-muted-foreground">Track your applications and manage your travel documents</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <StatusCard
                title="Passport Application"
                status={applications.passport.status}
                appliedDate={applications.passport.appliedDate}
                estimatedDays={applications.passport.estimatedDays}
                daysRemaining={applications.passport.daysRemaining}
              />
              <StatusCard
                title="Visa Application"
                status={applications.visa.status}
                appliedDate={applications.visa.appliedDate}
                estimatedDays={applications.visa.estimatedDays}
                daysRemaining={applications.visa.daysRemaining}
                country={applications.visa.country}
                type={applications.visa.type}
              />
              <StatusCard
                title="KYC Verification"
                status={applications.kyc.status}
                appliedDate={applications.kyc.appliedDate}
                estimatedDays={applications.kyc.estimatedDays}
                daysRemaining={applications.kyc.daysRemaining}
              />
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="passport">Passport</TabsTrigger>
                <TabsTrigger value="visa">Visa</TabsTrigger>
                <TabsTrigger value="kyc">KYC</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-4">Application Timeline</h3>
                    <ApplicationTimeline applications={applications} />
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-4">Upcoming Deadlines</h3>
                    <ul className="space-y-4">
                      {applications.visa.daysRemaining > 0 && (
                        <li className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Visa Approval Expected</p>
                            <p className="text-sm text-muted-foreground">
                              {applications.visa.country} - {applications.visa.type}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{applications.visa.daysRemaining} days</p>
                          </div>
                        </li>
                      )}
                      {applications.kyc.daysRemaining > 0 && (
                        <li className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">KYC Verification Expected</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{applications.kyc.daysRemaining} days</p>
                          </div>
                        </li>
                      )}
                      {applications.visa.daysRemaining <= 0 && applications.kyc.daysRemaining <= 0 && (
                        <li className="text-center py-8 text-muted-foreground">No upcoming deadlines</li>
                      )}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="passport">
                <div className="rounded-lg border p-6">
                  <h3 className="text-xl font-medium mb-4">Passport Details</h3>
                  {applications.passport.status === "approved" ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Passport Number</p>
                          <p className="font-medium">{applications.passport.documentNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Issue Date</p>
                          <p className="font-medium">{applications.passport.approvedDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Expiry Date</p>
                          <p className="font-medium">{applications.passport.expiryDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <p className="font-medium capitalize">{applications.passport.status}</p>
                        </div>
                      </div>
                      <div className="pt-4">
                        <p className="text-sm text-muted-foreground mb-2">Passport Preview</p>
                        <div className="bg-muted aspect-[3/2] rounded-lg flex items-center justify-center">
                          <p className="text-muted-foreground">Passport Image</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-muted-foreground">
                        Your passport application is being processed. Expected completion in{" "}
                        {applications.passport.daysRemaining} days.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="visa">
                <div className="rounded-lg border p-6">
                  <h3 className="text-xl font-medium mb-4">Visa Application Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Country</p>
                        <p className="font-medium">{applications.visa.country}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Visa Type</p>
                        <p className="font-medium">{applications.visa.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Applied Date</p>
                        <p className="font-medium">{applications.visa.appliedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium capitalize">{applications.visa.status}</p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground mb-2">Application Progress</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Application Submitted</span>
                          <span className="text-green-500">Completed</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Document Verification</span>
                          <span className="text-green-500">Completed</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Embassy Review</span>
                          <span className="text-amber-500">In Progress</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Final Decision</span>
                          <span className="text-muted-foreground">Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="kyc">
                <div className="rounded-lg border p-6">
                  <h3 className="text-xl font-medium mb-4">KYC Verification Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Submitted Date</p>
                        <p className="font-medium">{applications.kyc.appliedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium capitalize">{applications.kyc.status.replace("-", " ")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expected Completion</p>
                        <p className="font-medium">
                          {applications.kyc.daysRemaining > 0
                            ? `In ${applications.kyc.daysRemaining} days`
                            : "Completed"}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground mb-2">Verification Steps</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Identity Verification</span>
                          <span className="text-green-500">Completed</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Address Verification</span>
                          <span className="text-green-500">Completed</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Document Authenticity</span>
                          <span className="text-amber-500">In Progress</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Background Check</span>
                          <span className="text-muted-foreground">Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </SidebarInset>
      </SidebarProvider>
       <footer className="bg-gray-900 ml-56 text-white py-8 md:py-12">
  <div className="container max-w-7xl mx-auto px-4 md:px-6">
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      <div className="col-span-2 sm:col-span-2 md:col-span-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
          <Image
            src="/logo2.png"
            alt="Global Visa Solutions"
            width={120}
            height={30}
            className="h-12 sm:h-16 w-20 sm:w-24"
          />
          <span className="text-lg sm:text-xl font-bold">AXE VISA TECHNOLOGY</span>
        </div>
        <p className="text-sm md:text-base text-gray-400 mb-4">
          Premium visa and passport services for discerning clients across
          India.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Quick Links</h3>
        <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#services"
              className="text-gray-400 hover:text-white"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="text-gray-400 hover:text-white"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="#testimonials"
              className="text-gray-400 hover:text-white"
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="text-gray-400 hover:text-white"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-6 sm:mt-0">
        <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Services</h3>
        <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Tourist Visa
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Business Visa
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Student Visa
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Work Visa
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Passport Services
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-6 md:mt-0">
        <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Legal</h3>
        <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Refund Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Cookie Policy
            </Link>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-800 mt-8 md:mt-10 pt-4 md:pt-6 text-center text-gray-400 text-sm md:text-base">
      <p>
        &copy; {new Date().getFullYear()} AXE VISA TECHNOLOGY. All rights
        reserved.
      </p>
    </div>
  </div>
</footer>
      </div>
    
  )
}
