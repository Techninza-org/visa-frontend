"use client";

import type React from "react";
import { useEffect, useMemo, useState, useCallback } from "react";
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
import {
  Stamp,
  User,
  FileText,
  Globe,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Plane,
  Clock,
  Shield,
  Send,
} from "lucide-react";
import Cookies from "js-cookie";

interface VisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  userId?: string;
}

export function VisaModal({ isOpen, onClose, onSubmit, userId }: VisaModalProps) {
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [usedSessionDestination, setUsedSessionDestination] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/iso")
      .then((res) => setCountries(res.data.data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  let destinationCountries: string | null = null;
  if (typeof window !== "undefined") {
    destinationCountries = sessionStorage.getItem("selectedCountries");
  }

  const parsedCountries = useMemo(() => {
    return destinationCountries ? JSON.parse(destinationCountries) : [];
  }, [destinationCountries]);

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

  useEffect(() => {
    if (parsedCountries.length && !usedSessionDestination) {
      setFormData((prev) => ({
        ...prev,
        destinationCountry: parsedCountries[0]?.destination || "",
      }));
      setUsedSessionDestination(true);
    }
  }, [parsedCountries, usedSessionDestination]);

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

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

      alert(isFormComplete ? "Application submitted successfully." : "Draft saved.");
      onSubmit();
      onClose();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert(error?.response?.data?.message || "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  const FormSection = ({
    title,
    icon: Icon,
    children,
    className = "",
  }: any) => (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  const InputField = ({ name, label, type, icon: Icon, ...props }: any) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2" htmlFor={name}>
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
        <span>{label}</span>
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        value={(formData as any)[name]}
        onChange={handleChange}
        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
        {...props}
      />
    </div>
  );

  const SelectField = ({
    name,
    label,
    icon: Icon,
    options,
    placeholder,
    value,
    onChange,
  }: any) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2" htmlFor={name}>
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
        <span>{label}</span>
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: string) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="" size="large">
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Stamp className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Visa Application</h1>
              <p className="text-blue-100 mt-1">Fill out your travel application form</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Info */}
          <FormSection title="Personal Information" icon={User}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField name="fullName" label="Full Name" type="text" icon={User} />
              <InputField name="dob" label="Date of Birth" type="date" icon={Calendar} />
              <SelectField
                name="nationality"
                label="Nationality"
                icon={Globe}
                value={formData.nationality}
                onChange={(value: string) => handleSelectChange("nationality", value)}
                options={countries.map((c) => c.name)}
                placeholder="Select Country"
              />
            </div>
          </FormSection>

          {/* Passport Info */}
          <FormSection title="Passport Information" icon={FileText}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField name="passportNumber" label="Passport Number" type="text" icon={Shield} />
              <InputField name="passportIssueDate" label="Issue Date" type="date" icon={Calendar} />
              <InputField name="passportExpiryDate" label="Expiry Date" type="date" icon={Calendar} />
            </div>
          </FormSection>

          {/* Travel Info */}
          <FormSection title="Travel Details" icon={Plane}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                name="destinationCountry"
                label="Destination Country"
                icon={MapPin}
                value={formData.destinationCountry}
                onChange={(value: string) => handleSelectChange("destinationCountry", value)}
                options={countries.map((c) => c.name)}
                placeholder="Select Country"
              />
              <SelectField
                name="travelPurpose"
                label="Travel Purpose"
                icon={Briefcase}
                value={formData.travelPurpose}
                onChange={(value: string) => handleSelectChange("travelPurpose", value)}
                options={["Tourism", "Business", "Study", "Medical", "Transit", "Other"]}
                placeholder="Select Travel Purpose"
              />
              <InputField name="travelDate" label="Travel Date" type="date" icon={Calendar} />
              <InputField name="travelDurationInDays" label="Duration (Days)" type="number" icon={Clock} />
            </div>
          </FormSection>

          {/* Contact Info */}
          <FormSection title="Contact & Employment" icon={Mail}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <InputField name="email" label="Email Address" type="email" icon={Mail} />
              <InputField name="phone" label="Phone Number" type="text" icon={Phone} />
              <SelectField
                name="employmentStatus"
                label="Employment Status"
                icon={Briefcase}
                value={formData.employmentStatus}
                onChange={(value: string) => handleSelectChange("employmentStatus", value)}
                options={["Working", "Business", "Student", "Unemployed", "Retired", "Other"]}
                placeholder="Select Employment Status"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center space-x-2" htmlFor="address">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>Address</span>
              </Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 min-h-[100px]"
                placeholder="Enter your complete address..."
              />
            </div>
          </FormSection>

          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold px-12 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>{isFormComplete ? "Submit Application" : "Save Draft"}</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
