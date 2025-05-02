"use client";

import type React from "react";
import { useState } from "react";

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
  onSubmit?: () => void; // Optional callback
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

  // Or retrieve token from elsewhere
  const token = Cookies.get("auth_token");

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

    if (files.photo) payload.append("photo", files.photo);
    if (files.bankStatement)
      payload.append("bankStatement", files.bankStatement);
    if (files.invitation) payload.append("invitation", files.invitation);

    try {
      const res = await fetch("http://localhost:4000/api/visa/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

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
      {/* Header */}
      <div className="mb-6 flex items-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-100">
        <div className="mr-4 bg-purple-100 p-2 rounded-full">
          <Stamp className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-medium text-purple-800">Visa Application</h3>
          <p className="text-sm text-purple-700">
            Complete your visa application details
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          {/* Passport ID */}
          <div className="space-y-2">
            <Label htmlFor="passportId">Passport ID</Label>
            <Input
              id="passportId"
              name="passportId"
              value={formData.passportId}
              onChange={handleChange}
              required
            />
          </div>

          {/* Visa Type & Country */}
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

          {/* Dates & Entry */}
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

          {/* Purpose & Accommodation */}
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

          {/* Invitation Yes/No */}
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

          {/* File Upload */}
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
                      <FileCheck2 className="w-4 h-4" />{" "}
                      {files[key as keyof typeof files]?.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-violet-600 text-white"
          >
            Submit Visa Application
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
