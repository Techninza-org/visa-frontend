"use client"
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
    visaType: string;
    country: string;
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

export default function VisaTrackDetails() {
    const [visaData, setVisaData] = useState<KycData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const searchParams = useSearchParams();
    const visaId = searchParams.get("visa_id");
    console.log(visaId);

    const token = Cookies.get("token");

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/visa/visa/${visaId}`, {
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
    }, [visaId, token]);
    return (
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
                    Visa Details
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
                                {/* Existing fields */}
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Country
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {visaData.country}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Travel Date
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {new Date(visaData.travelDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Return Date
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {new Date(visaData.returnDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        visa Type
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {visaData.visaType}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Travel Purpose
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800 capitalize">
                                        {visaData.travelPurpose}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Accommodation
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {visaData.accommodation}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Has Invitation
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {visaData.hasInvitation}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Status
                                    </p>
                                    <span
                                        className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${visaData.status === "pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-green-100 text-green-800"
                                            }`}
                                    >
                                        {visaData.status}
                                    </span>
                                </div>
                            </div>

                            {/* <div>
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-lg font-semibold text-gray-800 whitespace-pre-line">
                {visaData.address}
              </p>
            </div> */}

                            {/* Document Images Section */}
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Documents
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">User Image</p>
                                        <img
                                            src={`http://localhost:4000/${visaData.documents.photo}`}
                                            alt="User"
                                            className="w-full h-40 object-cover rounded border"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">
                                            Adhar Front
                                        </p>
                                        <img
                                            src={`http://localhost:4000/${visaData.documents.bankStatement}`}
                                            alt="Adhar Front"
                                            className="w-full h-40 object-cover rounded border"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Adhar Back</p>
                                        <img
                                            src={`http://localhost:4000/${visaData.documents.invitation}`}
                                            alt="Adhar Back"
                                            className="w-full h-40 object-cover rounded border"
                                        />
                                    </div>
                                    {/* <div>
                  <p className="text-xs text-gray-500 mb-1">PAN Card</p>
                  <img
                    src={`http://localhost:4000/${visaData.panCardImg}`}
                    alt="PAN Card"
                    className="w-full h-40 object-cover rounded border"
                  />
                </div> */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </TabsContent>
        </Tabs>
    )
}
