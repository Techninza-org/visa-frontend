"use client";

import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
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
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/public/user-login`,
        new URLSearchParams({ email, password }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { token, user } = response.data;
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      alert("Login successful!");
      router.push("/pages/dashboard");
    } catch (error: any) {
      alert(
        `Login failed: ${error.response?.data?.message || error.message || "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome back</h1>
            <p className="text-sm text-gray-300">
              Enter your credentials to sign in
            </p>
          </div>
          <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-white">Sign In</CardTitle>
              <CardDescription className="text-gray-300">
                Email & Password Login
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-[#f6d365]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-[#f6d365]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-gradient-to-r from-[#f6d365] to-[#fda085] text-black font-semibold hover:opacity-90 transition"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              





            </CardFooter>
              <p className="mt-4 text-sm text-gray-300 text-center">
                Don't have an account?{" "}
                <a
                  href="/pages/register"
                  className="text-[#f6d365] hover:underline"
                >
                  Register here
                </a>

              </p>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
