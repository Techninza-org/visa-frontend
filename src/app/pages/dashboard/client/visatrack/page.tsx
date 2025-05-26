"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Type definition for the API data
interface VisaApplication {
  _id: string;
  user: string;
  fullName: string;
  dob: string;
  nationality: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  destinationCountry: string;
  travelPurpose: string;
  travelDate: string;
  travelDurationInDays: number;
  email: string;
  phone: string;
  address: string;
  employmentStatus: string;
  applicationStatus: string;
  expert: string | null;
  priority: string;
  assignedAt: string | null;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
  documents: {
    passportScan: string;
    photo: string;
    bankStatement: string;
    itrOrSalarySlip: string;
    travelHistory: string;
  };
}

export default function TrackStatusPage() {
  const [visaData, setVisaData] = useState<VisaApplication | null>(null);
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
          `${process.env.NEXT_PUBLIC_API_URL}/user/visa-application/${visaId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch visa details");

        const data = await res.json();
        setVisaData(data.application);
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
                    Personal application and document details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailItem label="Full Name" value={visaData.fullName} />
                    <DetailItem
                      label="Date of Birth"
                      value={new Date(visaData.dob).toLocaleDateString()}
                    />
                    <DetailItem label="Nationality" value={visaData.nationality} />
                    <DetailItem
                      label="Passport Number"
                      value={visaData.passportNumber}
                    />
                    <DetailItem
                      label="Passport Issue Date"
                      value={new Date(visaData.passportIssueDate).toLocaleDateString()}
                    />
                    <DetailItem
                      label="Passport Expiry Date"
                      value={new Date(visaData.passportExpiryDate).toLocaleDateString()}
                    />
                    <DetailItem
                      label="Destination Country"
                      value={visaData.destinationCountry}
                    />
                    <DetailItem label="Travel Purpose" value={visaData.travelPurpose} />
                    <DetailItem
                      label="Travel Date"
                      value={new Date(visaData.travelDate).toLocaleDateString()}
                    />
                    <DetailItem
                      label="Travel Duration"
                      value={`${visaData.travelDurationInDays} days`}
                    />
                    <DetailItem label="Email" value={visaData.email} />
                    <DetailItem label="Phone" value={visaData.phone} />
                    <DetailItem label="Address" value={visaData.address} />
                    <DetailItem
                      label="Employment Status"
                      value={visaData.employmentStatus}
                    />
                    <DetailItem
                      label="Application Status"
                      value={visaData.applicationStatus}
                    />
                    <DetailItem label="Priority" value={visaData.priority} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Documents</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      <DocumentImage
                        label="Passport Scan"
                        src={visaData.documents.passportScan}
                      />
                      <DocumentImage
                        label="Photo"
                        src={visaData.documents.photo}
                      />
                      <DocumentImage
                        label="Bank Statement"
                        src={visaData.documents.bankStatement}
                      />
                      <DocumentImage
                        label="ITR / Salary Slip"
                        src={visaData.documents.itrOrSalarySlip}
                      />
                      <DocumentImage
                        label="Travel History"
                        src={visaData.documents.travelHistory}
                      />
                    </div>
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

// Reusable detail item
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-gray-800">{value}</p>
  </div>
);

// Reusable document image viewer
const DocumentImage = ({ label, src }: { label: string; src: string }) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <img
      src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${src}`} // Update this URL as needed
      alt={label}
      className="w-full h-40 object-cover rounded border"
    />
  </div>
);
