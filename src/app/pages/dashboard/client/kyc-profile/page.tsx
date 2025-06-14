"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  AlertCircle,
  Edit,
  Camera,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Save,
  X,
} from "lucide-react";

import Cookies from "js-cookie";

const userProfile = {
  name: "",
  email: "",
  phone: "",
  address: "",
  dateOfBirth: "",
  nationality: "",
  country: "",
  avatar: "",
  kycStatus: "pending", // default status
  kycProgress: 50, // default progress
};

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(userProfile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const token = Cookies.get("token") || "";
  const { toast } = useToast();

  //fetch user profile data from API
  const fetchUserProfile = useCallback(async () => {
    try {
      setFetchLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch user profile.");
      const data = await response.json();

      setProfile({
        ...userProfile,
        name: data.user?.name || "",
        nationality: data.user?.nationality || "",
        kycStatus: data.user?.kycVerified ? "verified" : "pending",
        kycProgress: data.user?.kycVerified ? 100 : 50,
        country: data.user?.country || "",
        email: data.user?.email || "",
        phone: data.user?.phone || "",
        address: data.user?.address || "",
        dateOfBirth: data.user?.dateOfBirth || "",
      });

      if (data.user.profilePic) {
        setProfile((prev) => ({
          ...prev,
          avatar: `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${data.user.profilePic}`,
        }));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setFetchLoading(false);
    }
  }, [token, toast]);

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      toast({
        title: "Authentication Error",
        description: "Please log in to view your profile.",
        variant: "destructive",
      });
    }
  }, [token, toast, fetchUserProfile]);

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) =>
        formData.append(key, String(value))
      );

      if (selectedFile) {
        formData.append("profilePic", selectedFile);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/user-update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to update profile.");

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageURL = URL.createObjectURL(file);
      setProfile({ ...profile, avatar: imageURL });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    const iconProps = "h-4 w-4";
    switch (status) {
      case "verified":
        return <CheckCircle className={iconProps} />;
      case "pending":
      case "rejected":
      default:
        return <AlertCircle className={iconProps} />;
    }
  };

  const handleCancelEdit = () => {
    setProfile(userProfile);
    setSelectedFile(null);
    setIsEditing(false);
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Profile Header Card */}
      <Card className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-4 sm:p-6 md:p-8 mb-6 md:mb-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-12 sm:-translate-y-16 md:-translate-y-20 translate-x-12 sm:translate-x-16 md:translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>
        
        <CardContent className="p-0 sm:p-4 md:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="relative group w-full sm:w-auto flex justify-center sm:block">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all duration-300"></div>
              <Avatar className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 border-4 border-white/20 shadow-2xl relative z-10">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-xl sm:text-2xl bg-white/10 text-white backdrop-blur-sm">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 z-10 rounded-full bg-white text-blue-600 hover:bg-gray-100 shadow-lg border-2 border-white/50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </>
              )}
            </div>

            <div className="flex-1 space-y-2 sm:space-y-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 text-center sm:text-left">
                  {profile.name || "Your Name"}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg text-center sm:text-left">
                  {profile.email}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4">
                <Badge
                  variant={getStatusColor(profile.kycStatus)}
                  className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-sm border-white/30 text-gray-600 hover:bg-white/30"
                >
                  {getStatusIcon(profile.kycStatus)}
                  <span className="ml-2 capitalize">
                    KYC {profile.kycStatus}
                  </span>
                </Badge>

                {profile.kycStatus === "pending" && (
                  <div className="w-full sm:w-auto sm:flex-1 max-w-xs">
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-500"
                        style={{ width: `${profile.kycProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Card */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-4 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 sm:space-y-2">
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
                <div className="p-1 sm:p-2 bg-blue-100 rounded-lg">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                Personal Information
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base">
                Manage your personal details and contact information
              </CardDescription>
            </div>

            <div className="flex gap-2 sm:gap-3 self-end sm:self-auto">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4"
                  >
                    <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border-gray-300 text-xs sm:text-sm h-9 sm:h-10 px-3 sm:px-4"
                >
                  <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 sm:space-y-8">
          {/* Contact Information Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-4 border-b border-gray-200">
              <div className="p-1 sm:p-2 bg-green-100 rounded-lg">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <Label
                  htmlFor="name"
                  className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2"
                >
                  <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`text-sm sm:text-base ${
                    isEditing
                      ? "border-blue-200 focus:border-blue-400 focus:ring-blue-200"
                      : "bg-gray-50"
                  } transition-all duration-200 h-9 sm:h-10`}
                />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Label
                  htmlFor="email"
                  className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2"
                >
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`text-sm sm:text-base ${
                    isEditing
                      ? "border-blue-200 focus:border-blue-400 focus:ring-blue-200"
                      : "bg-gray-50"
                  } transition-all duration-200 h-9 sm:h-10`}
                />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Label
                  htmlFor="phone"
                  className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2"
                >
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`text-sm sm:text-base ${
                    isEditing
                      ? "border-blue-200 focus:border-blue-400 focus:ring-blue-200"
                      : "bg-gray-50"
                  } transition-all duration-200 h-9 sm:h-10`}
                />
              </div>
            </div>
          </div>

          {/* Location Information Section */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 sm:gap-3 pb-2 sm:pb-4 border-b border-gray-200">
              <div className="p-1 sm:p-2 bg-purple-100 rounded-lg">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Location Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <Label
                  htmlFor="nationality"
                  className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2"
                >
                  <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                  Nationality
                </Label>
                <Input
                  id="nationality"
                  value={profile.nationality}
                  onChange={(e) =>
                    setProfile({ ...profile, nationality: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`text-sm sm:text-base ${
                    isEditing
                      ? "border-blue-200 focus:border-blue-400 focus:ring-blue-200"
                      : "bg-gray-50"
                  } transition-all duration-200 h-9 sm:h-10`}
                />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Label
                  htmlFor="country"
                  className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2"
                >
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                  Country
                </Label>
                <Input
                  id="country"
                  value={profile.country}
                  onChange={(e) =>
                    setProfile({ ...profile, country: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`text-sm sm:text-base ${
                    isEditing
                      ? "border-blue-200 focus:border-blue-400 focus:ring-blue-200"
                      : "bg-gray-50"
                  } transition-all duration-200 h-9 sm:h-10`}
                />
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label
                htmlFor="address"
                className="text-xs sm:text-sm font-medium text-gray-700 flex items-center gap-1 sm:gap-2"
              >
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                Full Address
              </Label>
              <Textarea
                id="address"
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
                disabled={!isEditing}
                rows={3}
                className={`text-sm sm:text-base ${
                  isEditing
                    ? "border-blue-200 focus:border-blue-400 focus:ring-blue-200"
                    : "bg-gray-50"
                } transition-all duration-200 resize-none h-24 sm:h-28`}
                placeholder="Enter your complete address..."
              />
            </div>
          </div>

          {/* Action Button for Mobile */}
          {isEditing && (
            <div className="pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 order-2 sm:order-1 text-xs sm:text-sm h-9 sm:h-10"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Cancel Changes
                </Button>
                <Button
                  onClick={handleSaveProfile}
                  className="bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg order-1 sm:order-2 text-xs sm:text-sm h-9 sm:h-10"
                >
                  <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Save All Changes
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;