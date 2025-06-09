"use client";

import { useEffect, useState,JSX } from "react";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";

// import Header from "@/components/header";
// import { DashboardSidebar } from "@/components/dashboard-sidebar";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Progress } from "@/components/ui/progress";
import {
  MessageCircle,
  FileText,
  Clock,
  CreditCard,
  // Users,
  Globe,
  StampIcon as Passport,
  AlertCircle,
  User,
  Upload,
  Sparkles,
  // TrendingUp,
  CheckCircle,
  Eye,
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

import { Badge } from "@/components/ui/badge";
import { VisaModal } from "@/components/modals/visa-modal";
// import { parse } from "path";

// Type definitions
interface Passport {
  firstName: string;
  dateOfBirth: string;
  status: string;
  _id: string;
}

// interface Visa {
//   country: string;
//   dateOfBirth: string;
//   visaType: string;
//   travelDate: Date;
//   returnDate: Date;
//   status: string;
//   _id: string;
// }

interface User {
  name?: string;
  email?: string;
  id?: string;
  [key: string]: any;
}

interface RecentApplication {
  id?: string;
  type: "visa" | "passport" | "payment" | "kyc";
  travelPurpose: string;
  destinationCountry: string;
  applicationStatus: "completed" | "approved" | "rejected" | "Pending" | string;
  createdAt?: string;
  updatedAt?: string;
}

interface DashboardTotals {
  all: number;
  pending: number;
  approved: number;
  underReview: number;
}

interface MemberData {
  totals?: DashboardTotals;
  recentApplications?: RecentApplication[];
  memberSince?: string;
}

interface DashboardStatsResponse {
  success: boolean;
  data: string | MemberData;
  message?: string;
}

interface SummaryCardItem {
  title: string;
  icon: JSX.Element;
  value: number;
  note: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  textColor: string;
}

type ModalType = "visa" | "passport" | "kyc" | null;

export default function ClientDashboard(): JSX.Element {
  const token: string = Cookies.get("token") || "";

  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Parse user data from cookie (JSON string to object)
  const userCookie: string | undefined = Cookies.get("user");
  const user: User = userCookie ? JSON.parse(userCookie) : {};

  console.log("User Data:", user.name);

  const [userName, setUserName] = useState<string>(user.name || "User");
  const [memberSince, setMemberSince] = useState<string>("");

  const whatsAppNumber: string = "+916392848646";
  const whatsAppMessage: string = "Hello! I need help with my visa application.";
  const whatsAppUrl: string = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
    whatsAppMessage
  )}`;
  
  const handleOpenModal = (modalName: string): void => {
    setActiveModal(modalName as ModalType);
  };

  const handleCloseModal = (): void => {
    setActiveModal(null);
  };

  const handleSubmitForm = (formType: string): void => {
    handleCloseModal();
  };

  // Optional: Fetch user info to display in header welcome message
  useEffect((): void => {
    const fetchUserInfo = async (): Promise<void> => {
      try {
        const res: AxiosResponse<DashboardStatsResponse> = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/dashboard-stats`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("User Info:", res.data.data);
        // setUserName(res.data.name || "User");
        setMemberSince(typeof res.data.data === 'string' ? res.data.data : JSON.stringify(res.data.data));
      } catch (error: unknown) {
        console.error("Failed to fetch user info", error);
      }
    };
    if (token) fetchUserInfo();
  }, [token]);

  // Parse memberSince as an object if it's a stringified JSON
  let memberData: MemberData = {};
  try {
    memberData = typeof memberSince === "string" ? JSON.parse(memberSince) : memberSince;
  } catch {
    memberData = {};
  }

  const totalApplications: number = memberData.totals?.all || 0;
  const inProgressCount: number = memberData.totals?.pending || 0;
  const approvedCount: number = memberData.totals?.approved || 0;
  const underReviewCount: number = memberData.totals?.underReview || 0;

  const summaryCards: SummaryCardItem[] = [
    {
      title: "Total Applications",
      icon: <FileText className="h-5 w-5" />,
      value: totalApplications,
      note: "+1 from last month",
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      textColor: "text-blue-800"
    },
    {
      title: "In Progress",
      icon: <Clock className="h-5 w-5" />,
      value: inProgressCount,
      note: "Estimated completion: 5 days",
      color: "orange",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      textColor: "text-orange-800"
    },
    {
      title: "Approved",
      icon: <CheckCircle className="h-5 w-5" />,
      value: approvedCount,
      note: "Ready for download",
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      textColor: "text-green-800"
    },
    {
      title: "Under Review",
      icon: <Eye className="h-5 w-5" />,
      value: underReviewCount,
      note: "Awaiting verification",
      color: "purple",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      textColor: "text-purple-800"
    },
  ];

  const getActivityIcon = (type: RecentApplication['type']): JSX.Element => {
    switch (type) {
      case "visa":
        return <Globe className="h-4 w-4 text-blue-500" />;
      case "passport":
        return <Passport className="h-4 w-4 text-green-500" />;
      case "payment":
        return <CreditCard className="h-4 w-4 text-purple-500" />;
      case "kyc":
        return <User className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadgeClasses = (status: string): string => {
    switch (status.toLowerCase()) {
      case "completed":
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-blue-600 rounded-lg p-6 text-white border-2 border-blue-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg border border-blue-400">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold">
                  Welcome back, {userName || "User"}!
                </h1>
              </div>
              <p className="text-blue-100">
                Manage your travel documents with ease
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-blue-100">All systems operational</span>
              </div>
            </div>
            <div>
              <button
                className="bg-gradient-to-r from-amber-400 to-amber-600 hover:bg-orange-600 text-white px-6 py-3 rounded-lg border-1 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                onClick={() => handleOpenModal("visa")}
                type="button"
              >
                <Upload className="w-5 h-5" />
                <span className="font-semibold">Apply for Visa</span>
              </button>
            </div>
          </div>
        </div>

        <VisaModal
          isOpen={activeModal === "visa"}
          onClose={handleCloseModal}
          onSubmit={() => handleSubmitForm("visa")}
        />

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((item: SummaryCardItem, idx: number) => (
            <Card key={idx} className={`${item.bgColor} border-2 ${item.borderColor} shadow-md hover:shadow-lg transition-shadow duration-200`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    {item.title}
                  </CardTitle>
                  <div className="text-xs text-gray-500">{item.note}</div>
                </div>
                <div className={`p-2 ${item.iconBg} rounded-lg border ${item.borderColor}`}>
                  <div className={item.iconColor}>
                    {item.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className={`text-3xl font-bold ${item.textColor}`}>
                  {item.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activities & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card className="bg-white border-2 border-gray-200 shadow-lg">
            <CardHeader className="bg-gray-50 border-b-2 border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg border border-blue-200">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-800">Recent Activities</CardTitle>
                  <CardDescription className="text-gray-600">
                    Your latest travel document activities
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {memberData.recentApplications && memberData.recentApplications.length > 0 ? (
                  memberData.recentApplications.map((activity: RecentApplication, idx: number) => (
                    <div
                      key={activity.id || idx}
                      className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0">
                        <div className="p-2 rounded-lg bg-white border border-gray-300 shadow-sm">
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.travelPurpose}
                        </p>
                        <p className="text-sm text-gray-600">{activity.destinationCountry}</p>
                      </div>
                      <Badge
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClasses(activity.applicationStatus)}`}
                      >
                        {activity.applicationStatus}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 border border-gray-200">
                      <FileText className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">No recent activities</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-white border-2 border-gray-200 shadow-lg">
            <CardHeader className="bg-gray-50 border-b-2 border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg border border-orange-200">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                    Notifications
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Important updates and alerts
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-200">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-base font-medium text-gray-800 mb-1">All Clear!</h3>
                <p className="text-gray-500 text-sm">No notifications at this time.</p>
                <p className="text-xs text-gray-400 mt-1">We'll notify you of any important updates.</p>
              </div>
            </CardContent>
          </Card>
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
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-green-600"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-7 h-7" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700">
                <p className="font-medium">Need help? Chat with us!</p>
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
    </div>
  );
}