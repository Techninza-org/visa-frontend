"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { KycLayout } from "@/components/kyc-layout"
import { VisaForm } from "@/components/visa-form"

export default function VisaPage() {
  const router = useRouter()
  const [passportApproved, setPassportApproved] = useState(false)

  useEffect(() => {
    // Check if passport is approved
    const status = localStorage.getItem("passportStatus")
    if (status !== "approved") {
      router.push("/passport")
    } else {
      setPassportApproved(true)
    }
  }, [router])

  const handleSubmit = () => {
    // Proceed to payment
    router.push("/payment")
  }

  if (!passportApproved) {
    return null // Will redirect to passport page
  }

  return (
    <KycLayout>
      <VisaForm onSubmit={handleSubmit} />
    </KycLayout>
  )
}
