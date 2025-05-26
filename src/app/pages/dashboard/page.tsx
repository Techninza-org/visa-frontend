"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

import Header from "@/components/header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageCircle } from "lucide-react";
import jsPDF from "jspdf";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProcessButtons } from "@/components/process-buttons";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FileText, Clock, CreditCard, Users } from "lucide-react";

import VisaTable from "@/components/dashboar-components/VisaTable";
import Passport from "@/components/dashboar-components/PassPortTable";
import PassportTable from "@/components/dashboar-components/PassPortTable";

interface Profile {
  name: string;
}

interface App {
  firstName: string;
  createdAt: string;
  status: string;
  _id: string;
}

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

// types/index.ts (or in the same file)
export interface VisaApplication {
  _id: string;
  fullName: string;
  destinationCountry: string;
  travelDate: string;
  travelDurationInDays: number;
  applicationStatus: string;
  priority: string;
  [key: string]: any;
}


interface JwtPayload {
  _id: string;
}

export default function ClientDashboard() {
  const token = Cookies.get("token") || "";

  const [applications, setApplications] = useState<App[]>([]);
  const [passportApplications, setPassportApplications] = useState<Passport[]>(
    []
  );
  const [visaApplications, setVisaApplications] = useState<Visa[]>([]);
  const [userProfile, setUserProfile] = useState<Profile>();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedVisaId, setSelectedVisaId] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [whatsAppNumber] = useState("+916392848646"); // Replace with your WhatsApp number
  const [whatsAppMessage] = useState(
    "Hello! I need help with my visa application."
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      case "pending":
        return "text-yellow-500";
      default:
        return "text-muted-foreground";
    }
  };

  // Get base URL from .env (must start with REACT_APP_)
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleDownloadPDF = async (visa) => {
    const doc = new jsPDF();

    doc.text("Visa Application", 10, 10);
    doc.text(`Country: ${visa.country}`, 10, 20);
    doc.text(`Visa Type: ${visa.visaType}`, 10, 30);
    doc.text(
      `Travel Dates: ${new Date(
        visa.travelDate
      ).toLocaleDateString()} - ${new Date(
        visa.returnDate
      ).toLocaleDateString()}`,
      10,
      40
    );
    doc.text(`Status: ${visa.status}`, 10, 50);
    doc.text(`Bank Statement:`, 10, 60);

    // Construct full image URL
    const imageUrl = `${BASE_URL}${visa.documents.bankStatement}`;

    try {
      const imageData = await getImageBase64(imageUrl);
      doc.addImage(imageData, "JPEG", 10, 70, 180, 120); // Customize dimensions as needed
    } catch (error) {
      doc.text("Unable to load bank statement image.", 10, 70);
    }

    doc.save(`visa-${visa._id}.pdf`);
  };

  // Convert image URL to base64
  // const getImageBase64 = (url) => {
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.crossOrigin = "Anonymous"; // Important for CORS if needed
  //     img.onload = () => {
  //       const canvas = document.createElement("canvas");
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       const ctx = canvas.getContext("2d");
  //       ctx.drawImage(img, 0, 0);
  //       resolve(canvas.toDataURL("image/jpeg"));
  //     };
  //     img.onerror = reject;
  //     img.src = url;
  //   });
  // };

  // Helper function to convert image URL to Base64
  const getImageBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Important if the image is hosted elsewhere
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL("image/jpeg");
        resolve(dataURL);
      };
      img.onerror = reject;
      img.src = url;
    });
  };



  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/visa-application`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Visa Applications:", res.data.applications);
        setVisaApplications(res.data.applications);
      } catch (error) {
        console.error("Failed to fetch visa applications", error);
      }
    };

    fetchVisa();
  }, [token]);



  useEffect(() => {
    const fetchPassports = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/passport-application`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Passport Applications:", res.data.applications);
        setPassportApplications(res.data.applications);
      } catch (error) {
        console.error("Failed to fetch passport applications", error);
      }
    };

    fetchPassports();
  }, [token]);

  useEffect(() => {
    const fetchKYCs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/kyc/alldetails`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplications(response.data.data);
      } catch (error) {
        console.error("Failed to fetch KYC data", error);
      }
    };

    fetchKYCs();
  }, [token]);

  const whatsAppUrl = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
    whatsAppMessage
  )}`;





  return (
    <div>
      <Header />
      <div className="flex flex-col lg:flex-row p-4 lg:p-8 mt-20">
        <DashboardSidebar userRole="client" />
        <div className="flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {userProfile?.name}
              </p>
            </div>
            <ProcessButtons />
          </div>

          {/* Dashboard Cards */}
          {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6 border border-gray-200 rounded-md p-4">
            {[
              {
                title: "Total Applications",
                icon: <FileText className="h-4 w-4 text-muted-foreground" />,
                value:
                  applications.length +
                  passportApplications.length +
                  visaApplications.length,
                note: "+1 from last month",
              },
              {
                title: "In Progress",
                icon: <Clock className="h-4 w-4 text-muted-foreground" />,
                value: [
                  ...applications,
                  ...passportApplications,
                  ...visaApplications,
                ].filter((app: any) => app.status.toLowerCase() === "pending")
                  .length,
                note: "Estimated completion: 5 days",
              },
              {
                title: "Approved",
                icon: <Users className="h-4 w-4 text-muted-foreground" />,
                value: [
                  ...applications,
                  ...passportApplications,
                  ...visaApplications,
                ].filter((app: any) => app.status.toLowerCase() === "approved")
                  .length,
                note: "Ready for download",
              },
              {
                title: "Total Spent",
                icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
                value: "$1,250", // Placeholder
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
          </div> */}

          {/* Tabs Section */}
          <Tabs defaultValue="allkycs" className="mt-6">
            <TabsList className="rounded-md gap-2">
              <TabsTrigger value="allkycs" className="border">
                KYC Status
              </TabsTrigger>
              <TabsTrigger value="passport" className="border">
                Passport Applications
              </TabsTrigger>
              <TabsTrigger value="recent" className="border">
                Visa Applications
              </TabsTrigger>
              <TabsTrigger value="visapack" className="border">
                Visa pack
              </TabsTrigger>
            </TabsList>

            {/* KYC Tab */}
            <TabsContent value="allkycs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent KYC Applications</CardTitle>
                  <CardDescription>
                    Your most recent KYC applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {applications.map((app, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-3 gap-4 border p-4 rounded-md"
                    >
                      <div>
                        <h3 className="font-medium">{app.firstName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Submitted on{" "}
                          {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">Status</h3>
                        <p className={`text-sm ${getStatusColor(app.status)}`}>
                          {app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)}
                        </p>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={`/pages/dashboard/client/track?id=${app._id}`}
                          >
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Passport Tab */}
            <TabsContent value="passport" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Passport Applications</CardTitle>
                  <CardDescription>
                    All your submitted passport applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* {passportApplications.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                      No applications found.
                    </p>
                  ) : (
                    passportApplications.map((passport, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-3 gap-4 border p-4 rounded-md"
                      >
                        <div>
                          <h3 className="font-medium">{passport.firstName}</h3>
                          <p className="text-sm text-muted-foreground">
                            DOB:{" "}
                            {new Date(
                              passport.dateOfBirth
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium">Status</h3>
                          <p
                            className={`text-sm ${getStatusColor(
                              passport.status
                            )}`}
                          >
                            {passport.status.charAt(0).toUpperCase() +
                              passport.status.slice(1)}
                          </p>
                        </div>
                        <div className="flex items-center justify-end">
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={`/pages/dashboard/client/passporttrack?pass_id=${passport._id}`}
                            >
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))
                  )} */}
                  
                <PassportTable data={passportApplications} token={token} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Visa Tab */}
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



            {/* <TabsContent value="visapack" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Approved Visa Applications</CardTitle>
                  <CardDescription>
                    All your approved visa applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {visaApplications.filter(
                    (visa) => visa.status.toLowerCase() === "approved"
                  ).length === 0 ? (
                    <p className="text-center text-muted-foreground">
                      No approved applications found.
                    </p>
                  ) : (
                    visaApplications
                      .filter(
                        (visa) => visa.status.toLowerCase() === "approved"
                      )
                      .map((visa, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-3 gap-4 border p-4 rounded-md"
                        >
                          <div>
                            <h3 className="font-medium">
                              {visa.country} ({visa.visaType})
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Travel:{" "}
                              {new Date(visa.travelDate).toLocaleDateString()} -{" "}
                              {new Date(visa.returnDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium">Status</h3>
                            <p
                              className={`text-sm ${getStatusColor(
                                visa.status
                              )}`}
                            >
                              {visa.status.charAt(0).toUpperCase() +
                                visa.status.slice(1)}
                            </p>
                          </div>
                          <div className="flex items-center justify-end gap-5">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadPDF(visa)}
                            >
                              Download
                            </Button>
                          </div>
                        </div>
                      ))
                  )}
                </CardContent>
              </Card>
            </TabsContent> */}
          </Tabs>
          <ProcessButtons />
        </div>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
            function initWhatsApp() {
              // WhatsApp click tracking
              document.querySelector('[aria-label="Chat on WhatsApp"]').addEventListener('click', function() {
                if (typeof gtag !== 'undefined') {
                  gtag('event', 'click', {
                    'event_category': 'WhatsApp',
                    'event_label': 'Support Chat'
                  });
                }
              });
            }
            window.addEventListener('load', initWhatsApp);
          `,
          }}
        />
      </div>
    </div>
  );
}
