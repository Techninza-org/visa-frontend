"use client";

import { useEffect, useState } from "react";
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
// import {
//   CheckCircle2,
//   Clock,
//   FileText,
//   AlertCircle,
//   CheckCheck,
// } from "lucide-react";
import { useSearchParams } from "next/navigation";
// import { Image } from "lucide-react";
import Image from "next/image";

interface KycData {
  visaType: string;
  firstName: string;
  travelDate: Date;
  returnDate: Date;
  travelPurpose: string;
  accommodation: string;
  hasInvitation: string;
  documents: {
    photo: string;
    bankStatement: string;
    invitation: string;
  };
  photo: string;
  bankStatement: string;
  invitation: string;
  status: string;
}

export default function TrackStatusPage() {
  const [visaData, setVisaData] = useState<KycData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const kycId = searchParams.get("id");
  console.log(kycId, "kycid");

  const token = Cookies.get("token");

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/kyc/details/${kycId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch KYC data");
        const json = await res.json();
        setVisaData(json);
        console.log(setVisaData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [kycId, token]);

  return (
    <div className="flex ml-8 p-8 bg-gray-50 min-h-screen">
      <DashboardSidebar userRole="client" />
      <div className="flex-1">
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
              Kyc Details
            </TabsTrigger>
            {/* <TabsTrigger
              value="completed"
              className="px-6 py-2 text-lg font-semibold text-gray-700 hover:text-gray-900"
            >
              Completed
            </TabsTrigger> */}
            {/* <TabsTrigger
              value="kyc"
              className="px-6 py-2 text-lg font-semibold text-gray-700 hover:text-gray-900"
            >
              Visa Details
            </TabsTrigger> */}
          </TabsList>

          {/* ...Active and Completed TabsContent (unchanged)... */}

          <TabsContent value="active">
            {loading && (
              <p className="text-gray-600 text-sm mt-4">
                Loading KYC details...
              </p>
            )}
            {error && (
              <p className="text-red-500 text-sm mt-4">Error: {error}</p>
            )}
            {visaData && (
              <Card className="mt-8 shadow-xl rounded-2xl border border-gray-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    kyc Details
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Personal Kyc verification information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Existing fields */}
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Full Name
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {visaData.data.firstName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {visaData.data.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Country
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {visaData.data.country}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        nationality
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {visaData.data.nationality}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Address
                      </p>
                      <p className="text-lg font-semibold text-gray-800 capitalize">
                        {visaData.data.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Pincode
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {visaData.data.pincode}
                      </p>
                    </div>
                    {/* <div>
                      <p className="text-sm font-medium text-gray-500">
                        Has Invitation
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {visaData.hasInvitation}
                      </p>
                    </div> */}
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Status
                      </p>
                      <span
                        className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${
                          visaData.data.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {visaData.data.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Reason For Rejection
                      </p>
                      <p className="text-lg font-semibold text-gray-800 whitespace-pre-line">
                        {visaData.reason}
                      </p>
                    </div>
                  </div>

                  {/* Document Images Section */}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
