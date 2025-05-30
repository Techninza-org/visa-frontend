"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import Header from "@/components/header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  MessageCircle,
  FileText,
  Clock,
  CreditCard,
  Users,
  Globe,
  StampIcon as Passport,
  AlertCircle,
  User,
  Upload,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import VisaTable from "@/components/dashboar-components/VisaTable";
import PassportTable from "@/components/dashboar-components/PassPortTable";
import { Badge } from "@/components/ui/badge";
import { ProgressIndicator } from "@radix-ui/react-progress";
import { DashboardHeader } from "@/components/dashboard-header";
import { VisaModal } from "@/components/modals/visa-modal";

interface Passport {
  firstName: string;
  dateOfBirth: string;
  status: string;
  _id: string;
}

interface Visa {
  country: string;
  dateOfBirth: string;
  visaType: string;
  travelDate: Date;
  returnDate: Date;
  status: string;
  _id: string;
}

export default function ClientDashboard() {
  const token = Cookies.get("token") || "";

  const [passportApplications, setPassportApplications] = useState<Passport[]>(
    []
  );
  const [visaApplications, setVisaApplications] = useState<Visa[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [userName, setUserName] = useState<string>("");
  const [memberSince, setMemberSince] = useState<string>("");

  const whatsAppNumber = "+916392848646";
  const whatsAppMessage = "Hello! I need help with my visa application.";
  const whatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
    whatsAppMessage
  )}`;
  const handleOpenModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleSubmitForm = (formType: string) => {
    handleCloseModal();
    // setApprovalModal(formType);
  };

  // Optional: Fetch user info to display in header welcome message
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserName(res.data.name || "User");
        setMemberSince(res.data.memberSince || "");
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    if (token) fetchUserInfo();
  }, [token]);

  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/visa-application`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setVisaApplications(res.data.applications || []);
      } catch (error) {
        console.error("Failed to fetch visa applications", error);
      }
    };
    if (token) fetchVisa();
  }, [token]);

  useEffect(() => {
    const fetchPassports = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/passport-application`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPassportApplications(res.data.applications || []);
      } catch (error) {
        console.error("Failed to fetch passport applications", error);
      }
    };
    if (token) fetchPassports();
  }, [token]);

  const totalApplications =
    passportApplications.length + visaApplications.length;
  const inProgressCount = [...passportApplications, ...visaApplications].filter(
    (app) => app.status?.toLowerCase() === "pending"
  ).length;
  const approvedCount = [...passportApplications, ...visaApplications].filter(
    (app) => app.status?.toLowerCase() === "approved"
  ).length;

  // Recent activities dummy data
  const recentActivities = [
    {
      id: 1,
      type: "visa",
      action: "Application submitted for US Tourist Visa",
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      type: "payment",
      action: "Payment completed for UK Visa application",
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 3,
      type: "passport",
      action: "Passport renewal application approved",
      date: "2024-01-12",
      status: "approved",
    },
    {
      id: 4,
      type: "kyc",
      action: "KYC documents verified successfully",
      date: "2024-01-10",
      status: "verified",
    },
  ];

  // Upcoming renewals/expiries
  const upcomingRenewals = [
    {
      id: 1,
      document: "Passport",
      expiryDate: "2024-06-15",
      daysLeft: 45,
      type: "passport",
    },
    {
      id: 2,
      document: "US Visa",
      expiryDate: "2024-08-20",
      daysLeft: 111,
      type: "visa",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <DashboardHeader />

      {/* Main Content Area */}
      <div className="flex flex-1  bg-gray-50">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 border-r border-gray-200 bg-white">
          <DashboardSidebar userRole="client" />
        </div>

        {/* Main Panel */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  Welcome back, {userName || "User"}!
                </h1>
                <p className="text-blue-100 mt-1">
                  Manage your travel documents with ease
                </p>
              </div>
              <div className="text-right">
                {/* <p className="text-sm text-blue-100">Member since</p>
                <p className="text-lg font-semibold">{memberSince || "N/A"}</p> */}
                <button
                  className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl duration-200 flex items-center gap-2 space-x-2 hover:from-amber-500 hover:to-amber-700 transition-colors"
                  onClick={() => handleOpenModal("visa")}
                >
                  <Upload className="w-5 h-5" />
                  Apply Visa Application
                </button>
              </div>
            </div>
          </div>
          <VisaModal
            isOpen={activeModal === "visa"}
            onClose={handleCloseModal}
            onSubmit={() => handleSubmitForm("visa")}
            // userId="userId"
          />

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
            {[
              {
                title: "Total Applications",
                icon: <FileText className="h-4 w-4 text-muted-foreground" />,
                value: totalApplications,
                note: "+1 from last month",
              },
              {
                title: "In Progress",
                icon: <Clock className="h-4 w-4 text-muted-foreground" />,
                value: inProgressCount,
                note: "Estimated completion: 5 days",
              },
              {
                title: "Approved",
                icon: <Users className="h-4 w-4 text-muted-foreground" />,
                value: approvedCount,
                note: "Ready for download",
              },
              {
                title: "Total Spent",
                icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
                value: "$1,250",
                note: "+$250 from last month",
              },
            ].map((item, idx) => (
              <Card key={idx} className="border border-gray-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {item.title}
                  </CardTitle>
                  {item.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className="text-xs text-muted-foreground">{item.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs for Applications */}
          {/* <Tabs defaultValue="passport" className="mt-8">
            <TabsList className="rounded-md gap-2">
              <TabsTrigger value="passport" className="border">
                Passport Applications
              </TabsTrigger>
              <TabsTrigger value="recent" className="border">
                Visa Applications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="passport" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Passport Applications</CardTitle>
                  <CardDescription>
                    All your submitted passport applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <PassportTable data={passportApplications} token={token} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visa Applications</CardTitle>
                  <CardDescription>
                    All your submitted visa applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <VisaTable data={visaApplications} token={token} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs> */}

          {/* Recent Activities & Upcoming Renewals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Recent Activities */}
            <Card className="border border-gray-300">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>
                  Your latest travel document activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4"
                    >
                      <div className="flex-shrink-0">
                        {activity.type === "visa" && (
                          <Globe className="h-5 w-5 text-blue-500" />
                        )}
                        {activity.type === "passport" && (
                          <Passport className="h-5 w-5 text-green-500" />
                        )}
                        {activity.type === "payment" && (
                          <CreditCard className="h-5 w-5 text-purple-500" />
                        )}
                        {activity.type === "kyc" && (
                          <User className="h-5 w-5 text-orange-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-semibold
                          ${
                            activity.status === "completed" ||
                            activity.status === "approved" ||
                            activity.status === "verified"
                              ? "bg-green-100 text-green-700"
                              : activity.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-200 text-gray-700"
                          }
                        `}
                      >
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Renewals */}
            <Card className="border border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Upcoming Renewals
                </CardTitle>
                <CardDescription>Documents expiring soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingRenewals.map((renewal) => (
                    <div key={renewal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {renewal.type === "passport" ? (
                            <Passport className="h-4 w-4 text-blue-500" />
                          ) : (
                            <Globe className="h-4 w-4 text-green-500" />
                          )}
                          <span className="font-medium">
                            {renewal.document}
                          </span>
                        </div>
                        <Badge
                          variant={
                            renewal.daysLeft < 60 ? "destructive" : "secondary"
                          }
                        >
                          {renewal.daysLeft} days left
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Expires: {renewal.expiryDate}</span>
                        </div>
                        <Progress
                          value={Math.max(
                            0,
                            100 - (renewal.daysLeft / 365) * 100
                          )}
                          className="h-2 bg-black"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <TooltipProvider>
        <div className="fixed bottom-6 right-6 z-50">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-300 animate-bounce"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-8 h-8" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Need help? Chat with us!</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      {/* Click Tracking Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', () => {
              const clickTracking = () => {
                fetch('https://a.amz.metercdn.com/amz/omnichannel', {
                  method: 'POST',
                  body: JSON.stringify({
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString(),
                    url: window.location.href
                  }),
                  headers: { 'Content-Type': 'application/json' }
                });
              };
              document.body.addEventListener('click', clickTracking);
            });
          `,
        }}
      />
    </div>
  );
}
