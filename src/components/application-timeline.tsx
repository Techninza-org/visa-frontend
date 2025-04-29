import { CheckCircle, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ApplicationsData {
  passport: {
    status: string
    appliedDate: string
    approvedDate: string | null
    estimatedDays: number
    daysRemaining: number
    documentNumber?: string
    expiryDate?: string
  }
  visa: {
    status: string
    appliedDate: string
    approvedDate: string | null
    estimatedDays: number
    daysRemaining: number
    country: string
    type: string
  }
  kyc: {
    status: string
    appliedDate: string
    approvedDate: string | null
    estimatedDays: number
    daysRemaining: number
  }
}

interface ApplicationTimelineProps {
  applications: ApplicationsData
}

export function ApplicationTimeline({ applications }: ApplicationTimelineProps) {
  // Create a sorted array of events
  const events = [
    {
      type: "kyc",
      date: applications.kyc.appliedDate,
      status: applications.kyc.status,
      title: "KYC Verification Submitted",
    },
    {
      type: "passport",
      date: applications.passport.appliedDate,
      status: applications.passport.status,
      title: "Passport Application Submitted",
    },
    {
      type: "passport",
      date: applications.passport.approvedDate,
      status: applications.passport.status === "approved" ? "approved" : "pending",
      title: "Passport Approved",
    },
    {
      type: "visa",
      date: applications.visa.appliedDate,
      status: applications.visa.status,
      title: "Visa Application Submitted",
    },
  ]
    .filter((event) => event.date !== null)
    .sort((a, b) => {
      if (!a.date) return 1
      if (!b.date) return -1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "pending":
      case "in-review":
        return <Clock className="h-5 w-5 text-amber-500" />
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-500 border-green-200"
      case "rejected":
        return "text-red-500 border-red-200"
      case "pending":
      case "in-review":
        return "text-amber-500 border-amber-200"
      default:
        return "text-muted-foreground border-muted"
    }
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="flex gap-4">
          <div className={cn("mt-1 rounded-full border p-1", getStatusColor(event.status))}>
            {getStatusIcon(event.status)}
          </div>
          <div className="flex-1">
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-muted-foreground">{event.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
