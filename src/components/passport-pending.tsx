"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle2 } from "lucide-react"

export function PassportPending() {
  const router = useRouter()
  const [status, setStatus] = useState<"pending" | "approved">("pending")

  useEffect(() => {
    // Check status from localStorage
    const passportStatus = localStorage.getItem("passportStatus")
    if (passportStatus === "approved") {
      setStatus("approved")
    }
  }, [])

  const handleContinue = () => {
    router.push("/pages/visa")
  }

  return (
    <div className=" ml-72">
      <h1 className="text-3xl font-bold mb-6">Passport Status</h1>
      <Card>
        <CardHeader>
          <CardTitle>{status === "pending" ? "Passport Verification Pending" : "Passport Approved"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center py-8">
            {status === "pending" ? (
              <>
                <Clock className="h-16 w-16 text-yellow-500 mb-4" />
                <h2 className="text-xl font-medium mb-2">Your passport details are under review</h2>
                <p className="text-muted-foreground text-center max-w-md">
                  We are currently reviewing your passport details. This process usually takes 1-2 business days.
                </p>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-xl font-medium mb-2">Your passport has been approved!</h2>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Congratulations! Your passport verification is complete. You can now proceed to the visa application.
                </p>
                <Button onClick={handleContinue}>Continue to Visa Application</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
