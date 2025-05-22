"use client";

import { useEffect, useState } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

interface KycData {
  _id: string;
  passportId: string;
  country: string;
  visaType: string;
  travelDate: string; // ISO date string
  returnDate: string; // ISO date string
  travelPurpose: string;
  accommodation: string;
  hasInvitation: boolean;
  isApproved: boolean;
  status: string;
  documents: {
    photo: string;
    bankStatement: string;
    invitation: string;
  };
  createdAt: string;
  updatedAt: string;
  priority: boolean;
  expertId: string;
}

export default function TrackStatusPage() {
  const [visaData, setVisaData] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const searchParams = useSearchParams();
  const visaId = searchParams.get("visa_id");

  const token = Cookies.get("token");

  useEffect(() => {
    if (!visaId) {
      setError("Visa ID is missing in the URL");
      return;
    }

    const fetchVisaData = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/visa/visaapplications/${visaId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch visa details");

        const data: KycData = await res.json();
        setVisaData(data);
        console.log(data, "sfdhghd");
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchVisaData();
  }, [visaId, token]);

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
              Visa Details
            </TabsTrigger>
          </TabsList>

          {/* You can add other tab contents here */}

          <TabsContent value="active">
            {loading && (
              <p className="text-gray-600 text-sm mt-4">
                Loading visa details...
              </p>
            )}
            {error && (
              <p className="text-red-500 text-sm mt-4">Error: {error}</p>
            )}
            {visaData && (
              <Card className="mt-8 shadow-xl rounded-2xl border border-gray-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Visa Details
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Personal passport verification information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem label="Country" value={visaData.country} />
                    <DetailItem
                      label="Travel Date"
                      value={new Date(visaData.travelDate).toLocaleDateString()}
                    />
                    <DetailItem
                      label="Return Date"
                      value={new Date(visaData.returnDate).toLocaleDateString()}
                    />
                    <DetailItem label="Visa Type" value={visaData.visaType} />
                    <DetailItem
                      label="Travel Purpose"
                      value={visaData.travelPurpose}
                    />
                    <DetailItem
                      label="Accommodation"
                      value={visaData.accommodation}
                    />
                    <DetailItem
                      label="Has Invitation"
                      value={visaData.hasInvitation ? "Yes" : "No"}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Status
                      </p>
                      <span
                        className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${
                          visaData.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {visaData.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Documents
                    </p>
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      <DocumentImage
                        label="User Image"
                        src={visaData?.documents.photo}
                      />
                      <DocumentImage
                        label="Bank Statement"
                        src={visaData?.documents.bankStatement}
                      />
                      <DocumentImage
                        label="Invitation"
                        src={visaData?.documents.invitation}
                      />
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Helper component for rendering detail items
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-gray-800">{value}</p>
  </div>
);

// Helper component for rendering document images
const DocumentImage = ({ label, src }: { label: string; src: string }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <img
      src={`http://localhost:4000/${src}`}
      alt={label}
      width={300}
      height={160}
      className="w-full h-40 object-cover rounded border"
    />
  </div>
);
