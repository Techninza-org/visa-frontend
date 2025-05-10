import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function UserProfile() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Manage your application process</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/business.jpg" alt="User" />
              {/* <AvatarFallback>JD</AvatarFallback> */}
            </Avatar>
          </div>
          <div className="space-y-4 flex-1">
            <div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-sm text-gray-500">john.doe@example.com</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Application ID
                </p>
                <p className="text-sm">APP-2023-12345</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <Badge
                  variant="outline"
                  className="bg-amber-50 text-amber-700 hover:bg-amber-50"
                >
                  In Progress
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Nationality</p>
                <p className="text-sm">United States</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Passport Number
                </p>
                <p className="text-sm">P12345678</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
