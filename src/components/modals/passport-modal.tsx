"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

import { ModalWrapper } from "@/components/modals/modal-wrapper";

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  kycId: string;
}

export function PassportModal({
  isOpen,
  onClose,
  onSubmit,
  kycId,
}: PassportModalProps) {
  interface FormData {
    kycId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    passportNumber: string;
    issuingCountry: string;
    issueDate: string;
    expiryDate: string;
    fullName: string;
    birthPlace: string;
    gender: string;
  }
  console.log(kycId);

  const [formData, setFormData] = useState<FormData>({
    kycId: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    passportNumber: "",
    issuingCountry: "",
    issueDate: "",
    expiryDate: "",
    fullName: "",
    birthPlace: "",
    gender: "",
  });

  const [files, setFiles] = useState<{
    userImg: File | null;
    adharFrontImg: File | null;
    adharBackImg: File | null;
    panCardImg: File | null;
  }>({
    userImg: null,
    adharFrontImg: null,
    adharBackImg: null,
    panCardImg: null,
  });
  const token = Cookies.get("auth_token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Removed unused handleSelectChange function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("kycId", formData.kycId);
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("dateOfBirth", formData.dateOfBirth);

    if (files.userImg) data.append("userImg", files.userImg);
    if (files.adharFrontImg) data.append("adharFrontImg", files.adharFrontImg);
    if (files.adharBackImg) data.append("adharBackImg", files.adharBackImg);
    if (files.panCardImg) data.append("panCardImg", files.panCardImg);

    try {
      const response = await fetch("http://localhost:4000/api/passport/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Use token from Cookies
        },
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Passport info submitted successfully!");
        onSubmit();
        onClose();
      } else {
        console.error(result);
        alert("Failed to submit: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting.");
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Passport Information"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {["kycId", "firstName", "lastName", "dateOfBirth"].map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field} className="text-sm font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </Label>
              <Input
                id={field}
                name={field}
                type={field === "dateOfBirth" ? "date" : "text"}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                className="h-11 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                required
              />
            </div>
          ))}
        </div>

        {/* Existing Fields (Passport Number, Country, Dates, etc.) */}
        {/* ... retain your previous passport fields here unchanged ... */}

        {/* File Inputs */}
        {[
          { label: "User Image", name: "userImg" },
          { label: "Aadhar Front", name: "adharFrontImg" },
          { label: "Aadhar Back", name: "adharBackImg" },
          { label: "PAN Card", name: "panCardImg" },
        ].map(({ label, name }) => (
          <div key={name} className="space-y-2">
            <Label htmlFor={name} className="text-sm font-medium">
              {label}
            </Label>
            <Input
              id={name}
              name={name}
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              onChange={handleChange}
              className="block w-full border border-gray-200 rounded-md"
              required
            />
          </div>
        ))}

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-gray-200 hover:bg-gray-50 hover:text-gray-900"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-amber-100 to-amber-400 border border-amber-100/20 text-black"
          >
            Submit Passport Information
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
