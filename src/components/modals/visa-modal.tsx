"use client";

import type React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
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
import { Stamp } from "lucide-react";
import Cookies from "js-cookie";

interface VisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  userId?: string; // Make sure it's optional if not always present
}

export function VisaModal({
  isOpen,
  onClose,
  onSubmit,
  userId,
}: VisaModalProps) {
  console.log("VisaModal rendered with userId:", userId);

  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [usedSessionDestination, setUsedSessionDestination] = useState(false);

  // Retrieve destination countries from sessionStorage (stored as JSON string array of objects)
  // Example stored value: '[{"source":"Afghanistan","destination":"Albania"}]'
  const destinationCountries = sessionStorage.getItem("selectedCountries");
  const parsedCountries = destinationCountries
    ? JSON.parse(destinationCountries)
    : [];

  useEffect(() => {
    if (parsedCountries.length && !usedSessionDestination) {
      setFormData((prev) => ({
        ...prev,
        destinationCountry: parsedCountries[0]?.destination || "",
      }));
      setUsedSessionDestination(true);
    }
  }, [parsedCountries, usedSessionDestination]);

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    nationality: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    destinationCountry: parsedCountries.destination || "",
    travelPurpose: "Tourism",
    travelDate: "",
    travelDurationInDays: "",
    email: "",
    phone: "",
    address: "",
    employmentStatus: "Working",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!userId) return;
      try {
        const token = Cookies.get("token");
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/visa-application/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (data.success && data.application) {
          const app = data.application;
          setApplicationId(app._id);
          setApplicationId(app._id);
          setFormData({
            fullName: app.fullName || "",
            dob: app.dob?.substring(0, 10) || "",
            nationality: app.nationality || "",
            passportNumber: app.passportNumber || "",
            passportIssueDate: app.passportIssueDate?.substring(0, 10) || "",
            passportExpiryDate: app.passportExpiryDate?.substring(0, 10) || "",
            destinationCountry: app.destinationCountry || "",
            travelPurpose: app.travelPurpose || "Tourism",
            travelDate: app.travelDate?.substring(0, 10) || "",
            travelDurationInDays: app.travelDurationInDays?.toString() || "",
            email: app.email || "",
            phone: app.phone || "",
            address: app.address || "",
            employmentStatus: app.employmentStatus || "Working",
          });
        }
      } catch (err) {
        console.error("Failed to load visa application:", err);
      }
    };

    if (isOpen) fetchApplication();
  }, [isOpen, userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormComplete = Object.values(formData).every((v) => v !== "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = Cookies.get("token");

    const payload = {
      ...formData,
      isDraft: isFormComplete ? "false" : "true",
    };

    try {
      const url = applicationId
        ? `${process.env.NEXT_PUBLIC_API_URL}/user/visa-application/${applicationId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/user/visa-application`;

      const method = applicationId ? axios.put : axios.post;

      await method(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!applicationId) {
        sessionStorage.removeItem("selectedCountries");
      }

      alert(
        isFormComplete ? "Application submitted successfully." : "Draft saved."
      );
      onSubmit();
      onClose();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert(error?.response?.data?.message || "Failed to submit application.");
    } finally {
      setLoading(false);
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

      <form onSubmit={handleSubmit} className="space-y-6  px-2 py-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "fullName", label: "Full Name", type: "text" },
            { name: "dob", label: "Date of Birth", type: "date" },
            { name: "nationality", label: "Nationality", type: "text" },
            { name: "passportNumber", label: "Passport Number", type: "text" },
            {
              name: "passportIssueDate",
              label: "Passport Issue Date",
              type: "date",
            },
            {
              name: "passportExpiryDate",
              label: "Passport Expiry Date",
              type: "date",
            },
            {
              name: "destinationCountry",
              label: "Destination Country",
              type: "text",
            },
            { name: "travelDate", label: "Travel Date", type: "date" },
            {
              name: "travelDurationInDays",
              label: "Travel Duration (Days)",
              type: "number",
            },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone", type: "text" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <Label className="mb-2" htmlFor={name}>
                {label}
              </Label>
              <Input
                type={type}
                id={name}
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Employment Status Select */}
          <div>
            <Label htmlFor="employmentStatus" className="mb-2">
              Employment Status
            </Label>
            <Select
              value={formData.employmentStatus}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, employmentStatus: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Employment Status" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Working",
                  "Business",
                  "Student",
                  "Unemployed",
                  "Retired",
                  "Other",
                ].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Travel Purpose Select */}
          <div>
            <Label htmlFor="travelPurpose" className="mb-2">
              Travel Purpose
            </Label>
            <Select
              value={formData.travelPurpose}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, travelPurpose: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Travel Purpose" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Tourism",
                  "Business",
                  "Study",
                  "Medical",
                  "Transit",
                  "Other",
                ].map((purpose) => (
                  <SelectItem key={purpose} value={purpose}>
                    {purpose}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="address" className="mb-2">
            Address
          </Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end">
          <Button
            className="bg-gradient-to-r from-amber-400 to-amber-600 hover:bg-amber-600/90 border border-amber-500/20 text-white"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : isFormComplete
              ? "Submit Application"
              : "Save Draft"}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
