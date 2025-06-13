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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.relative')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-amber-300/30 bg-white/96 backdrop-blur-lg">
      <div className="mx-auto flex h-16 sm:h-20 max-w-[95%] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/visa-logo.png"
            alt="Global Visa Solutions"
            width={100}
            height={60}
            className="h-auto w-24 sm:w-[100px] object-contain transition-opacity hover:opacity-90"
            priority
          />
        </Link>

        {/* Desktop Navigation - shown on md screens and larger */}
        <nav className="hidden md:flex md:gap-6 lg:gap-8">
          {[
            { name: "Home", link: "/" },
            { name: "Services", link: "/pages/Services" },
            { name: "About", link: "/pages/aboutus" },
            { name: "Contact", link: "/pages/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="text-sm font-medium text-gray-700 hover:text-amber-500 transition-colors px-2 py-1 rounded-md"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {!isLoggedIn ? (
            <>
              <Link href="/pages/login" className="hidden sm:block">
                <Button className="bg-amber-500 text-white hover:bg-amber-600 transition rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
                  Login
                </Button>
              </Link>
              
              {/* Mobile menu button - shown on small screens */}
              <Button
                variant="outline"
                size="icon"
                className="md:hidden text-amber-600 hover:bg-amber-100"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </>
          ) : (
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover:bg-amber-100 h-9 w-9 sm:h-10 sm:w-10"
                aria-label="User menu"
              >
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
              </Button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <Link href="/pages/dashboard">
                    <span 
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setDropdownOpen(false)}
                    >
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

      {/* Mobile Menu - shown on small screens */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 w-full h-screen bg-white z-40 flex flex-col">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <Image 
              src="/visalogo.jpeg" 
              alt="Logo" 
              width={100} 
              height={40} 
              className="w-24 object-contain"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
              className="text-amber-600 hover:bg-amber-100"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col px-4 py-4 space-y-3 flex-grow">
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
                className="text-base py-2 px-3 text-gray-700 font-medium hover:text-amber-500 hover:bg-amber-50 rounded-md"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-auto pt-4 border-t border-gray-200">
              {!isLoggedIn ? (
                <>
                  <Link href="/pages/login">
                    <Button 
                      className="w-full mb-3 bg-amber-500 text-white hover:bg-amber-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/pages/ragister">
                    <Button 
                      variant="outline"
                      className="w-full text-amber-600 border-amber-500 hover:bg-amber-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <Button
                  className="w-full bg-red-100 text-red-600 hover:bg-red-200"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
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