"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle2 } from "lucide-react"

export function KycPending() {
  const router = useRouter()
  const [status, setStatus] = useState<"pending" | "approved">("pending")

  useEffect(() => {
    // Check status from localStorage
    const kycStatus = localStorage.getItem("kycStatus")
    if (kycStatus === "approved") {
      setStatus("approved")
    }
  }, [])

  const handleContinue = () => {
    router.push("/pages/passpostapply")
  }

  return (
    <div className="flex flex-col ml-78">
      <h1 className="text-3xl font-bold mb-6">KYC Status</h1>
      <Card>
        <CardHeader>
          <CardTitle>{status === "pending" ? "KYC Verification Pending" : "KYC Approved"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center py-8">
            {status === "pending" ? (
              <>
                <Clock className="h-16 w-16 text-yellow-500 mb-4" />
                <h2 className="text-xl font-medium mb-2">Your KYC is under review</h2>
                <p className="text-muted-foreground text-center max-w-md">
                  We are currently reviewing your KYC documents. This process usually takes 1-2 business days.
                </p>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-xl font-medium mb-2">Your KYC has been approved!</h2>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Congratulations! Your KYC verification is complete. You can now proceed to the next step.
                </p>
                <Button onClick={handleContinue}>Continue to Passport Submission</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
