"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useSearchParams } from "next/navigation";

interface KycData {
  firstName: string;
  email: string;
  country: string;
  nationality: string;
  address: string;
  pincode: string;
  status: string;
  createdAt: string;
}

interface KycData {
  firstName: string;
  email: string;
  country: string;
  nationality: string;
  address: string;
  pincode: string;
  status: string;
  createdAt: string;
}

export default function TrackKYC() {
  const [kycData, setKycData] = useState<KycData | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const kycId = searchParams.get("id");
  //   const [error, setError] = useState("");
  console.log(kycId);

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
        setKycData(json.data);
      })
      //   .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [kycId, token]);

  return (
    <TabsContent value="active">
      {loading && (
        <p className="text-gray-600 text-sm mt-4">Loading KYC details...</p>
      )}
      {/* {error && <p className="text-red-500 text-sm mt-4">Error: {error}</p>} */}
      {kycData && (
        <Card className="mt-8 shadow-xl rounded-2xl border border-gray-200 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              KYC Details
            </CardTitle>
            <CardDescription className="text-gray-600">
              Personal KYC verification information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-lg font-semibold text-gray-800">
                  {kycData.firstName}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-800">
                  {kycData.email}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Country</p>
                <p className="text-lg font-semibold text-gray-800">
                  {kycData.country}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Nationality</p>
                <p className="text-lg font-semibold text-gray-800 capitalize">
                  {kycData.nationality}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pincode</p>
                <p className="text-lg font-semibold text-gray-800">
                  {kycData.pincode}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span
                  className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${
                    kycData.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {kycData.status}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-lg font-semibold text-gray-800 whitespace-pre-line">
                {kycData.address}
              </p>
            </div>

            <div className="text-sm text-gray-500 text-right">
              Created at:{" "}
              <span className="text-gray-700 font-medium">
                {new Date(kycData.createdAt).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </TabsContent>
    </Tabs>
  );
}
