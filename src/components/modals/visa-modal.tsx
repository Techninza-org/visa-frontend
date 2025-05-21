"use client";

import type React from "react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ModalWrapper } from "@/components/modals/modal-wrapper";
import { Stamp, FileCheck2 } from "lucide-react";
import Cookies from "js-cookie";

interface VisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export function VisaModal({ isOpen, onClose, onSubmit }: VisaModalProps) {
  const [formData, setFormData] = useState({
    passportId: "",
    visaType: "",
    destinationCountry: "",
    entryType: "",
    plannedArrival: "",
    plannedDeparture: "",
    stayDuration: "",
    visitPurpose: "",
    accommodationDetails: "",
    hasInvitation: "no",
  });

  const [files, setFiles] = useState({
    photo: null as File | null,
    bankStatement: null as File | null,
    invitation: null as File | null,
  });

  const token = Cookies.get("token");
  const cookieUser = Cookies.get("user");
  console.log("Cookies:", cookieUser);

  const userId = cookieUser ? JSON.parse(cookieUser)._id : undefined;
  console.log("User ID:", userId);

  useEffect(() => {
    const fetchKycId = async () => {
      if (!userId || !isOpen) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userDetails = await response.json();

        if (response.ok) {
          setFormData((prev) => ({
            ...prev,
            passportId: userDetails.applypassportId,
          }));
        } else {
          console.error("Failed to fetch user:", userDetails);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchKycId();
  }, [userId, isOpen, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles?.[0]) {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("passportId", formData.passportId);
    payload.append("country", formData.destinationCountry);
    payload.append("visaType", formData.visaType);
    payload.append("travelDate", formData.plannedArrival);
    payload.append("returnDate", formData.plannedDeparture);
    payload.append("travelPurpose", formData.visitPurpose);
    payload.append("accommodation", formData.accommodationDetails);
    payload.append("hasInvitation", formData.hasInvitation);
    payload.append("userId", userId);

    if (files.photo) payload.append("photo", files.photo);
    if (files.bankStatement)
      payload.append("bankStatement", files.bankStatement);
    if (files.invitation) payload.append("invitation", files.invitation);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/visa/apply/${formData.passportId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: payload,
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert("Visa application submitted successfully.");
        if (onSubmit) onSubmit();
        onClose();
      } else {
        alert(result.message || "Failed to submit visa application.");
      }
    } catch (err) {
      alert("Error submitting form. Please try again.");
      console.error(err);
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Visa Application"
      size="large"
    >
      <div className="mb-6 flex items-center p-4 bg-gradient-to-r from-amber-50 to-amber-50 rounded-lg border border-amber-100">
        <div className="mr-4 bg-white p-2 rounded-full">
          <Stamp className="h-6 w-6 text-black" />
        </div>
        <div>
          <h3 className="font-medium text-black">Visa Application</h3>
          <p className="text-sm text-gray-800">
            Complete your visa application details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="visaType">Visa Type</Label>
              <Select
                onValueChange={(value) => handleSelectChange("visaType", value)}
              >
                <SelectTrigger id="visaType">
                  <SelectValue placeholder="Select visa type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tourist">Tourist</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="transit">Transit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destinationCountry">Destination Country</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("destinationCountry", value)
                }
              >
                <SelectTrigger id="destinationCountry">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="entryType">Entry Type</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("entryType", value)
                }
              >
                <SelectTrigger id="entryType">
                  <SelectValue placeholder="Select entry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Entry</SelectItem>
                  <SelectItem value="multiple">Multiple Entry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stayDuration">Duration of Stay (days)</Label>
              <Input
                id="stayDuration"
                name="stayDuration"
                type="number"
                value={formData.stayDuration}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="plannedArrival">Planned Arrival Date</Label>
              <Input
                id="plannedArrival"
                name="plannedArrival"
                type="date"
                value={formData.plannedArrival}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plannedDeparture">Planned Departure Date</Label>
              <Input
                id="plannedDeparture"
                name="plannedDeparture"
                type="date"
                value={formData.plannedDeparture}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitPurpose">Purpose of Visit</Label>
            <Textarea
              id="visitPurpose"
              name="visitPurpose"
              value={formData.visitPurpose}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accommodationDetails">Accommodation Details</Label>
            <Textarea
              id="accommodationDetails"
              name="accommodationDetails"
              value={formData.accommodationDetails}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hasInvitation">
              Do you have an Invitation Letter?
            </Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("hasInvitation", value)
              }
            >
              <SelectTrigger id="hasInvitation">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Upload Supporting Documents</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["photo", "bankStatement", "invitation"].map((key) => (
                <div key={key} className="space-y-1">
                  <Label htmlFor={key}>{key}</Label>
                  <Input
                    type="file"
                    name={key}
                    id={key}
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />
                  {files[key as keyof typeof files] && (
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <FileCheck2 className="w-4 h-4" />
                      {files[key as keyof typeof files]?.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-amber-400 to-amber-600 hover:bg-amber-600/90 border border-amber-500/20 text-white"
          >
            Submit Visa Application
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
