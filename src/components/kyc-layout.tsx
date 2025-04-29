"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { FileText, CreditCard, User, StampIcon as Passport, Plane, CheckCircle2, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function KycLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [kycStatus, setKycStatus] = useState<"not-started" | "pending" | "approved">("not-started")
  const [passportStatus, setPassportStatus] = useState<"not-started" | "pending" | "approved">("not-started")

  // Load status from localStorage on client side
  useEffect(() => {
    const savedKycStatus = localStorage.getItem("kycStatus")
    const savedPassportStatus = localStorage.getItem("passportStatus")

    if (savedKycStatus) {
      setKycStatus(savedKycStatus as "not-started" | "pending" | "approved")
    }

    if (savedPassportStatus) {
      setPassportStatus(savedPassportStatus as "not-started" | "pending" | "approved")
    }
  }, [])

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b bg-gray-900 px-6 py-4">
            <Image
                       src="/logo2.png"
                       alt="Global Visa Solutions"
                       width={120}
                       height={30}
                       className="h-10 w-16 md:h-16 md:w-24"
                       priority
                     />
          </SidebarHeader>
          <SidebarContent className="text-white bg-gray-900">
              <div className="flex bg-gray-900 text-white flex-col gap-2 p-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-sm font-medium leading-none">John Doe</h2>
              <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
        </div>
            <SidebarMenu >
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/pages/kyc"}>
                  <Link href="/pages/kyc">
                    <FileText />
                    <span>KYC Form</span>
                    {kycStatus === "pending" && <Clock className="ml-auto h-4 w-4 text-yellow-500" />}
                    {kycStatus === "approved" && <CheckCircle2 className="ml-auto h-4 w-4 text-green-500" />}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/pages/passpostapply"} aria-disabled={kycStatus !== "approved"}>
                  <Link
                    href={kycStatus === "approved" ? "/pages/passpostapply" : "#"}
                    className={kycStatus !== "approved" ? "opacity-50 pointer-events-none" : ""}
                  >
                    <Passport />
                    <span>Passport</span>
                    {passportStatus === "pending" && <Clock className="ml-auto h-4 w-4 text-yellow-500" />}
                    {passportStatus === "approved" && <CheckCircle2 className="ml-auto h-4 w-4 text-green-500" />}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/pages/visa"}
                  aria-disabled={passportStatus !== "approved"}
                >
                  <Link
                    href={passportStatus === "approved" ? "/pages/visa" : "#"}
                    className={passportStatus !== "approved" ? "opacity-50 pointer-events-none" : ""}
                  >
                    <Plane />
                    <span>Visa Application</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/payment"}
                  aria-disabled={!(pathname === "/visa" && passportStatus === "approved")}
                >
                  <Link
                    href={pathname === "/pages/visa" && passportStatus === "approved" ? "/payment" : "#"}
                    className={
                      !(pathname === "/pages/visa" && passportStatus === "approved") ? "opacity-50 pointer-events-none" : ""
                    }
                  >
                    <CreditCard />
                    <span>Payment</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4 bg-gray-900 text-white">
            <div className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              <span>User Account</span>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 p-6">
          <div className="container mx-auto">
            <SidebarTrigger className="mb-4 md:hidden" />
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
