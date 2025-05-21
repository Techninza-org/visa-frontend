"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plane } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    console.log("Signup clicked with form data:", form);
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      console.log("API Response:", data);

      if (!res.ok) {
        setError(data.msg || "Signup failed");
      } else {
        router.push("/pages/login");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 mt-10">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Create an account</h1>
            <p className="text-sm text-gray-300">
              Fill in the form to register
            </p>
          </div>

          <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white">Sign Up</CardTitle>
              <CardDescription className="text-gray-300">
                Enter your information below
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  className="bg-white/10 border border-white/20 placeholder-gray-300 text-white"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-white/10 border border-white/20 placeholder-gray-300 text-white"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-white">
                  Mobile
                </Label>
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  className="bg-white/10 border border-white/20 placeholder-gray-300 text-white"
                  value={form.mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="bg-white/10 border border-white/20 placeholder-gray-300 text-white"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Referral Code
                </Label>
                <Input
                  id="referral"
                  name="referral"
                  type="text"
                  placeholder="Optional"
                  className="bg-white/10 border border-white/20 placeholder-gray-300 text-white"
                  value={form.referral}
                  onChange={handleChange}
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
            </CardContent>

            <CardFooter>
              <Button
                type="button"
                className="w-full bg-gradient-to-r from-[#f6d365] to-[#fda085] text-black font-semibold hover:opacity-90 transition"
                onClick={handleSignup}
                disabled={loading}
              >
                {loading ? "Creating..." : "Sign Up"}
              </Button>
            </CardFooter>
          </Card>

          <p className="px-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/pages/login"
              className="underline underline-offset-4 text-[#f6d365] hover:text-[#fda085]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
