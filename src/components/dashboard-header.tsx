
"use client";

// import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// import Image from "next/image";
import {
  // Bell,
  // Search,
  // Settings,
  User,
  LogOut,
  HelpCircle,
  ChevronDown,
  // Globe,
  // Sun,
  // Moon,
  Shield,
  // Notification,
} from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  children?: React.ReactNode;
}


export function DashboardHeader({ children }: DashboardHeaderProps) {
 const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [notifications, setNotifications] = useState(3);
  // const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUsername(parsedUser.name || "User");
        setEmail(parsedUser.email || "user@example.com");
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUsername("User");
        setEmail("user@example.com");
      }
    }

    // Update time every minute
    // const timer = setInterval(() => {
    //   setCurrentTime(new Date());
    // }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 shadow-sm sm:px-6">
      <div className="flex items-center w-full gap-3">
        {/* Mobile menu button will be injected here via children */}
        {children}
        
        <div className="flex items-center gap-3 flex-1 justify-end">
          {/* <Image
            src="/visalogo.jpeg"
            alt="Company Logo"
            width={65}
            height={36}
            className="hidden sm:block"
          /> */}
          
          <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-gray-50 rounded-xl p-2 transition-all duration-200 group">
                <div className="relative">
                  <Avatar className="h-9 w-9 border-2 border-gray-200 shadow-sm group-hover:border-blue-300 transition-colors duration-200">
                    <AvatarImage
                      src="/user.png"
                      alt="User Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-sm">
                      {username.slice(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div className="hidden sm:flex flex-col items-start min-w-0">
                  <span className="text-sm font-semibold text-gray-900 truncate max-w-32">
                    {username}
                  </span>
                  <span className="text-xs text-gray-500 truncate max-w-32">
                    Client Account
                  </span>
                </div>
                <ChevronDown className="hidden sm:block h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-64 shadow-xl bg-white border border-gray-200 rounded-xl p-2"
            >
              {/* User Info Header */}
              <div className="px-3 py-3 border-b border-gray-100 mb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-gray-200">
                    <AvatarImage src="/user.png" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                      {username.slice(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {username}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{email}</p>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 text-xs mt-1"
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      Verified Client
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-1">
                <Link href="/pages/dashboard/client/kyc-profile">
                <DropdownMenuItem className="rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 focus:bg-gray-50">
                  <User className="mr-3 h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Profile Settings</div>
                    <div className="text-xs text-gray-500">Manage your account</div>
                  </div>
                </DropdownMenuItem>
                </Link>

                {/* <DropdownMenuItem className="rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 focus:bg-gray-50">
                  <Bell className="mr-3 h-4 w-4 text-gray-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Notifications</div>
                    <div className="text-xs text-gray-500">
                      {notifications} unread messages
                    </div>
                  </div>
                  {notifications > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {notifications}
                    </Badge>
                  )}
                </DropdownMenuItem> */}

                {/* <DropdownMenuItem className="rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 focus:bg-gray-50">
                  <Settings className="mr-3 h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Preferences</div>
                    <div className="text-xs text-gray-500">App settings</div>
                  </div>
                </DropdownMenuItem> */}
                <Link href="/pages/dashboard/client/support">
                <DropdownMenuItem className="rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors duration-200 focus:bg-gray-50">
                  <HelpCircle className="mr-3 h-4 w-4 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">Help & Support</div>
                    <div className="text-xs text-gray-500">Get assistance</div>
                  </div>
                </DropdownMenuItem>
                </Link>
              </div>

              {/* <DropdownMenuSeparator className="my-2 bg-gray-100" /> */}

              {/* Theme & Language */}
              {/* <div className="flex items-center justify-between px-3 py-2 mb-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">English</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-gray-200">
                    <Sun className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-gray-200">
                    <Moon className="h-3 w-3" />
                  </Button>
                </div>
              </div> */}

              <DropdownMenuSeparator className="my-2 bg-gray-100" />

              {/* Logout */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="rounded-lg p-3 cursor-pointer hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors duration-200 focus:bg-red-50"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <div>
                  <div className="text-sm font-medium">Sign Out</div>
                  <div className="text-xs opacity-75">End your session</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}