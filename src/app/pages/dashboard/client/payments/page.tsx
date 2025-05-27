"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Download,
  CreditCard,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Receipt,
} from "lucide-react";
import Header from "@/components/header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

// Dummy payment data
const payments = [
  {
    id: "PAY001",
    transactionId: "TXN123456789",
    amount: 185,
    date: "2024-01-15",
    purpose: "US Tourist Visa Application",
    status: "completed",
    method: "Credit Card",
    applicationId: "VA001",
    receipt: "receipt_001.pdf",
  },
  {
    id: "PAY002",
    transactionId: "TXN987654321",
    amount: 115,
    date: "2024-01-14",
    purpose: "UK Standard Visitor Visa",
    status: "completed",
    method: "Debit Card",
    applicationId: "VA002",
    receipt: "receipt_002.pdf",
  },
  {
    id: "PAY003",
    transactionId: "TXN456789123",
    amount: 150,
    date: "2024-01-20",
    purpose: "Passport Renewal Application",
    status: "pending",
    method: "Bank Transfer",
    applicationId: "PA002",
    receipt: null,
  },
  {
    id: "PAY004",
    transactionId: "TXN789123456",
    amount: 100,
    date: "2024-01-22",
    purpose: "Canada Visitor Visa",
    status: "failed",
    method: "Credit Card",
    applicationId: "VA003",
    receipt: null,
  },
  {
    id: "PAY005",
    transactionId: "TXN321654987",
    amount: 200,
    date: "2024-01-25",
    purpose: "Tatkal Passport Service",
    status: "processing",
    method: "UPI",
    applicationId: "PA004",
    receipt: null,
  },
];

// Payment summary data
const paymentSummary = {
  totalPaid: 450,
  totalPending: 300,
  totalFailed: 100,
  thisMonth: 650,
  lastMonth: 285,
};

const PaymentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "secondary";
      case "processing":
        return "outline";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "processing":
        return <Clock className="h-4 w-4" />;
      case "failed":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "this-month" && payment.date.startsWith("2024-01")) ||
      (dateFilter === "last-month" && payment.date.startsWith("2023-12"));
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleDownloadReceipt = (paymentId: string, receipt: string | null) => {
    if (receipt) {
      toast({
        title: "Download Started",
        description: `Downloading receipt for payment ${paymentId}`,
      });
    } else {
      toast({
        title: "Receipt Not Available",
        description: "Receipt will be available once payment is completed",
        variant: "destructive",
      });
    }
  };

  const handleRetryPayment = (paymentId: string) => {
    toast({
      title: "Payment Retry",
      description: `Retrying payment for ${paymentId}`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your payment data is being exported to PDF",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <DashboardHeader />
      <div className="flex flex-1 pt-[4.5rem] bg-gray-50">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 border-r border-gray-200 bg-white">
          <DashboardSidebar userRole="client" />
        </div>

        {/* Payment Summary Cards */}
         <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${paymentSummary.totalPaid}
              </div>
              <p className="text-xs text-muted-foreground">
                Successfully completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${paymentSummary.totalPending}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting processing
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${paymentSummary.totalFailed}
              </div>
              <p className="text-xs text-muted-foreground">
                Failed transactions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${paymentSummary.thisMonth}
              </div>
              <p className="text-xs text-muted-foreground">
                +
                {Math.round(
                  ((paymentSummary.thisMonth - paymentSummary.lastMonth) /
                    paymentSummary.lastMonth) *
                    100
                )}
                % from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment History
                </CardTitle>
                <CardDescription>
                  View and manage all your payment transactions
                </CardDescription>
              </div>
              <Button onClick={handleExportData} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search payments, transaction ID, or application..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Payments Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-sm">
                        {payment.transactionId}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.purpose}</p>
                          <p className="text-sm text-gray-500">
                            App ID: {payment.applicationId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${payment.amount}
                      </TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusColor(payment.status)}
                          className="text-xs"
                        >
                          {getStatusIcon(payment.status)}
                          <span className="ml-1 capitalize">
                            {payment.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Payment Details</DialogTitle>
                                <DialogDescription>
                                  Transaction ID: {payment.transactionId}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium">Amount</h4>
                                    <p className="text-2xl font-bold">
                                      ${payment.amount}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Status</h4>
                                    <Badge
                                      variant={getStatusColor(payment.status)}
                                    >
                                      {getStatusIcon(payment.status)}
                                      <span className="ml-1 capitalize">
                                        {payment.status}
                                      </span>
                                    </Badge>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Date</h4>
                                    <p>{payment.date}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Method</h4>
                                    <p>{payment.method}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium">Purpose</h4>
                                  <p>{payment.purpose}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">
                                    Application ID
                                  </h4>
                                  <p className="font-mono">
                                    {payment.applicationId}
                                  </p>
                                </div>
                              </div>
                              <DialogFooter>
                                {payment.status === "failed" && (
                                  <Button
                                    onClick={() =>
                                      handleRetryPayment(payment.id)
                                    }
                                  >
                                    Retry Payment
                                  </Button>
                                )}
                                {payment.receipt && (
                                  <Button
                                    variant="outline"
                                    onClick={() =>
                                      handleDownloadReceipt(
                                        payment.id,
                                        payment.receipt
                                      )
                                    }
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Receipt
                                  </Button>
                                )}
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {payment.receipt ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadReceipt(
                                  payment.id,
                                  payment.receipt
                                )
                              }
                            >
                              <Receipt className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled
                              className="opacity-50"
                            >
                              <Receipt className="h-4 w-4" />
                            </Button>
                          )}

                          {payment.status === "failed" && (
                            <Button
                              size="sm"
                              onClick={() => handleRetryPayment(payment.id)}
                            >
                              Retry
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
export { PaymentsPage };
