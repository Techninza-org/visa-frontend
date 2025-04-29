"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gray-200 text-black backdrop-blur supports-[backdrop-filter]:bg-gray md:px-4">
      <div className="container max-w-7xl mx-auto flex h-20 items-center justify-between px-4 md:px-0">
        <div className="flex items-center gap-2 mb-2 mt-2 flex-shrink-0">
          <Image
            src="/logo2.png"
            alt="Global Visa Solutions"
            width={120}
            height={30}
            className="h-12 w-20 md:h-16 md:w-24"
          />
          <span className="text-lg md:text-xl text-black font-bold hidden md:block">
            AXE VISA <br /> TECHNOLOGY
          </span>
        </div>
        <nav className="hidden md:flex gap-6 flex-1 justify-center">
          <Link
            href="#"
            className="text-sm font-medium text-black hover:text-gray-400"
          >
            Home
          </Link>
          <Link
            href="#services"
            className="text-sm font-medium text-black hover:text-gray-400"
          >
            Services
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-black hover:text-gray-400"
          >
            About Us
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-black hover:text-gray-400"
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-black hover:text-gray-400"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/pages/login">
            <Button className="hidden md:inline-flex bg-gray-500 text-white hover:bg-gray-800">
              Login
            </Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden text-white"
            aria-label="Toggle navigation"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 py-4 px-4 border-t border-gray-800">
          <nav className="flex flex-col space-y-4">
            <Link
              href="#"
              className="text-base font-medium text-white hover:text-yellow-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#services"
              className="text-base font-medium text-white hover:text-yellow-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#about"
              className="text-base font-medium text-white hover:text-yellow-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="#testimonials"
              className="text-base font-medium text-white hover:text-yellow-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-base font-medium text-white hover:text-yellow-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button className="bg-yellow-400 hover:bg-yellow-700 w-full">
              Book Consultation
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
