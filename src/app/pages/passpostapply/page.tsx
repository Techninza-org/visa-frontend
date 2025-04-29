"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { KycLayout } from "@/components/kyc-layout"
import { PassportForm } from "@/components/passport-form"
import { PassportPending } from "@/components/passport-pending"
import { ApplyPassportForm } from "@/components/apply-passport-form"

export default function PassportPage() {
  const router = useRouter()
  const [kycApproved, setKycApproved] = useState(false)
  const [hasPassport, setHasPassport] = useState<boolean | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Check if KYC is approved
    const status = localStorage.getItem("kycStatus")
    if (status !== "approved") {
      router.push("/kyc")
    } else {
      setKycApproved(true)
    }

    // Check if passport status exists
    const passportStatus = localStorage.getItem("passportStatus")
    if (passportStatus === "pending" || passportStatus === "approved") {
      setSubmitted(true)
    }

    // Check if user has selected passport option
    const hasPassportOption = localStorage.getItem("hasPassport")
    if (hasPassportOption) {
      setHasPassport(hasPassportOption === "true")
    }
  }, [router])

  const handleHasPassport = (has: boolean) => {
    setHasPassport(has)
    localStorage.setItem("hasPassport", has.toString())
  }

  const handleSubmit = () => {
    // Save passport status to localStorage
    localStorage.setItem("passportStatus", "pending")
    setSubmitted(true)

    // Simulate admin approval after 5 seconds
    setTimeout(() => {
      localStorage.setItem("passportStatus", "approved")
      router.refresh()
    }, 5000)
  }

  if (!kycApproved) {
    return null // Will redirect to KYC page
  }

  if (submitted) {
    return (
      <KycLayout>
        <PassportPending />
      </KycLayout>
    )
  }

  if (hasPassport === null) {
    return (
      <KycLayout>
        <div className="max-w-7xl ml-32 mx-auto mt-10">
          <h1 className="text-2xl font-bold mb-6">Passport Information</h1>
          <div className="space-y-4">
            <Button onClick={() => handleHasPassport(true)} className="w-full py-8 text-lg">
              I have a passport
            </Button>
            <Button onClick={() => handleHasPassport(false)} variant="outline" className="w-full py-8 text-lg">
              I need to apply for a passport
            </Button>
          </div>
        </div>
      </KycLayout>
    )
  }

  return (
    <KycLayout>
      {hasPassport ? <PassportForm onSubmit={handleSubmit} /> : <ApplyPassportForm onSubmit={handleSubmit} />}
    </KycLayout>
  )
}
