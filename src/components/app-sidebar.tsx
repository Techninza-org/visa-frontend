"use client"

import { CreditCard, FileCheck, Home, StampIcon as Passport, Shield, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar className="bg-gray-900">
      <SidebarHeader className="h-20 border-b bg-gray-900 border-sidebar-border">
          <Image
            src="/logo2.png"
            alt="Global Visa Solutions"
            width={120}
            height={30}
            className="h-10 w-16 md:h-16 md:w-24"
            priority
          />
          {/* <span className="text-lg md:text-xl text-black font-bold hidden md:block">
            AXE VISA <br /> TECHNOLOGY
          </span> */}
      </SidebarHeader>
      <SidebarContent>
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
        <SidebarSeparator />
        <SidebarMenu className="text-white">
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive>
              <Link href="#">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/pages/kyc">
                <Shield className="h-4 w-4" />
                <span>KYC Verification</span>
                <Badge variant="outline" className="ml-auto">
                  In Progress
                </Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Passport className="h-4 w-4" />
                <span>Passport</span>
                <Badge variant="outline" className="ml-auto bg-green-50 text-green-700 border-green-200">
                  Approved
                </Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <FileCheck className="h-4 w-4" />
                <span>Visa Application</span>
                <Badge variant="outline" className="ml-auto">
                  Pending
                </Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <CreditCard className="h-4 w-4" />
                <span>Payments</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <p>© 2024 TravelEase</p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
