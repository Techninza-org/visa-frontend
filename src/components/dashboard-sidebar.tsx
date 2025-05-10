"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  // Plane,
  Home,
  FileText,
  Clock,
  CreditCard,
  Settings,
  LogOut,
  Users,
  BarChart,
  Briefcase,
  CheckSquare,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardSidebarProps {
  userRole: "client" | "admin" | "expert";
}

export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const pathname = usePathname();

  const clientMenuItems = [
    { icon: Home, label: "Dashboard", href: "/pages/dashboard" },
    {
      icon: FileText,
      label: "Applications",
      href: "/pages/dashboard/client/applications",
    },
    {
      icon: Clock,
      label: "Track Status",
      href: "/pages/dashboard/client/track",
    },
    {
      icon: CreditCard,
      label: "Payments",
      href: "/pages/dashboard/client/payments",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/pages/dashboard/client/settings",
    },
  ];

  const adminMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard/admin" },
    {
      icon: FileText,
      label: "Applications",
      href: "/dashboard/admin/applications",
    },
    { icon: Users, label: "Users", href: "/dashboard/admin/users" },
    { icon: Briefcase, label: "Experts", href: "/dashboard/admin/experts" },
    { icon: CreditCard, label: "Payments", href: "/dashboard/admin/payments" },
    { icon: BarChart, label: "Reports", href: "/dashboard/admin/reports" },
    { icon: Settings, label: "Settings", href: "/dashboard/admin/settings" },
  ];

  const expertMenuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard/expert" },
    {
      icon: FileText,
      label: "Assigned Cases",
      href: "/dashboard/expert/cases",
    },
    {
      icon: CheckSquare,
      label: "Document Review",
      href: "/dashboard/expert/documents",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      href: "/dashboard/expert/messages",
    },
    { icon: Settings, label: "Settings", href: "/dashboard/expert/settings" },
  ];

  const menuItems =
    userRole === "client"
      ? clientMenuItems
      : userRole === "admin"
      ? adminMenuItems
      : expertMenuItems;

  return (
    <SidebarProvider>
      <Sidebar className="bg-gray-100">
        <SidebarHeader className=" p-4">
          <Link href="/" className="flex items-center gap-2">
            {/* <Plane className="h-6 w-6" /> */}
            <Image
              src="/visalogo.jpeg"
              alt="Axe Visa Logo"
              width={48}
              height={48}
              className="h-20 w-36"
            />
            {/* <Image src="/logo.png" alt="Axe Visa Logo" className="h-6" /> */}
            {/* <span className="font-bold text-xl">Axe Visa</span> */}
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback>
                {userRole === "client"
                  ? "CL"
                  : userRole === "admin"
                  ? "AD"
                  : "EX"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              {/* <span className="text-sm font-medium">
                {userRole === "client"
                  ? "John Doe"
                  : userRole === "admin"
                  ? "Admin User"
                  : "Visa Expert"}
              </span> */}
              {/* <span className="text-xs text-muted-foreground capitalize">
                {userRole}
              </span> */}
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/pages/login">
                <LogOut className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
