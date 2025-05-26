"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    country: "",
    address: "",
  });
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/public/user-register`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        alert("Registration successful!");
        router.push("/pages/login");
      } else {
        const error = await response.json();
        alert(`Registration failed: ${error.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] mb-5">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-sm text-gray-300">
              Enter your details to register a new account
            </p>
          </div>
          <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl mt-5 ">
            <CardHeader>
              <CardTitle className="text-white">Sign Up</CardTitle>
              <CardDescription className="text-gray-300">
                Fill in your details below
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { name: "name", label: "Full Name" },
                { name: "email", label: "Email", type: "email" },
                { name: "phone", label: "Phone Number", type: "tel" },
                { name: "nationality", label: "Nationality" },
                { name: "country", label: "Country" },
                { name: "address", label: "Address" },
              ].map((field) => (
                <div key={field.name}>
                  <Label htmlFor={field.name} className="text-white mb-2">
                    {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type || "text"}
                    value={(form as any)[field.name]}
                    onChange={handleChange}
                    placeholder={field.label}
                    className="bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-[#f6d365]"
                  />
                </div>
              ))}

              <div>
                <Label htmlFor="profilePic" className="text-white">
                  Profile Picture
                </Label>
                <Input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-white file:text-white file:bg-[#f6d365] file:border-none file:rounded-lg"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#f6d365] to-[#fda085] text-black font-semibold hover:opacity-90 transition"
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </CardFooter>
          </Card>
          <p className="px-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/pages/login"
              className="underline underline-offset-4 text-[#f6d365] hover:text-[#fda085]"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
