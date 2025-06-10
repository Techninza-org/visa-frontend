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
  Globe, 
  MapPin, 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  Building,
  Check,
  AlertCircle,
  Plane,
  FileText,
  Save,
  Send
} from "lucide-react";
import Cookies from "js-cookie";

interface Country {
  name: string;
  Iso2: string;
  Iso3: string;
}

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
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  // const [currentStep, setCurrentStep] = useState(0);

  // Fetch countries data
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const response = await axios.get("https://countriesnow.space/api/v0.1/countries/iso");
        setCountries(response.data.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  // Retrieve destination countries from sessionStorage
  const [destinationCountries, setDestinationCountries] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDestinationCountries(sessionStorage.getItem("selectedCountries"));
    }
  }, []);
  const parsedCountries = useMemo(() => {
    return destinationCountries ? JSON.parse(destinationCountries) : [];
  }, [destinationCountries]);


  console.log("Parsed countries:", parsedCountries);

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

  // Calculate completion percentage
  const completionPercentage = Math.round(
    (Object.values(formData).filter((v) => v !== "").length / Object.values(formData).length) * 100
  );

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

  const renderFormField = (name: string, label: string, type: string, icon?: React.ReactNode, required = true) => {
    const value = (formData as any)[name];
    const isEmpty = !value || value === "";
    
    return (
      <div className="space-y-3 group">
        <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2" htmlFor={name}>
          {icon}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <div className="relative">
          <Input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className={`h-12 border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm
              ${isEmpty 
                ? 'border-slate-200 hover:border-slate-300 focus:border-blue-500' 
                : 'border-emerald-200 bg-emerald-50/30 focus:border-emerald-500'
              }
              focus:ring-4 focus:ring-blue-500/10 rounded-xl shadow-sm hover:shadow-md
              placeholder:text-slate-400`}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
          {!isEmpty && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Check className="h-4 w-4 text-emerald-500" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSelectField = (
    name: string,
    label: string,
    options: string[] | Country[],
    icon?: React.ReactNode,
    isCountryField = false,
    required = true
  ) => {
    const value = (formData as any)[name];
    const isEmpty = !value || value === "";
    
    return (
      <div className="space-y-3 group">
        <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2" htmlFor={name}>
          {icon}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <div className="relative">
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, [name]: value }))
            }
          >
            <SelectTrigger className={`h-12 border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-xl
              ${isEmpty 
                ? 'border-slate-200 hover:border-slate-300 focus:border-blue-500' 
                : 'border-emerald-200 bg-emerald-50/30 focus:border-emerald-500'
              }
              focus:ring-4 focus:ring-blue-500/10 shadow-sm hover:shadow-md`}>
              <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className="max-h-60 rounded-xl border-2 shadow-xl bg-white/95 backdrop-blur-sm">
              {loadingCountries && isCountryField ? (
              <SelectItem value="" disabled>Loading countries...</SelectItem>
              ) : (
              (isCountryField ? countries : options as string[]).map((item) => {
                const optionValue = isCountryField ? (item as Country).name : item as string;
                return (
                <SelectItem 
                  key={optionValue} 
                  value={optionValue}
                  className="hover:bg-blue-50 focus:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  {isCountryField && (item as Country).Iso2 ? (
                  <img
                    src={`https://flagcdn.com/w40/${(item as Country).Iso2.toLowerCase()}.png`}
                    className="w-6 h-4 rounded shadow flex-shrink-0 mr-2"
                    alt={(item as Country).name}
                    onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjE2IiBmaWxsPSIjQ0NDIiByeD0iMiIvPgo8L3N2Zz4K';
                    }}
                  />
                  ) : null}
                  {optionValue}
                </SelectItem>
                );
              })
              )}
            </SelectContent>
          </Select>
          {!isEmpty && (
            <div className="absolute right-10 top-1/2 -translate-y-1/2">
              <Check className="h-4 w-4 text-emerald-500" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const sections = [
    { id: 'personal', title: 'Personal Information', icon: User, color: 'blue' },
    { id: 'passport', title: 'Passport Information', icon: FileText, color: 'purple' },
    { id: 'travel', title: 'Travel Information', icon: Plane, color: 'green' },
    { id: 'address', title: 'Address Information', icon: MapPin, color: 'orange' }
  ];

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Visa Application"
      size="large"
    >
      {/* Enhanced Header with Progress */}
      <div className="mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-2xl blur-xl"></div>
        <div className="relative">
          {/* Main Header */}
          <div className="flex items-center p-8 bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-sm rounded-2xl border-2 border-white/50 shadow-xl">
            <div className="mr-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <Stamp className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Visa Application
              </h3>
              <p className="text-slate-600 mb-4">
                Complete your visa application details to proceed with your travel plans
              </p>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">
                    Completion Progress
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {completionPercentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500 ease-out shadow-sm"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="mt-4 flex items-center justify-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isFormComplete 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                : 'bg-amber-100 text-amber-700 border border-amber-200'
            }`}>
              {isFormComplete ? (
                <>
                  <Check className="h-4 w-4" />
                  Ready to Submit
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4" />
                  {Object.values(formData).filter(v => v === "").length} fields remaining
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl blur-xl group-hover:blur-none transition-all duration-500"></div>
          <div className="relative bg-gradient-to-br from-blue-50/80 to-cyan-50/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">Personal Information</h4>
                <p className="text-sm text-slate-600">Your basic personal details</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderFormField("fullName", "Full Name", "text", <User className="h-4 w-4 text-slate-500" />)}
              {renderFormField("dob", "Date of Birth", "date", <Calendar className="h-4 w-4 text-slate-500" />)}
              {renderSelectField("nationality", "Nationality", countries, <Globe className="h-4 w-4 text-slate-500" />, true)}
              {renderFormField("email", "Email Address", "email", <Mail className="h-4 w-4 text-slate-500" />)}
              {renderFormField("phone", "Phone Number", "text", <Phone className="h-4 w-4 text-slate-500" />)}
              {renderSelectField("employmentStatus", "Employment Status", [
                "Working",
                "Business", 
                "Student",
                "Unemployed",
                "Retired",
                "Other",
              ], <Building className="h-4 w-4 text-slate-500" />)}
            </div>
          </div>
        </div>

        {/* Passport Information Section */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl blur-xl group-hover:blur-none transition-all duration-500"></div>
          <div className="relative bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-purple-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">Passport Information</h4>
                <p className="text-sm text-slate-600">Your passport and identification details</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderFormField("passportNumber", "Passport Number", "text", <FileText className="h-4 w-4 text-slate-500" />)}
              {renderFormField("passportIssueDate", "Passport Issue Date", "date", <Calendar className="h-4 w-4 text-slate-500" />)}
              {renderFormField("passportExpiryDate", "Passport Expiry Date", "date", <Calendar className="h-4 w-4 text-slate-500" />)}
            </div>
          </div>
        </div>

        {/* Travel Information Section */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl blur-xl group-hover:blur-none transition-all duration-500"></div>
          <div className="relative bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-emerald-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">Travel Information</h4>
                <p className="text-sm text-slate-600">Your travel plans and destination details</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderSelectField("destinationCountry", "Destination Country", countries, <MapPin className="h-4 w-4 text-slate-500" />, true)}
              {renderSelectField("travelPurpose", "Travel Purpose", [
                "Tourism",
                "Business",
                "Study", 
                "Medical",
                "Transit",
                "Other",
              ], <Plane className="h-4 w-4 text-slate-500" />)}
              {renderFormField("travelDate", "Travel Date", "date", <Calendar className="h-4 w-4 text-slate-500" />)}
              {renderFormField("travelDurationInDays", "Travel Duration (Days)", "number", <Calendar className="h-4 w-4 text-slate-500" />)}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-2xl blur-xl group-hover:blur-none transition-all duration-500"></div>
          <div className="relative bg-gradient-to-br from-orange-50/80 to-red-50/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-orange-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">Address Information</h4>
                <p className="text-sm text-slate-600">Your current residential address</p>
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700" htmlFor="address">
                Complete Address <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`min-h-32 border-2 transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-xl
                    ${!formData.address 
                      ? 'border-slate-200 hover:border-slate-300 focus:border-orange-500' 
                      : 'border-emerald-200 bg-emerald-50/30 focus:border-emerald-500'
                    }
                    focus:ring-4 focus:ring-orange-500/10 shadow-sm hover:shadow-md
                    placeholder:text-slate-400 resize-none`}
                  placeholder="Enter your complete address including street, city, state, and postal code"
                />
                {formData.address && (
                  <div className="absolute right-3 top-3">
                    <Check className="h-4 w-4 text-emerald-500" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Submit Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl"></div>
          <div className="relative flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 pb-6 px-8 border-t-2 border-slate-200">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Auto-save enabled
              </div>
              <span>•</span>
              <span>Form {isFormComplete ? 'complete' : 'in progress'}</span>
            </div>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="px-6 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                onClick={onClose}
              >
                Cancel
              </Button>
              
              <Button
                className={`px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  isFormComplete
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </div>
                ) : isFormComplete ? (
                  <div className="flex items-center gap-3">
                    <Send className="h-5 w-5" />
                    <span>Submit Application</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Save className="h-5 w-5" />
                    <span>Save Draft</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
}