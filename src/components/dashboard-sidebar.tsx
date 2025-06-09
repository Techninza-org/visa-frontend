"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
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

import {
  Home,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface DashboardSidebarProps {
  userRole: "client" | "admin" | "expert";
}

export function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUsername(parsedUser.name || "User");
        setEmail(parsedUser.email || "");
      } catch (error) {
        setUsername("User");
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/");
  };

  if (userRole !== "client") {
    // Only show sidebar for clients
    return null;
  }

  const clientMenuItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/pages/dashboard",
      badge: null,
      description: "Overview & quick stats",
    },
    {
      icon: FileText,
      label: "Visa",
      href: "/pages/dashboard/client/visa-applications",
      badge: "3",
      description: "Track your visa progress",
    },
    {
      icon: FileText,
      label: "Kyc Profile",
      href: "/pages/dashboard/client/kyc-profile",
      badge: "3",
      description: "Track your visa progress",
    },
    // {
    //   icon: FileText,
    //   label: "Passport",
    //   href: "/pages/dashboard/client/passport-applications",
    //   badge: "1",
    //   description: "Passport renewals & new apps",
    // },
    {
      icon: Clock,
      label: "Documents",
      href: "/pages/dashboard/client/docs",
      badge: null,
      description: "Upload & manage files",
    },
    {
      icon: CreditCard,
      label: "Payments",
      href: "/pages/dashboard/client/payments",
      badge: null,
      description: "Billing & transactions",
    },
    {
      icon: Settings,
      label: "Support ",
      href: "/pages/dashboard/client/support",

      badge: null,
      description: "Account preferences",
    },
  ];

  const roleInfo = {
    name: username || "John Doe",
    email:email|| "john@example.com",
    roleLabel: "Client",
    avatarFallback: "JD",
    badgeColor: "bg-blue-100 text-blue-800",
  };

  return (
    <SidebarProvider>
      <Sidebar className="bg-gradient-to-b from-slate-50 to-white border-r z-10 border-slate-200 shadow-sm w-64 hidden md:flex">
        <SidebarHeader className="p-4 border-b border-slate-200 mb-10">
          {/* <Link href="/" className="flex items-center justify-center w-full">
            <Image
              src="/visalogo.jpeg"
              alt="Axe Visa Logo"
              width={144}
              height={80}
              className="h-18 w-auto object-contain transition-transform duration-200 hover:scale-105"
            />
          </Link> */}
        </SidebarHeader>

        <SidebarContent className="px-3 py-4  overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="mb-4">
            <Badge
              variant="secondary"
              className={`${roleInfo.badgeColor} text-xs font-medium px-2 py-1 mb-3`}
            >
              {roleInfo.roleLabel}
            </Badge>
          </div>

          <SidebarMenu className="space-y-2">
            {clientMenuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={`group relative rounded-xl transition-all duration-200 hover:shadow-sm  py-5 ${
                      isActive
                        ? "bg-gradient-to-r from-amber-400 to-amber-600  text-white shadow-md"
                        : "hover:bg-slate-100 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-between w-full p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            isActive
                              ? "bg-white/20"
                              : "bg-slate-200 group-hover:bg-slate-300"
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">
                            {item.label}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* {item.badge && (
                          <Badge
                            variant="secondary"
                            className={`text-xs px-2 py-0.5 min-w-[20px] h-5 flex items-center justify-center ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )} */}
                        <ChevronRight
                          className={`h-4 w-4 transition-transform duration-200 opacity-0 group-hover:opacity-100 ${
                            isActive
                              ? "opacity-100 translate-x-0"
                              : "group-hover:translate-x-1"
                          }`}
                        />
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 w-full overflow-hidden">
            <div className="relative shrink-0">
              <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm">
                  {roleInfo.name.slice(0, 2).toUpperCase() || roleInfo.avatarFallback}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {roleInfo.name}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {roleInfo.email}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              asChild
              className="h-6 w-6 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
