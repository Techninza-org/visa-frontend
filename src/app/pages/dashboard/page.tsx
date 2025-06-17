"use client";

import { useEffect, useState, JSX } from "react";
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
import Link from "next/link";
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

  // console.log("User Data:", user.name);

  const [userName, setUserName] = useState<string>(user.name || "User");
  const [memberSince, setMemberSince] = useState<string>("");

  const whatsAppNumber: string = "+919999390696";
  const whatsAppMessage: string =
    "Hello! I need help with my visa application.";
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
        setMemberSince(
          typeof res.data.data === "string"
            ? res.data.data
            : JSON.stringify(res.data.data)
        );
      } catch (error: unknown) {
        console.error("Failed to fetch user info", error);
      }
    };
    if (token) fetchUserInfo();
  }, [token]);

  // Parse memberSince as an object if it's a stringified JSON
  let memberData: MemberData = {};
  try {
    memberData =
      typeof memberSince === "string" ? JSON.parse(memberSince) : memberSince;
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
    icon: <FileText className="h-6 w-6" />,
    value: totalApplications,
    note: "+1 from last month",
    color: "blue",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-300",
    borderColor: "border-blue-300",
    iconBg: "bg-white",
    iconColor: "text-blue-600",
    textColor: "text-blue-800",
  },
  {
    title: "In Progress",
    icon: <Clock className="h-6 w-6" />,
    value: inProgressCount,
    note: "Estimated completion: 5 days",
    color: "orange",
    bgColor: "bg-gradient-to-br from-orange-100 to-orange-300",
    borderColor: "border-orange-300",
    iconBg: "bg-white",
    iconColor: "text-orange-600",
    textColor: "text-orange-800",
  },
  {
    title: "Approved",
    icon: <CheckCircle className="h-6 w-6" />,
    value: approvedCount,
    note: "Ready for download",
    color: "green",
    bgColor: "bg-gradient-to-br from-green-100 to-green-300",
    borderColor: "border-green-300",
    iconBg: "bg-white",
    iconColor: "text-green-600",
    textColor: "text-green-800",
  },
  {
    title: "Under Review",
    icon: <Eye className="h-6 w-6" />,
    value: underReviewCount,
    note: "Awaiting verification",
    color: "purple",
    bgColor: "bg-gradient-to-br from-purple-100 to-purple-300",
    borderColor: "border-purple-300",
    iconBg: "bg-white",
    iconColor: "text-purple-600",
    textColor: "text-purple-800",
  },
];

  const getActivityIcon = (type: RecentApplication["type"]): JSX.Element => {
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-5 lg:px-6 py-4 sm:py-5 md:py-6 space-y-4 sm:space-y-5 md:space-y-6">
        {/* Welcome Banner */}
        <div className="bg-blue-600 rounded-lg p-4 sm:p-5 md:p-6 text-white border-2 border-blue-700 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1 sm:p-2 bg-blue-500 rounded-lg border border-blue-400">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold">
                  Welcome back, {userName || "User"}!
                </h1>
              </div>
              <p className="text-sm sm:text-base text-blue-100">
                Manage your travel documents with ease
              </p>
              <div className="flex items-center gap-2 mt-1 sm:mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs sm:text-sm text-blue-100">
                  All systems operational
                </span>
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <button
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-600 hover:bg-orange-600 text-white px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 rounded-lg border-1 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                onClick={() => handleOpenModal("visa")}
                type="button"
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-semibold">
                  Apply for Visa
                </span>
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
        <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((item: SummaryCardItem, idx: number) => (
            <Link
              href={`/pages/dashboard/client/visa-applications`}
              className="no-underline"
              key={idx}
            >
              <Card
                className={`${item.bgColor} border-2 ${item.borderColor} shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-xs xs:text-sm sm:text-sm font-medium text-gray-700 uppercase tracking-wide">
                      {item.title}
                    </CardTitle>
                    <div className="text-xs text-gray-500">{item.note}</div>
                  </div>
                  <div
                    className={`p-1 sm:p-2 ${item.iconBg} rounded-lg border ${item.borderColor}`}
                  >
                    <div className={item.iconColor}>{item.icon}</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-bold ${item.textColor}`}>
                    {item.value}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activities & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {/* Recent Activities */}
          <Card className="bg-white border-2 border-gray-200 shadow-lg">
            <CardHeader className="bg-gray-50 border-b-2 border-gray-200 p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1 sm:p-2 bg-blue-100 rounded-lg border border-blue-200">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg text-gray-800">
                    Recent Activities
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-gray-600">
                    Your latest travel document activities
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2 sm:p-3 md:p-4">
              <div className="space-y-2 sm:space-y-3">
                {memberData.recentApplications &&
                memberData.recentApplications.length > 0 ? (
                  memberData.recentApplications.map(
                    (activity: RecentApplication, idx: number) => (
                      <div
                        key={activity.id || idx}
                        className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex-shrink-0">
                          <div className="p-1 sm:p-2 rounded-lg bg-white border border-gray-300 shadow-sm">
                            {getActivityIcon(activity.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                            {activity.travelPurpose}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {activity.destinationCountry}
                          </p>
                        </div>
                        <Badge
                          className={`px-2 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium border ${getStatusBadgeClasses(
                            activity.applicationStatus
                          )}`}
                        >
                          {activity.applicationStatus}
                        </Badge>
                      </div>
                    )
                  )
                ) : (
                  <div className="text-center py-4 sm:py-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 border border-gray-200">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      No recent activities
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-white border-2 border-gray-200 shadow-lg">
            <CardHeader className="bg-gray-50 border-b-2 border-gray-200 p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1 sm:p-2 bg-orange-100 rounded-lg border border-orange-200">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg text-gray-800 flex items-center gap-2">
                    Notifications
                    <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-gray-600">
                    Important updates and alerts
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2 sm:p-3 md:p-4">
              {Array.isArray(memberData.notifications) && memberData.notifications.length > 0 ? (
              <div className="space-y-3">
                {memberData.notifications.map(
                (
                  notif: {
                  _id?: string;
                  title?: string;
                  message?: string;
                  createdAt?: string;
                  [key: string]: any;
                  },
                  idx: number
                ) => (
                  <div
                  key={notif._id || idx}
                  className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-2"
                  >
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-1" />
                  <div>
                    <div className="text-xs sm:text-sm text-gray-900 font-semibold">
                    {notif.title}
                    </div>
                    {notif.message && (
                    <div className="text-xs sm:text-sm text-gray-800">{notif.message}</div>
                    )}
                    {notif.createdAt && (
                    <div className="text-xs text-gray-400">
                      {new Date(notif.createdAt).toLocaleString()}
                    </div>
                    )}
                  </div>
                  </div>
                )
                )}
              </div>
              ) : (
              <div className="text-center py-4 sm:py-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 border border-green-200">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                </div>
                <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-1">
                All Clear!
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                No notifications at this time.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                We'll notify you of any important updates.
                </p>
              </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* WhatsApp Floating Button */}
        <TooltipProvider>
          <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-green-600"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className="bg-gray-800 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg border border-gray-700 text-xs sm:text-sm"
              >
                <p className="font-medium">Need help? Chat with us!</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        {/* Click Tracking Script (unchanged) */}
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