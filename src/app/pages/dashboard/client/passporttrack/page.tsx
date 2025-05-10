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

interface KycData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  nationality: string;
  address: string;
  pincode: string;
  dateOfBirth: Date;
  status: string;
  createdAt: Date;
}

export default function TrackStatusPage() {
  const [passData, setPassData] = useState<KycData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const passportId = searchParams.get("pass_id");
  console.log(passportId);

  const token = Cookies.get("token");

  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/passport/getpassport/${passportId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch KYC data");
        const json = await res.json();
        setPassData(json.data);
        console.log(setPassData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

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
              passport Details
            </TabsTrigger>
          </TabsList>

          {/* ...Active and Completed TabsContent (unchanged)... */}

          <TabsContent value="kyc">
            {loading && (
              <p className="text-gray-600 text-sm mt-4">
                Loading KYC details...
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
                    {/* Existing fields */}
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Full Name
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {passData.firstName} {passData.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Date Of Birth
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {new Date(passData.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Country
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {passData.country}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Nationality
                      </p>
                      <p className="text-lg font-semibold text-gray-800 capitalize">
                        {passData.nationality}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Pincode
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {passData.pincode}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Status
                      </p>
                      <span
                        className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${
                          passData.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {passData.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-lg font-semibold text-gray-800 whitespace-pre-line">
                      {passData.address}
                    </p>
                  </div>

                  {/* Document Images Section */}
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Documents
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">User Image</p>
                        <img
                          src={`http://localhost:4000/${passData.userImg}`}
                          alt="User"
                          className="w-full h-40 object-cover rounded border"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Adhar Front
                        </p>
                        <img
                          src={`http://localhost:4000/${passData.adharFrontImg}`}
                          alt="Adhar Front"
                          className="w-full h-40 object-cover rounded border"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Adhar Back</p>
                        <img
                          src={`http://localhost:4000/${passData.adharBackImg}`}
                          alt="Adhar Back"
                          className="w-full h-40 object-cover rounded border"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">PAN Card</p>
                        <img
                          src={`http://localhost:4000/${passData.panCardImg}`}
                          alt="PAN Card"
                          className="w-full h-40 object-cover rounded border"
                        />
                      </div>
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
