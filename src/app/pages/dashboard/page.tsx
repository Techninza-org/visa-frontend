"use client";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
import { FileText, Clock, CreditCard, Users } from "lucide-react";
// import Link from "next/link";
import { ProcessButtons } from "@/components/process-buttons";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

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

export default function ClientDashboard() {
  // const userName = "John Doe"; // Can be dynamically passed later
  const [applications, setApplications] = useState([]);
  const [passportapplications, setPassportapplications] = useState([]);
  const [visaApplications, setVisaapplications] = useState([]);
  const [userProdile, setUserprofile] = useState<Profile>();

  const token = Cookies.get("token") || "";

  interface JwtPayload {
    _id: string;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const decoded = jwtDecode(token);
        // console.log(decoded, "i");

        const { _id } = decoded as JwtPayload; // or decoded._id based on your backend

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}profile/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserprofile(res.data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/visa/allapplications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVisaapplications(res.data);
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
          `${process.env.NEXT_PUBLIC_API_URL}/passport/passports`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPassportapplications(res.data.data);
      } catch (error) {
        console.error("Failed to fetch passport applications", error);
      }
    };

    fetchPassports();
  }, [token]);

  // const getPassStatusColor = (status: string) => {
  //   switch (status.toLowerCase()) {
  //     case "approved":
  //       return "text-green-600";
  //     case "pending":
  //       return "text-yellow-500";
  //     case "rejected":
  //       return "text-red-500";
  //     default:
  //       return "text-gray-500";
  //   }
  // };

  useEffect(() => {
    const fetchKYCs = async () => {
      // get token from cookies

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/kyc/alldetails`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApplications(response.data.data);
      } catch (error) {
        console.error("Failed to fetch KYC data", error);
      }
    };

    fetchKYCs();
  }, [token]);

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
                Welcome back, {userProdile?.name}
              </p>
            </div>
            <Link href="/pages/dashboard/client/applications">
              <Button className="bg-gradient-to-r from-amber-400 to-amber-600 text-black backdrop-blur-lg hover:bg-amber-600 border border-amber-500/20">
                Apply Passport
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6 border border-gray-200 rounded-md p-4">
            {[
              {
                title: "Total Applications",
                icon: <FileText className="h-4 w-4 text-muted-foreground " />,
                value: "3",
                note: "+1 from last month",
              },
              {
                title: "In Progress",
                icon: <Clock className="h-4 w-4 text-muted-foreground" />,
                value: "1",
                note: "Estimated completion: 5 days",
              },
              {
                title: "Approved",
                icon: <Users className="h-4 w-4 text-muted-foreground" />,
                value: "2",
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

          <Tabs defaultValue="recent" className="mt-6">
            <TabsList className="rounded-md gap-2">
              {/* <TabsTrigger
                value="documents"
                className="border border-gray-300 rounded-md"
              >
                Required Documents
              </TabsTrigger> */}
              <TabsTrigger
                value="allkycs"
                className="border border-gray-300 rounded-md"
              >
                Kyc satus
              </TabsTrigger>
              <TabsTrigger
                value="passport"
                className="border border-gray-300 rounded-md"
              >
                Resent Passport Applications
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="border border-gray-300 rounded-md"
              >
                Recent Visa Applications
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="border border-gray-300 rounded-md"
              >
                Recent Payments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="allkycs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent KYC Applications</CardTitle>
                  <CardDescription>
                    Your most recent KYC applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {applications.map((app: App, idx: number) => (
                    <div
                      key={idx}
                      className="grid grid-cols-3 gap-4 rounded-md border p-4"
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

            {/* <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>
                    Your most recent visa applications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Tourist Visa",
                      date: "May 1, 2025",
                      status: "Under Review",
                      statusColor: "text-yellow-500",
                    },
                    {
                      title: "Business Visa",
                      date: "April 15, 2025",
                      status: "Approved",
                      statusColor: "text-green-500",
                    },
                    {
                      title: "Student Visa",
                      date: "March 20, 2025",
                      status: "Approved",
                      statusColor: "text-green-500",
                    },
                  ].map((app, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-3 gap-4 rounded-md border p-4"
                    >
                      <div>
                        <h3 className="font-medium">{app.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Submitted on {app.date}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">Status</h3>
                        <p className={`text-sm ${app.statusColor}`}>
                          {app.status}
                        </p>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/pages/dashboard/client/track">View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent> */}

            <TabsContent value="passport" className="space-y-4">
              <Card className="shadow-xl border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    Passport Applications
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    All your submitted passport applications are listed here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {passportapplications.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                      No applications found.
                    </p>
                  ) : (
                    passportapplications.map((passport: Passport, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-lg border border-black p-4 hover:shadow-md transition duration-200 bg-white"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {passport.firstName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(
                              passport?.dateOfBirth
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700">Status</h4>
                          <p
                            className={`text-sm font-semibold ${getStatusColor(
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
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <Card className="shadow-xl border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    Passport Applications
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    All your submitted passport applications are listed here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {visaApplications.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                      No applications found.
                    </p>
                  ) : (
                    visaApplications.map((visaApplications: Visa, visa) => (
                      <div
                        key={visa}
                        className="grid grid-cols-1 sm:grid-cols-6 gap-4 rounded-lg border border-black p-4 hover:shadow-md transition duration-200 bg-white"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {visaApplications.country}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(
                              visaApplications?.dateOfBirth
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            Visa Type
                          </h3>
                          <p className="text-sm text-gray-800">
                            {visaApplications.visaType}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            Travel date
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(
                              visaApplications?.travelDate
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-800">
                            Return date
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(
                              visaApplications?.returnDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700">Status</h4>
                          <p
                            className={`text-sm font-semibold ${getStatusColor(
                              visaApplications.status
                            )}`}
                          >
                            {visaApplications.status.charAt(0).toUpperCase() +
                              visaApplications.status.slice(1)}
                          </p>
                        </div>
                        <div className="flex items-center justify-end">
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={`/pages/dashboard/client/visatrack?visa_id=${visaApplications._id}`}
                            >
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Your recent payment history</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "USA Tourist Visa",
                      date: "May 1, 2025",
                      amount: "$250",
                    },
                    {
                      title: "UK Business Visa",
                      date: "April 15, 2025",
                      amount: "$500",
                    },
                    {
                      title: "Schengen Tourist Visa",
                      date: "March 20, 2025",
                      amount: "$500",
                    },
                  ].map((payment, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-4 gap-4 rounded-md border p-4"
                    >
                      <div>
                        <h3 className="font-medium">{payment.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {payment.date}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">Amount</h3>
                        <p className="text-sm">{payment.amount}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Status</h3>
                        <p className="text-sm text-green-500">Paid</p>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button variant="outline" size="sm">
                          Invoice
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <ProcessButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
