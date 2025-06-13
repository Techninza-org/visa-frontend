"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  CreditCard,
  Settings,
  LogOut,
  // Clock,
  ChevronRight,
  User,
  Bell,
  Shield,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import Image from "next/image";

interface DashboardSidebarProps {
  onLinkClick?: () => void; // Add this prop to handle sidebar closing
}

export function DashboardSidebar({ onLinkClick }: DashboardSidebarProps) {
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

   const handleLinkClick = () => {
    if (onLinkClick) onLinkClick(); // Close sidebar when any link is clicked
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/");
  };

  const clientMenuItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/pages/dashboard",
      badge: null,
      description: "Overview & analytics",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Briefcase,
      label: "Visa Applications",
      href: "/pages/dashboard/client/visa-applications",
      badge: "3",
      description: "Track your visa progress",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: User,
      label: "KYC Profile",
      href: "/pages/dashboard/client/kyc-profile",
      badge: null,
      description: "Identity verification",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FileText,
      label: "Documents",
      href: "/pages/dashboard/client/docs",
      badge: "2",
      description: "Upload & manage files",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: CreditCard,
      label: "Payments",
      href: "/pages/dashboard/client/payments",
      badge: null,
      description: "Billing & transactions",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Settings,
      label: "Support",
      href: "/pages/dashboard/client/support",
      badge: null,
      description: "Help & assistance",
      color: "from-gray-500 to-gray-600",
    },
  ];

  const roleInfo = {
    name: username || "John Doe",
    email: email || "john@example.com",
    roleLabel: "Client",
    avatarFallback: "JD",
    badgeColor: "bg-gradient-to-r from-blue-500 to-blue-600",
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 shadow-lg w-full overflow-hidden">
      {/* Header with Logo */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md bg-white border border-gray-200">
            <Image
              src="/visalogo.jpeg"
              alt="VisaFlow Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AxeVisa</h2>
            <p className="text-xs text-gray-600">Client Portal</p>
          </div>
        </div>
      </div>

      {/* User Info Card */}
      <div className="p-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-4 border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          <div className="relative flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12 ring-2 ring-blue-200 shadow-sm">
                <AvatarImage
                  src="/placeholder.svg?height=48&width=48"
                  alt="User"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                  {roleInfo.name.slice(0, 2).toUpperCase() || roleInfo.avatarFallback}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {roleInfo.name}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {roleInfo.email}
              </p>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 mt-1 border-0"
              >
                <Shield className="w-3 h-3 mr-1" />
                {roleInfo.roleLabel}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar">
        <div className="space-y-1">
          {clientMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href} className="group">
                <Link
                  href={item.href}
                  onClick={handleLinkClick} // Close sidebar on link click
                  className={`relative flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ease-out transform hover:scale-[1.01] ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg" />
                  )}
                  
                  {/* Icon with gradient background */}
                  <div
                    className={`relative p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white/20 shadow-lg"
                        : `bg-gradient-to-br ${item.color} opacity-90 group-hover:opacity-100 group-hover:shadow-md`
                    }`}
                  >
                    <item.icon className="h-4 w-4 text-white" />
                    {/* Glow effect */}
                    {isActive && (
                      <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm -z-10" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm truncate">
                        {item.label}
                      </span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={`ml-2 text-xs font-bold px-2 py-0.5 ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-red-500 text-white shadow-sm"
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 truncate ${
                      isActive ? "text-blue-100" : "text-gray-500"
                    }`}>
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <ChevronRight
                    className={`h-4 w-4 transition-all duration-300 ${
                      isActive
                        ? "opacity-100 translate-x-0 text-white"
                        : "opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 text-gray-400"
                    }`}
                  />

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Link>
              </div>
            );
          })}
        </div>

     
      </div>

      {/* Footer with Logout */}
      <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 p-3 rounded-xl text-gray-700 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all duration-300 group border border-transparent"
        >
          <div className="p-1.5 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors duration-300">
            <LogOut className="h-4 w-4 text-red-600" />
          </div>
          <span className="font-medium">Sign Out</span>
          <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-gray-400" />
        </Button>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}