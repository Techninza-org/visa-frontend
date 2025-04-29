"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KycLayout } from "@/components/kyc-layout";
import { KycForm } from "@/components/kyc-form";
import { KycPending } from "@/components/kyc-pending";

export default function KycPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  // Check if KYC was already submitted
  useState(() => {
    if (typeof window !== "undefined") {
      const status = localStorage.getItem("kycStatus");
      if (status === "pending" || status === "approved") {
        setSubmitted(true);
      }
    }
  });

  const handleSubmit = () => {
    // Save KYC status to localStorage
    localStorage.setItem("kycStatus", "pending");
    setSubmitted(true);

    // Simulate admin approval after 5 seconds
    setTimeout(() => {
      localStorage.setItem("kycStatus", "approved");
      router.refresh();
    }, 5000);
  };

  return (
    <KycLayout>
      {!submitted ? <KycForm onSubmit={handleSubmit} /> : <KycPending />}
    </KycLayout>
  );
}
