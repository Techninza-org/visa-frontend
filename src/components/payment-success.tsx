"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Download, Printer } from "lucide-react"
import Link from "next/link"

export function PaymentSuccess() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Payment Successful</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
            Application Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-green-50 rounded-full p-6 mb-6">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Thank you for your application!</h2>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Your visa application has been successfully submitted. You will receive an email with further
              instructions.
            </p>

            <div className="w-full max-w-md space-y-4 mt-4">
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Application Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Application ID:</div>
                  <div className="font-medium">VIS-{Math.floor(Math.random() * 1000000)}</div>
                  <div>Status:</div>
                  <div className="font-medium text-green-600">Submitted</div>
                  <div>Payment:</div>
                  <div className="font-medium text-green-600">Completed</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipt
                </Button>
                <Button className="flex-1" variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Details
                </Button>
              </div>

              <Link href="/kyc">
                <Button className="w-full">Return to Dashboard</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
