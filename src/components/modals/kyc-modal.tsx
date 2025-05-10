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
    email: "",
    country: "",
    nationality: "",
    address: "",
    pincode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("token");
    const data = new FormData();

    data.append("firstName", formData.firstName);
    data.append("email", formData.email);
    data.append("country", formData.country);
    data.append("nationality", formData.nationality);
    data.append("address", formData.address);
    data.append("pincode", formData.pincode);

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
      // console.log("Response from KYC submission:", result);

      const kycId = result.data._id;

      // console.log("KYC ID received:", kycId);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Input
              id="nationality"
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country of Residence</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
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
