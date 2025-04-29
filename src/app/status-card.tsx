import { CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatusCardProps {
  title: string
  status: "pending" | "approved" | "rejected" | "in-review"
  appliedDate: string
  estimatedDays: number
  daysRemaining: number
  country?: string
  type?: string
}

export function StatusCard({
  title,
  status,
  appliedDate,
  estimatedDays,
  daysRemaining,
  country,
  type,
}: StatusCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "pending":
      case "in-review":
        return <Clock className="h-5 w-5 text-amber-500" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      case "in-review":
        return "In Review"
      case "pending":
        return "Pending"
      default:
        return status
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "approved":
        return "text-green-500"
      case "rejected":
        return "text-red-500"
      case "pending":
      case "in-review":
        return "text-amber-500"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className={cn("flex items-center gap-1.5", getStatusColor())}>
            {getStatusIcon()}
            <span className="font-medium">{getStatusText()}</span>
          </div>
          {status !== "approved" && status !== "rejected" && (
            <div className="text-xs text-muted-foreground">
              {daysRemaining > 0 ? `${daysRemaining} days remaining` : "Processing complete"}
            </div>
          )}
        </div>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Applied on</span>
            <span>{appliedDate}</span>
          </div>

          {country && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Country</span>
              <span>{country}</span>
            </div>
          )}

          {type && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span>{type}</span>
            </div>
          )}

          {status !== "approved" && status !== "rejected" && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. processing time</span>
              <span>{estimatedDays} days</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
