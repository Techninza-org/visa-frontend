"use client";

import { Suspense, useEffect, useState } from "react";
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
import TrackKYC from "@/components/kyctrack";

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
          {/* <TabsList className="border-b border-gray-200">
            <TabsTrigger
              value="active"
              className="px-6 py-2 text-lg font-semibold text-gray-700 hover:text-gray-900"
            >
              Active Applications
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="px-6 py-2 text-lg font-semibold text-gray-700 hover:text-gray-900"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="kyc"
              className="px-6 py-2 text-lg font-semibold text-gray-700 hover:text-gray-900"
            >
              KYC Details
            </TabsTrigger>
          </TabsList> */}

          {/* ...Active and Completed TabsContent (unchanged)... */}
        </Tabs>
        <Suspense fallback={<div>Loading...</div>}>
          <TrackKYC />
        </Suspense>
      </div>
    </div>
  );
}
