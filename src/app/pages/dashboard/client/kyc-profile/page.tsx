"use client";

import { useState, useRef, use, useEffect } from "react";
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
  Calendar,
  Globe,
  MapPin,
  Save,
  X,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
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
  const token = Cookies.get("token") || "";
  const { toast } = useToast();

  //fetch user profile data from API
  const fetchUserProfile = async () => {
    try {
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

      console.log("User profile data fetched:", data.user.profilePic);  

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
    }
  };

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
  }, [token, toast]);

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) =>
        formData.append(key, value)
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-30  bg-white shadow">
        <DashboardHeader />
      </div>

      <div className="flex flex-1 justify-center">
        <div className="fixed top-20 bottom-0 left-0 bg-gray-100 z-40">
          <DashboardSidebar userRole="client" />
        </div>

        <div className="flex-1 p-6 max-w-4xl mx-auto mt-20 md:mt-12 lg:mt-12 ">
          {/* Profile Header Card */}
          <Card className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 mb-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 rounded-full translate-y-12 -translate-x-12"></div>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all duration-300"></div>
                  <Avatar className="h-32 w-32 border-4 border-white/20 shadow-2xl relative z-10">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-2xl bg-white/10 text-white backdrop-blur-sm">
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
                        className="absolute -bottom-2 -right-2 h-10 w-10 z-10 rounded-full bg-white text-blue-600 hover:bg-gray-100 shadow-lg border-2 border-white/50"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="h-5 w-5" />
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

                <div className="flex-1 space-y-3">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {profile.name || "Your Name"}
                    </h1>
                    <p className="text-gray-600 text-lg">{profile.email}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge
                      variant={getStatusColor(profile.kycStatus)}
                      className="px-4 py-2 text-sm font-medium bg-white/20 backdrop-blur-sm border-white/30 text-gray-600 hover:bg-white/30"
                    >
                      {getStatusIcon(profile.kycStatus)}
                      <span className="ml-2 capitalize">
                        KYC {profile.kycStatus}
                      </span>
                    </Badge>

                    {profile.kycStatus === "pending" && (
                      <div className="flex-1 max-w-48">
                        <div className="text-sm text-gray-600 mb-1">
                          KYC Progress
                        </div>
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
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    Manage your personal details and contact information
                  </CardDescription>
                </div>

                <div className="flex gap-3">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-gradient-to-r from-amber-400 to-amber-600  hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 border-gray-300"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Contact Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Contact Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <User className="h-4 w-4 text-gray-500" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      disabled={!isEditing}
                      className={`${
                        isEditing
                          ? "border-blue-200 focus:border-blue-400 focus:ring-blue-200"
                          : "bg-gray-50"
                      } transition-all duration-200`}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4 text-gray-500" />
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
                      className={`${
                        isEditing
                          ? "border-blue-200 focus:border-blue-400 focus:ring-blue-200"
                          : "bg-gray-50"
                      } transition-all duration-200`}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4 text-gray-500" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      disabled={!isEditing}
                      className={`${
                        isEditing
                          ? "border-blue-200 focus:border-blue-400 focus:ring-blue-200"
                          : "bg-gray-50"
                      } transition-all duration-200`}
                    />
                  </div>

                  {/* <div className="space-y-3">
                    <Label
                      htmlFor="dob"
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4 text-gray-500" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) =>
                        setProfile({ ...profile, dateOfBirth: e.target.value })
                      }
                      disabled={!isEditing}
                      className={`${
                        isEditing
                          ? "border-blue-200 focus:border-blue-400 focus:ring-blue-200"
                          : "bg-gray-50"
                      } transition-all duration-200`}
                    />
                  </div> */}
                </div>
              </div>

              {/* Location Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Globe className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Location Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="nationality"
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4 text-gray-500" />
                      Nationality
                    </Label>
                    <Input
                      id="nationality"
                      value={profile.nationality}
                      onChange={(e) =>
                        setProfile({ ...profile, nationality: e.target.value })
                      }
                      disabled={!isEditing}
                      className={`${
                        isEditing
                          ? "border-blue-200 focus:border-blue-400 focus:ring-blue-200"
                          : "bg-gray-50"
                      } transition-all duration-200`}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="country"
                      className="text-sm font-medium text-gray-700 flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4 text-gray-500" />
                      Country
                    </Label>
                    <Input
                      id="country"
                      value={profile.country}
                      onChange={(e) =>
                        setProfile({ ...profile, country: e.target.value })
                      }
                      disabled={!isEditing}
                      className={`${
                        isEditing
                          ? "border-blue-200 focus:border-blue-400 focus:ring-blue-200"
                          : "bg-gray-50"
                      } transition-all duration-200`}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="address"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4 text-gray-500" />
                    Full Address
                  </Label>
                  <Textarea
                    id="address"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    disabled={!isEditing}
                    rows={4}
                    className={`${
                      isEditing
                        ? "border-blue-200 focus:border-blue-400 focus:ring-blue-200"
                        : "bg-gray-50"
                    } transition-all duration-200 resize-none`}
                    placeholder="Enter your complete address..."
                  />
                </div>
              </div>

              {/* Action Button for Mobile */}
              {isEditing && (
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <Button
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 order-2 sm:order-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel Changes
                    </Button>
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-gradient-to-r from-amber-400 to-amber-600  text-white shadow-lg order-1 sm:order-2"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save All Changes
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
export { ProfilePage };
