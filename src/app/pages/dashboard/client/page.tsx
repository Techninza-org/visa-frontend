import { DashboardSidebar } from "@/components/dashboard-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CreditCard, Users } from "lucide-react";
import Link from "next/link";

export default function ClientDashboard() {
  return (
    <div className="flex ml-8 p-8">
      <DashboardSidebar userRole="client" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, John Doe</p>
          </div>
          <div>
            <Link href="/pages/dashboard/client/applications">
              <Button>New Application</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                +1 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Estimated completion: 5 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                Ready for download
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,250</div>
              <p className="text-xs text-muted-foreground">
                +$250 from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recent" className="mt-6">
          <TabsList>
            <TabsTrigger value="recent">Recent Applications</TabsTrigger>
            <TabsTrigger value="documents">Required Documents</TabsTrigger>
            <TabsTrigger value="payments">Recent Payments</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  Your most recent visa applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 rounded-md border p-4">
                    <div>
                      <h3 className="font-medium">USA Tourist Visa</h3>
                      <p className="text-sm text-muted-foreground">
                        Submitted on May 1, 2025
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Status</h3>
                      <p className="text-sm text-yellow-500">Under Review</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/client/track">Track</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 rounded-md border p-4">
                    <div>
                      <h3 className="font-medium">UK Business Visa</h3>
                      <p className="text-sm text-muted-foreground">
                        Submitted on April 15, 2025
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Status</h3>
                      <p className="text-sm text-green-500">Approved</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/client/track">View</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 rounded-md border p-4">
                    <div>
                      <h3 className="font-medium">Schengen Tourist Visa</h3>
                      <p className="text-sm text-muted-foreground">
                        Submitted on March 20, 2025
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Status</h3>
                      <p className="text-sm text-green-500">Approved</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/client/track">View</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>
                  Documents needed for your current applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium">USA Tourist Visa</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center text-sm">
                        <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                        Passport Copy - Uploaded
                      </li>
                      <li className="flex items-center text-sm">
                        <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                        Photo - Uploaded
                      </li>
                      <li className="flex items-center text-sm">
                        <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span>
                        Bank Statement - Missing
                      </li>
                      <li className="flex items-center text-sm">
                        <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></span>
                        Travel Itinerary - Pending Review
                      </li>
                    </ul>
                    <Button size="sm" className="mt-4">
                      Upload Missing Documents
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Your recent payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 rounded-md border p-4">
                    <div>
                      <h3 className="font-medium">USA Tourist Visa</h3>
                      <p className="text-sm text-muted-foreground">
                        May 1, 2025
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Amount</h3>
                      <p className="text-sm">$250</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Status</h3>
                      <p className="text-sm text-green-500">Paid</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button variant="outline" size="sm">
                        Invoice
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 rounded-md border p-4">
                    <div>
                      <h3 className="font-medium">UK Business Visa</h3>
                      <p className="text-sm text-muted-foreground">
                        April 15, 2025
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Amount</h3>
                      <p className="text-sm">$500</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Status</h3>
                      <p className="text-sm text-green-500">Paid</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button variant="outline" size="sm">
                        Invoice
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 rounded-md border p-4">
                    <div>
                      <h3 className="font-medium">Schengen Tourist Visa</h3>
                      <p className="text-sm text-muted-foreground">
                        March 20, 2025
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Amount</h3>
                      <p className="text-sm">$500</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Status</h3>
                      <p className="text-sm text-green-500">Paid</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button variant="outline" size="sm">
                        Invoice
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
