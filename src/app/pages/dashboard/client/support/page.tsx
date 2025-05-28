"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Table from "@/components/ui/Table";
import {
  Eye,
  Upload,
  FileText,
  Calendar,
  Image as ImageIcon,
  MessageCircle,
  Ticket,
  Clock,
  Send,
  Plus,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
// import Header from "@/components/header";
import DataTable from "@/components/DataTable";
import { DashboardHeader } from "@/components/dashboard-header";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

interface DocumentItem {
  _id: string;
  documentType: string;
  description: string;
  doc: string; // file URL
  filePath?: string;
  createdAt: string;
}

type TicketItem = {
  _id: string;
  user: string;
  subject: string;
  status: string;
  messages: {
    sender: {
      _id: string;
      name: string;
      email: string;
    };
    message: string;
    sentBy: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

export default function Support() {
  const token = Cookies.get("token");
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  // const [previewImage, setPreviewImage] = useState("");
  const [tickets, setTickets] = useState<TicketItem[]>([]);

  const [documentType, setDocumentType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const [ticketMsg, setTicketMsg] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalApplications, setTotalTickets] = useState(0);

  const rowsPerPage = 10;

  const fetchTickets = async () => {
    try {
      setFetchLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/support?page=${currentPage}&limit=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("Fetched tickets:", data?.tickets);
      setTickets(data?.tickets || []);
      setTotalTickets(data?.tickets?.length || 0);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTickets();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!documentType || !description) {
      setMessage("Please fill all fields");
      return;
    }

    const urlEncodedData = new URLSearchParams();
    urlEncodedData.append("subject", documentType);
    urlEncodedData.append("message", description);

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/support`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          body: urlEncodedData.toString(),
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      setMessage("Upload successful!");
      setDocumentType("");
      setDescription("");
      setFile(null);
      setOpen(false);
      fetchTickets(); // refresh table

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMsg = (ticket: string) => {
    setSelectedTicket(ticket);
    setTicketMsg(""); // clear old message on new open
    setPreviewOpen(true);
  };

  const handleSendMessageApi = async () => {
    if (!selectedTicket || !ticketMsg) {
      setMessage("Ticket or message is missing.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/support-message/${selectedTicket}`,
        new URLSearchParams({ message: ticketMsg }).toString(), // correct encoding
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Message sent:", response.data);
      setTicketMsg(""); // clear message input
      setPreviewOpen(false); // close modal
      setSelectedTicket(null); // reset selected ticket
      setMessage("Message sent successfully!");
      fetchTickets(); // refresh to show updated data
    } catch (error) {
      console.error("Failed to send message:", error?.response?.data || error.message);
      setMessage("Failed to send message. Please try again.");
    }
  };

  const ticketColumns = [
    {
      key: "subject",
      label: "Subject",
      render: (row: TicketItem) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Ticket className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">{row.subject}</div>
            <div className="text-xs text-gray-500">ID: {row._id.slice(-8)}</div>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row: TicketItem) => (
        <div className="flex items-center">
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
              row.status === "OPEN"
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            {row.status === "OPEN" ? (
              <CheckCircle2 className="w-3 h-3" />
            ) : (
              <Clock className="w-3 h-3" />
            )}
            {row.status}
          </span>
        </div>
      ),
    },
    {
      key: "message",
      label: "Latest Message",
      render: (row: TicketItem) => (
        <div className="max-w-xs">
          <div
            className="text-gray-700 text-sm line-clamp-2 leading-relaxed"
            title={row.messages?.[0]?.message}
          >
            {row.messages?.[0]?.message || (
              <span className="text-gray-400 italic">No messages yet</span>
            )}
          </div>
          {row.messages?.length > 0 && (
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <MessageCircle className="w-3 h-3 mr-1" />
              {row.messages.length} message{row.messages.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (row: TicketItem) => (
        <div className="text-sm">
          <div className="flex items-center text-gray-700 font-medium">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            {new Date(row.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="text-xs text-gray-500 ml-6">
            {new Date(row.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
            })}
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: TicketItem) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSendMsg(row._id)}
            className="bg-white hover:bg-blue-50 border-blue-200 text-blue-700 hover:border-blue-300 transition-all duration-200 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Reply
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <DashboardHeader />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 border-r border-gray-200/50 bg-white/80 backdrop-blur-sm">
          <DashboardSidebar userRole="client" />
        </div>

        <div className="flex-1 ml-8 p-8">
          {/* Header Section with Stats */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 mb-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
                      Support Center
                    </h1>
                    <p className="text-lg text-gray-600 flex items-center">
                      <Ticket className="w-5 h-5 mr-2 text-blue-500" />
                      Manage your support tickets and get help
                    </p>
                  </div>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl duration-300 flex items-center gap-3 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 transition-all transform hover:scale-105 group">
                      <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                      <span className="font-semibold text-lg">New Ticket</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl bg-white p-0 rounded-3xl shadow-2xl border-0 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white p-8 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                      <DialogHeader className="relative z-10">
                        <DialogTitle className="text-3xl font-bold text-white flex items-center">
                          <Plus className="w-8 h-8 mr-4 bg-white/20 rounded-xl p-1.5" />
                          Create Support Ticket
                        </DialogTitle>
                        <p className="text-blue-100 mt-2">We're here to help you with any questions or issues</p>
                      </DialogHeader>
                    </div>

                    <div className="p-8">
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                          <label className="block text-sm font-bold text-gray-800 flex items-center">
                            <Ticket className="w-4 h-4 mr-2 text-blue-600" />
                            Subject
                          </label>
                          <input
                            type="text"
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}
                            required
                            placeholder="Brief description of your issue"
                            className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50/50"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-bold text-gray-800 flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-blue-600" />
                            Description
                          </label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Please provide detailed information about your issue or question..."
                            rows={4}
                            className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 resize-none text-gray-800 placeholder-gray-400 bg-gray-50/50"
                          />
                        </div>

                        {message && (
                          <div
                            className={`p-4 rounded-2xl border-2 flex items-center gap-3 ${
                              message.includes("success")
                                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                                : "bg-red-50 border-red-200 text-red-800"
                            }`}
                          >
                            {message.includes("success") ? (
                              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                            ) : (
                              <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            )}
                            <p className="text-sm font-medium">{message}</p>
                          </div>
                        )}

                        <div className="flex space-x-4 pt-6">
                          <Button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 py-4 rounded-2xl transition-all duration-200 font-semibold"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                          >
                            {loading ? (
                              <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                Creating Ticket...
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <Send className="w-5 h-5" />
                                Create Ticket
                              </div>
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/80 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                      <p className="text-2xl font-bold text-gray-900">{tickets.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Ticket className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/80 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                      <p className="text-2xl font-bold text-emerald-600">
                        {tickets.filter(t => t.status === "OPEN").length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/80 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Messages</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {tickets.reduce((acc, ticket) => acc + ticket.messages.length, 0)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tickets Table Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 overflow-hidden">
            <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-blue-50/30">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center mb-2">
                    <Ticket className="w-8 h-8 mr-4 text-blue-600" />
                    Support Tickets
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {tickets.length} ticket{tickets.length !== 1 ? "s" : ""} in total
                  </p>
                </div>
                {tickets.length > 0 && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white/80 px-4 py-2 rounded-xl border border-gray-200">
                    <Clock className="w-4 h-4" />
                    <span>Last updated: {new Date().toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8">
              {fetchLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-blue-100"></div>
                  </div>
                  <span className="mt-4 text-gray-600 font-medium">Loading your tickets...</span>
                </div>
              ) : tickets.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                    <Ticket className="w-12 h-12 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    No support tickets yet
                  </h3>
                  <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto">
                    Create your first support ticket to get help from our team
                  </p>
                  <Button
                    onClick={() => setOpen(true)}
                    className="bg-gradient-to-r from-amber-400 to-amber-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create First Ticket
                  </Button>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white/50">
                  <DataTable<DocumentItem>
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    rowsPerPage={rowsPerPage}
                    totalCount={totalApplications}
                    columns={ticketColumns}
                    data={tickets}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Message Modal */}
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogContent className="max-w-2xl max-h-[80vh] p-0 bg-white rounded-3xl overflow-hidden shadow-2xl border-0">
              <div className="relative min-h-[400px] flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Reply to Ticket</h3>
                        <p className="text-blue-100">Send a message to support</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewOpen(false)}
                      className="bg-white/20 hover:bg-white/30 text-white rounded-2xl p-2 transition-all duration-200"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-8">
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-800 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
                      Your Message
                    </label>
                    <textarea
                      className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 placeholder-gray-400"
                      placeholder="Type your message here..."
                      rows={6}
                      value={ticketMsg}
                      onChange={(e) => setTicketMsg(e.target.value)}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end space-x-4">
                  <Button
                    onClick={() => setPreviewOpen(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-2xl font-semibold transition-all duration-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
                    onClick={handleSendMessageApi}
                    disabled={!ticketMsg.trim()}
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}