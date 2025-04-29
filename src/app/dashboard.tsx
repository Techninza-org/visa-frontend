"use client"

import { useState } from "react"
import { AppSidebar } from "../components/app-sidebar"
import { Header } from "./header"
import { StatusCard } from "./status-card"
import { ApplicationTimeline } from "../components/application-timeline"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  const [, setActiveTab] = useState("overview")

  // Sample data - in a real app, this would come from an API
  const applications: {
    passport: {
      status: "approved" | "pending" | "rejected" | "in-review"
      appliedDate: string
      approvedDate: string | null
      estimatedDays: number
      daysRemaining: number
      documentNumber: string
      expiryDate: string
    }
    visa: {
      status: "approved" | "pending" | "rejected" | "in-review"
      appliedDate: string
      approvedDate: string | null
      estimatedDays: number
      daysRemaining: number
      country: string
      type: string
    }
    kyc: {
      status: "approved" | "pending" | "rejected" | "in-review"
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-6">
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

            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
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
  )
}
