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
import Header from "@/components/header";

interface DocumentItem {
  _id: string;
  documentType: string;
  description: string;
  doc: string; // file URL
  filePath?: string;
  createdAt: string;
}

export default function TrackStatusPage() {
  const token = Cookies.get("token");
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [documentType, setDocumentType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchDocuments = async () => {
    try {
      setFetchLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/user-docs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setDocuments(data?.userDocs || []);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDocuments();
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !documentType || !description) {
      setMessage("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("doc", file);
    formData.append("documentType", documentType);
    formData.append("description", description);

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/upload-docs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

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

  const handleImagePreview = (imagePath: string) => {
    setPreviewImage(`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${imagePath}`);
    setPreviewOpen(true);
  };

  const getFileExtension = (filePath: string) => {
    return filePath.split(".").pop()?.toLowerCase();
  };

  const isImageFile = (filePath: string) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const extension = getFileExtension(filePath);
    return extension && imageExtensions.includes(extension);
  };

  const documentColumns = [
    {
      key: "doc",
      label: "File",
      render: (row: DocumentItem) => {
        const filePath = row.filePath || row.doc;
        const isImage = isImageFile(filePath);

        return (
          <div className="flex items-center justify-center">
            {isImage ? (
              <div
                className="relative group cursor-pointer"
                onClick={() => handleImagePreview(filePath)}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${filePath}`}
                  alt={row.documentType}
                  className="h-16 w-16 object-cover rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.png";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-all duration-200">
                  <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
            ) : (
              <div className="h-16 w-16 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-500" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "documentType",
      label: "Type",
      render: (row: DocumentItem) => (
        <div className="font-medium text-gray-900">{row.documentType}</div>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (row: DocumentItem) => (
        <div
          className="text-gray-700 max-w-xs truncate"
          title={row.description}
        >
          {row.description}
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (row: DocumentItem) => (
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
  ];

  return (
    <>
    <Header />
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-21">
      <DashboardSidebar userRole="client" />

      <div className="flex-1 ml-8 p-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
                Document Management
              </h1>
              <p className="text-lg text-gray-600 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Upload, view, and manage your documents
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2">
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
                        Document Type
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

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Choose File
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                          required
                          className="w-full border-2 border-dashed border-gray-300 rounded-xl p-6 focus:border-blue-500 focus:ring-0 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <div className="absolute top-2 right-2">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Supported formats: Images (JPG, PNG, GIF) and PDF files
                      </p>
                    </div>

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
                <span className="ml-3 text-gray-600">Loading documents...</span>
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
                <Table<DocumentItem>
                  columns={documentColumns}
                  data={documents}
                />
              </div>
            )}
          </div>
        </div>

        {/* Image Preview Modal */}
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
              <img
                src={previewImage}
                alt="Document preview"
                className="w-full h-full object-contain max-h-[90vh]"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    </>
  );
}
