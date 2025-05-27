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
  const [previewImage, setPreviewImage] = useState("");
  const [documents, setTickets] = useState<DocumentItem[]>([]);
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/support?page=${currentPage}&limit=${rowsPerPage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/support`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: urlEncodedData.toString(),
    });

    if (!res.ok) throw new Error("Upload failed");

    setMessage("Upload successful!");
    setDocumentType("");
    setDescription("");
    setFile(null);
    setOpen(false);
    fetchDocuments(); // refresh table

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
    if (!selectedTicket) return;

    try {
    
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/support-message/${selectedTicket}`,
        new URLSearchParams({ message: ticketMsg }),
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
    } catch (error) {
        console.error("Failed to send message:", error);
        setMessage("Failed to send message. Please try again.");
        }
    }
    


      
 

const ticketColumns = [
  {
    key: "subject",
    label: "Subject",
    render: (row: TicketItem) => (
      <div className="font-semibold text-gray-900">{row.subject}</div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row: TicketItem) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          row.status === "OPEN"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "message",
    label: "Latest Message",
    render: (row: TicketItem) => (
      <div
        className="text-gray-700 max-w-xs truncate"
        title={row.messages?.[0]?.message}
      >
        {row.messages?.[0]?.message || "-"}
      </div>
    ),
  },
  {
    key: "createdAt",
    label: "Created At",
    render: (row: TicketItem) => (
      <div className="flex items-center text-gray-600">
        <Calendar className="w-4 h-4 mr-2" />
        {new Date(row.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
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
        >
          <Eye className="w-4 h-4" />
          View
        </Button>
      </div>
    ),
  }
];


  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1 bg-gray-50">
        {/* Sidebar */}

        <div className="hidden lg:block w-64 border-r border-gray-200 bg-white">
          <DashboardSidebar userRole="client" />
        </div>

        <div className="flex-1 ml-8 p-8">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                  Document Management
                </h1>
                <p className="text-lg text-gray-600 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Upload, view, and manage your documents
                </p>
              </div>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl duration-200 flex items-center gap-2 space-x-2 hover:from-amber-500 hover:to-amber-700 transition-colors">
                    <Upload className="w-5 h-5" />
                    <span>Upload Document</span>
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl bg-white p-0 rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-white flex items-center">
                        <Upload className="w-6 h-6 mr-3" />
                        Upload New Document
                      </DialogTitle>
                    </DialogHeader>
                  </div>

                  <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={documentType}
                          onChange={(e) => setDocumentType(e.target.value)}
                          required
                          placeholder="e.g., Passport, Driver's License, ID Card"
                          className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Description
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          placeholder="Brief description of the document"
                          rows={3}
                          className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 focus:ring-0 transition-colors duration-200 resize-none"
                        />
                      </div>

                      {/* <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Choose File
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) =>
                              setFile(e.target.files?.[0] || null)
                            }
                            required
                            className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 focus:border-blue-500 focus:ring-0 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                          <div className="absolute top-2 right-2">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Supported formats: Images (JPG, PNG, GIF) and PDF
                          files
                        </p>
                      </div> */}

                      {message && (
                        <div
                          className={`p-4 rounded-xl border ${
                            message.includes("success")
                              ? "bg-green-50 border-green-200 text-green-800"
                              : "bg-red-50 border-red-200 text-red-800"
                          }`}
                        >
                          <p className="text-sm font-medium">{message}</p>
                        </div>
                      )}

                      <div className="flex space-x-4 pt-4">
                        <Button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 py-3 rounded-xl transition-colors duration-200"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Uploading...
                            </div>
                          ) : (
                            "Upload Document"
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Documents Table Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                Uploaded Documents
              </h2>
              <p className="text-gray-600 mt-1">
                {documents.length} document{documents.length !== 1 ? "s" : ""}{" "}
                uploaded
              </p>
            </div>

            <div className="p-6">
              {fetchLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">
                    Loading documents...
                  </span>
                </div>
              ) : documents.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No documents uploaded
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Upload your first document to get started
                  </p>
                  <Button
                    onClick={() => setOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                  >
                    Upload Document
                  </Button>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <DataTable<DocumentItem>
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    rowsPerPage={rowsPerPage}
                    totalCount={totalApplications}
                    columns={ticketColumns}
                    data={documents}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Message Modal */}
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black rounded-2xl overflow-hidden">
          <div className="relative">
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <textarea
              className="absolute bottom-0 left-0 w-full p-4 bg-white bg-opacity-90 border-t border-gray-200 rounded-t-none resize-none"
              placeholder="Add a comment or description here..."
              rows={3}
              value={ticketMsg}
              onChange={(e) => setTicketMsg(e.target.value)}
            ></textarea>

            <div className="absolute bottom-16 right-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={handleSendMessageApi}
                disabled={!ticketMsg.trim()}
              >
                Send Message
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
        </div>
      </div>
    </div>
  );
}
