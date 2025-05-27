"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-amber-300/30 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-[95%] items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/visalogo.jpeg"
            alt="Global Visa Solutions"
            width={100}
            height={60}
            className="h-auto  object-contain transition-opacity hover:opacity-90"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-8">
          {[
            { name: "Home", link: "/" },
            { name: "Services", link: "/pages/Services" },
            { name: "About", link: "/pages/aboutus" },
            { name: "Contact", link: "/pages/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link href="/pages/login">
                <Button className="bg-amber-500 text-white hover:bg-amber-600 transition rounded-xl px-4 py-2">
                  Login
                </Button>
              </Link>
              {/* <Link href="/pages/ragister">
                <Button className="bg-gray-100 text-amber-600 border border-amber-500 hover:bg-amber-50 transition rounded-xl px-4 py-2">
                  Sign Up
                </Button>
              </Link> */}
              <Button
                variant="outline"
                size="icon"
                className="md:hidden text-amber-600 hover:bg-amber-100"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </>
          ) : (
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover:bg-amber-100"
              >
                <User className="h-6 w-6 text-amber-600" />
              </Button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <Link href="/pages/dashboard">
                    <span className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer">
                      Dashboard
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-white z-40 flex flex-col shadow-lg">
          <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200">
            <Image src="/visalogo.jpeg" alt="Logo" width={100} height={40} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
              className="text-amber-600 hover:bg-amber-100"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col px-6 py-4 space-y-4">
            {[
              { name: "Home", link: "/" },
              { name: "Services", link: "/pages/Services" },
              { name: "About", link: "/pages/aboutus" },
              { name: "Contact", link: "/pages/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.link}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg text-gray-700 font-medium hover:text-amber-500"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-6">
              {!isLoggedIn ? (
                <>
                  <Link href="/pages/login">
                    <Button className="w-full mb-2 bg-amber-500 text-white hover:bg-amber-600">
                      Login
                    </Button>
                  </Link>
                  <Link href="/pages/ragister">
                    <Button className="w-full bg-gray-100 text-amber-600 hover:bg-amber-50">
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <Button
                  className="w-full bg-red-100 text-red-600 hover:bg-red-200"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
