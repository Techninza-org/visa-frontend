"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Image from "next/image";

export function DashboardHeader() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUsername(parsedUser.name || "User");
      } catch (error) {
        setUsername("User");
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-2 shadow-sm">
      {/* Logo + Title */}
      <div className="flex items-center mx-auto gap-3 w-[95%]">
      <div className="flex items-center gap-3">
        <Image
          src="/visalogo.jpeg" // Make sure this image exists in your public folder
          alt="Company Logo"
          width={65}
          height={36}
          
        />
        {/* <span className="text-lg font-semibold text-gray-800">Your Company</span> */}
      </div>

      {/* Avatar and Dropdown */}
      <div className="flex items-center gap-4 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer group">
              <Avatar className="h-9 w-9 border border-gray-300 bg-amber-400 text-white transition-all group-hover:scale-105">
                <AvatarImage
                  src="/user.png"
                  alt="User"
                  className="object-cover"
                />
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {username}
              </span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 shadow-lg bg-white">
            <DropdownMenuLabel className="text-gray-600">Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start text-red-600 hover:bg-red-100 transition-all"
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      </div>
    </header>
  );
}
