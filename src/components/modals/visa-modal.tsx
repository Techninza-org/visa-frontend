"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
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
  CheckCircle2
} from "lucide-react";
import Cookies from "js-cookie";

interface VisaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  userId?: string;
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
  // const [currentStep, setCurrentStep] = useState(1);
  let destinationCountries: string | null = null;
  if (typeof window !== "undefined") {
    destinationCountries = sessionStorage.getItem("selectedCountries");
  }

  // const destinationCountries = sessionStorage.getItem("selectedCountries");
  const parsedCountries = useMemo(() => {
    return destinationCountries ? JSON.parse(destinationCountries) : [];
  }, [destinationCountries]);

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
  const completedFields = Object.values(formData).filter((v) => v !== "").length;
  const totalFields = Object.keys(formData).length;
  const progressPercentage = (completedFields / totalFields) * 100;

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

  const FormSection = ({ title, icon: Icon, children, className = "" }: any) => (
    <div className={`bg-gradient-to-br from-white/90 to-gray-50/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="p-6 border-b border-gray-100/50">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-r from-amber-400/20 to-amber-500/20 rounded-xl">
            <Icon className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  const InputField = ({ name, label, type, icon: Icon, ...props }: any) => (
    <div className="group">
      <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2" htmlFor={name}>
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
        <span>{label}</span>
      </Label>
      <div className="relative">
        <Input
          type={type}
          id={name}
          name={name}
          value={(formData as any)[name]}
          onChange={handleChange}
          className="transition-all duration-200 border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 hover:border-gray-300 bg-white/80 backdrop-blur-sm"
          {...props}
        />
        {(formData as any)[name] && (
          <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
        )}
      </div>
    </div>
  );

  const SelectField = ({ name, label, icon: Icon, options, placeholder, value, onChange }: any) => (
    <div className="group">
      <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2" htmlFor={name}>
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
        <span>{label}</span>
      </Label>
      <div className="relative">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="transition-all duration-200 border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 hover:border-gray-300 bg-white/80 backdrop-blur-sm">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-md border-white/20">
            {options.map((option: string) => (
              <SelectItem key={option} value={option} className="hover:bg-amber-50">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {value && (
          <CheckCircle2 className="absolute right-8 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500 pointer-events-none" />
        )}
      </div>
    </div>
  );

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="large"
    >
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        {/* Premium Header */}
        <div className="relative mb-8 p-8 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full transform -translate-x-24 translate-y-24"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Stamp className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Visa Application</h1>
                <p className="text-amber-100 mt-1">Complete your travel documentation</p>
              </div>
            </div>
            
            {/* Progress Circle */}
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  className="text-white"
                  strokeDasharray={`${progressPercentage}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-sm">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative mt-6">
            <div className="flex justify-between text-xs text-amber-100 mb-2">
              <span>Progress</span>
              <span>{completedFields} of {totalFields} fields completed</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 px-2">
          {/* Personal Information */}
          <FormSection title="Personal Information" icon={User}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField name="fullName" label="Full Name" type="text" icon={User} />
              <InputField name="dob" label="Date of Birth" type="date" icon={Calendar} />
              <InputField name="nationality" label="Nationality" type="text" icon={Globe} />
            </div>
          </FormSection>

          {/* Passport Details */}
          <FormSection title="Passport Information" icon={FileText}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField name="passportNumber" label="Passport Number" type="text" icon={Shield} />
              <InputField name="passportIssueDate" label="Issue Date" type="date" icon={Calendar} />
              <InputField name="passportExpiryDate" label="Expiry Date" type="date" icon={Calendar} />
            </div>
          </FormSection>

          {/* Travel Information */}
          <FormSection title="Travel Details" icon={Plane}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField 
                name="destinationCountry" 
                label="Destination Country" 
                type="text" 
                icon={MapPin} 
              />
              <SelectField
                name="travelPurpose"
                label="Travel Purpose"
                icon={Briefcase}
                value={formData.travelPurpose}
                onChange={(value: string) =>
                  setFormData((prev) => ({ ...prev, travelPurpose: value }))
                }
                options={["Tourism", "Business", "Study", "Medical", "Transit", "Other"]}
                placeholder="Select Travel Purpose"
              />
              <InputField name="travelDate" label="Travel Date" type="date" icon={Calendar} />
              <InputField 
                name="travelDurationInDays" 
                label="Duration (Days)" 
                type="number" 
                icon={Clock} 
              />
            </div>
          </FormSection>

          {/* Contact Information */}
          <FormSection title="Contact & Employment" icon={Mail}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputField name="email" label="Email Address" type="email" icon={Mail} />
              <InputField name="phone" label="Phone Number" type="text" icon={Phone} />
              <SelectField
                name="employmentStatus"
                label="Employment Status"
                icon={Briefcase}
                value={formData.employmentStatus}
                onChange={(value: string) =>
                  setFormData((prev) => ({ ...prev, employmentStatus: value }))
                }
                options={["Working", "Business", "Student", "Unemployed", "Retired", "Other"]}
                placeholder="Select Employment Status"
              />
            </div>
            
            <div className="mt-6">
              <Label className="text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2" htmlFor="address">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>Address</span>
              </Label>
              <div className="relative">
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="transition-all duration-200 border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 hover:border-gray-300 bg-white/80 backdrop-blur-sm min-h-[100px] resize-none"
                  placeholder="Enter your complete address..."
                />
                {formData.address && (
                  <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                )}
              </div>
            </div>
          </FormSection>

          {/* Submit Section */}
          <div className="bg-gradient-to-r from-white/90 to-gray-50/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-green-400/20 to-green-500/20 rounded-xl">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {isFormComplete ? "Ready to Submit" : "Save as Draft"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isFormComplete 
                      ? "All required fields completed" 
                      : `${totalFields - completedFields} fields remaining`
                    }
                  </p>
                </div>
              </div>
              
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>{isFormComplete ? "Submit Application" : "Save Draft"}</span>
                    <Plane className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}