"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/header";

interface PassportApplication {
  fullName: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  applicationType: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  processingDeadline: string;
  documents: {
    aadharCard?: string;
    dobProof?: string;
    identityProof?: string;
    passportPhotos?: string[];
    employmentProof?: string;
    annexures?: string[];
    oldPassport?: string;
    policeVerificationProof?: string;
  };
}

export default function TrackStatusPage() {
  const [passData, setPassData] = useState<PassportApplication | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const passportId = searchParams.get("pass_id");
  const token = Cookies.get("token");

  useEffect(() => {
    if (!passportId || !token) return;
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/passport-application/${passportId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch passport application");
        const json = await res.json();
        setPassData(json.application); // your API returns `application`
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [passportId, token]);

  const renderImage = (label: string, url?: string) => {
    if (!url) return null;
    return (
      <div>
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${url}`}
          alt={label}
          className="w-full h-40 object-cover rounded border"
        />
        
      </div>
    );
  };

  return (
        <div className="min-h-screen flex flex-col">
             {/* Fixed Header */}
             <Header />
      {/* Main Content Area */}
         <div className="flex flex-1 pt-[4.5rem] bg-gray-50">
           {/* Sidebar */}
           <div className="hidden lg:block w-64 border-r border-gray-200 bg-white">
             <DashboardSidebar userRole="client" />
           </div>
        <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              Track Applications
            </h1>
            <p className="text-lg text-gray-600">
              Monitor the status of your visa applications
            </p>
          </div>
        </div>

        <Tabs defaultValue="active" className="mt-8">
          <TabsList className="border-b border-gray-200">
            <TabsTrigger
              value="active"
              className="px-6 py-2 text-lg font-semibold text-gray-700 hover:text-gray-900"
            >
              Passport Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {loading && (
              <p className="text-gray-600 text-sm mt-4">
                Loading passport application...
              </p>
            )}
            {error && (
              <p className="text-red-500 text-sm mt-4">Error: {error}</p>
            )}
            {passData && (
              <Card className="mt-8 shadow-xl rounded-2xl border border-gray-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Passport Details
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Personal passport verification information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Full Name
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {passData.fullName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">DOB</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {new Date(passData.dob).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Gender
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {passData.gender}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Marital Status
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {passData.maritalStatus}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {passData.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {passData.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Nationality
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {passData.nationality}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Application Type
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {passData.applicationType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Priority
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {passData.priority}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Status
                      </p>
                      <span
                        className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${
                          passData.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {passData.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Address
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {passData.address}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Documents
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {renderImage("Aadhar Card", passData.documents.aadharCard)}
                      {renderImage("DOB Proof", passData.documents.dobProof)}
                      {renderImage(
                        "Identity Proof",
                        passData.documents.identityProof
                      )}
                      {renderImage(
                        "Employment Proof",
                        passData.documents.employmentProof
                      )}
                      {renderImage(
                        "Old Passport",
                        passData.documents.oldPassport
                      )}
                      {renderImage(
                        "Police Verification",
                        passData.documents.policeVerificationProof
                      )}

                      {passData.documents.passportPhotos?.map((img, idx) => (
                        <div key={`passport-photo-${idx}`}>
                          <p className="text-xs text-gray-500 mb-1">
                            Passport Photo {idx + 1}
                          </p>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${img}`}
                            alt={`Passport ${idx + 1}`}
                            className="w-full h-40 object-cover rounded border"
                          />
                        </div>
                      ))}

                      {passData.documents.annexures?.map((img, idx) => (
                        <div key={`annexure-${idx}`}>
                          <p className="text-xs text-gray-500 mb-1">
                            Annexure {idx + 1}
                          </p>
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${img}`}
                            alt={`Annexure ${idx + 1}`}
                            className="w-full h-40 object-cover rounded border"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </div>
  );
}
