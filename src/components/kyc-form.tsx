"use client";

import type React from "react";
import Cookies from "js-cookie";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function KycForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    nationality: "",
    country: "",
    address: "",
    // pincode: "",
    mobileNo: "",
  });

  console.log("getting cookies");

  const allCookies = Cookies.get();
  console.log("All Cookies:", allCookies);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Removed unused handleFileChange function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.nationality ||
      !formData.country ||
      !formData.address
      // !formData.pincode ||
      // !formData.mobileNo
    ) {
      alert("Please fill all required fields and upload all documents");
      return;
    }

    // Prepare form data for API
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("firstName", formData.firstName);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("nationality", formData.nationality);
    formDataToSubmit.append("country", formData.country);
    formDataToSubmit.append("address", formData.address);
    // formDataToSubmit.append("pincode", formData.pincode);
    // formDataToSubmit.append("mobileNo", formData.mobileNo);

    // Get all stored cookies

    const token = Cookies.get("token");
    console.log(token, "uysrgfuyegsryugfyu");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/kyc/submit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSubmit,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit KYC form");
      }

      await response.json();
      alert("KYC submitted successfully!");
      onSubmit();
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the KYC form.");
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="w-full mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          KYC Verification
        </h1>
        <Card className="text-center w-2/3 mx-auto">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Please provide your personal details for KYC verification
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 w-2/3 mx-auto mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="country">Country Of Residence</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-center text-center mt-5">
              <Button
                type="submit"
                className="w-42 bg-gradient-to-r from-amber-400 to-amber-600 hover:bg-amber-600/90 border border-amber-500/20"
              >
                Submit KYC
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
