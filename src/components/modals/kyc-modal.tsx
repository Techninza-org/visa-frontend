"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ModalWrapper } from "@/components/modals/modal-wrapper";
import Cookies from "js-cookie";

interface KycModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (kycId: string) => void;
}

export function KycModal({ isOpen, onClose, onSubmit }: KycModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    pincode: "",
  });

  const [files, setFiles] = useState<{
    adharFrontImg: File | null;
    adharBackImg: File | null;
    panCardImg: File | null;
  }>({
    adharFrontImg: null,
    adharBackImg: null,
    panCardImg: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0] || null;
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("auth_token");
    const data = new FormData();

    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("address", formData.address);
    data.append("pincode", formData.pincode);

    if (files.adharFrontImg) data.append("adharFrontImg", files.adharFrontImg);
    if (files.adharBackImg) data.append("adharBackImg", files.adharBackImg);
    if (files.panCardImg) data.append("panCardImg", files.panCardImg);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kyc/submit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!res.ok) throw new Error("Failed to submit KYC");

      const result = await res.json();
      console.log("Response from KYC submission:", result);

      const kycId = result.data._id;

      console.log("KYC ID received:", kycId);

      if (onSubmit) onSubmit(kycId);

      alert("KYC Submitted Successfully. KYC ID: " + kycId);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Know Your Customer (KYC)"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
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

        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>

        {[
          { label: "Aadhar Front Image", name: "adharFrontImg" },
          { label: "Aadhar Back Image", name: "adharBackImg" },
          { label: "PAN Card Image", name: "panCardImg" },
        ].map(({ label, name }) => (
          <div className="space-y-2" key={name}>
            <Label htmlFor={name}>{label}</Label>
            <Input
              id={name}
              type="file"
              accept="image/png, image/jpeg, application/pdf"
              onChange={(e) => handleFileChange(e, name)}
              required
            />
          </div>
        ))}

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-amber-500 text-white">
            Submit KYC
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
