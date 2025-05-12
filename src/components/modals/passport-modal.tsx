"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import { ModalWrapper } from "@/components/modals/modal-wrapper";

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  userId: string; // <-- Now passing userId as prop
}

export function PassportModal({
  isOpen,
  onClose,
  onSubmit,
  userId,
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

  const token = Cookies.get("token");
  const user = Cookies.get("user");
  const json = user ? JSON.parse(user) : {};
  const id = userId || json._id || "";
  console.log(id, "userid");

  useEffect(() => {
    const fetchKycId = async () => {
      console.log("Fetching KYC ID...");
      if (!id || !isOpen) {
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("Response status:", response.status);

        const userdetails = await response.json();
        // console.log("Result:", userdetails);

        if (response.ok) {
          setFormData((prev) => ({
            ...prev,
            kycId: userdetails.kycId || "", // Assuming this is the path
          }));
        } else {
          console.error("Failed to fetch user:", userdetails);
        }
      } catch (err) {
        console.error("Error fetching user:", err || err);
      }
    };

    fetchKycId();
  }, [userId, isOpen, token, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitting...");

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/passport/apply/${formData.kycId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );
      console.log("Response status:", response.status);

      const result = await response.json();
      // console.log("Result:", result);

      if (response.ok) {
        alert("Passport info submitted successfully!");
        onSubmit();
        onClose();
      } else {
        console.error("Failed to submit:", result);
        alert("Failed to submit: " + result.message);
      }
    } catch (err) {
      console.error("Error submitting data:", err || err);
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
          {["firstName", "lastName", "dateOfBirth"].map((field) => (
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
