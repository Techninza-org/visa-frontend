"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Plane } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function LoginPage() {
  const router = useRouter();
  const [, setMethod] = useState<"email" | "phone">("email");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (!contact || !otp) {
      alert("Please enter both contact details and OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: contact, otp }),
        }
      );

      if (response.ok) {
        const { token, user } = await response.json();
        Cookies.set("token", token, { expires: 7 });
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
        console.log("Token:", token);
        console.log("User:", user);

        alert("OTP verified successfully!");
        router.push("/pages/dashboard");
      } else {
        const errorData = await response.json();
        alert(`Failed to verify OTP: ${errorData.message || "Unknown error"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!contact) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: contact }),
        }
      );

      if (response.ok) {
        setOtpSent(true);
        alert("OTP sent successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to send OTP: ${errorData.message || "Unknown error"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Removed duplicate declaration of handleVerifyOtp

  return (
    <div>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome back</h1>
            <p className="text-sm text-gray-300">
              Enter your contact details to sign in to your account
            </p>
          </div>
          <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white">Sign In</CardTitle>
              <CardDescription className="text-gray-300">
                Choose your preferred login method
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs
                defaultValue="email"
                className="w-full"
                onValueChange={(value) => setMethod(value as "email" | "phone")}
              >
                <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20 rounded-lg">
                  <TabsTrigger
                    value="email"
                    className="text-white data-[state=active]:bg-white/20"
                  >
                    Email
                  </TabsTrigger>
                  <TabsTrigger
                    value="phone"
                    className="text-white data-[state=active]:bg-white/20"
                  >
                    Phone
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="email" className="mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-[#f6d365]"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                    {otpSent && (
                      <div className="space-y-2">
                        <Label htmlFor="otp" className="text-white">
                          OTP
                        </Label>
                        <Input
                          id="otp"
                          placeholder="Enter OTP"
                          className="bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-[#f6d365]"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="phone" className="mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-[#f6d365]"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                    {otpSent && (
                      <div className="space-y-2">
                        <Label htmlFor="otp" className="text-white">
                          OTP
                        </Label>
                        <Input
                          id="otp"
                          placeholder="Enter OTP"
                          className="bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-[#f6d365]"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-gradient-to-r from-[#f6d365] to-[#fda085] text-black font-semibold hover:opacity-90 transition"
                onClick={otpSent ? handleVerifyOtp : handleSendOtp}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : otpSent
                  ? "Verify OTP"
                  : "Send OTP"}
              </Button>
            </CardFooter>
          </Card>
          <p className="px-8 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/pages/ragister"
              className="underline underline-offset-4 text-[#f6d365] hover:text-[#fda085]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
