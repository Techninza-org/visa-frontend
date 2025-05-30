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
import {
  Eye,
  Upload,
  FileText,
  Calendar,
  Image as ImageIcon,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertTriangle,
  Info,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import axios from "axios";

interface DocumentItem {
  _id: string;
  documentType: string;
  description: string;
  doc: string;
  filePath?: string;
  createdAt: string;
  status?: "uploaded" | "pending" | "issue";
  isVerified?: boolean;
  note?: string;
}

// Mock required documents data
const requiredDocuments = [
  {
    id: "passport",
    name: "Valid Passport (6+ months validity)",
    description:
      "Scanned copy of passport bio page. Must be valid for at least 6 months beyond your planned stay.",
    category: "personal",
    required: true,
    status: "pending" as const,
  },

  {
    id: "passport_photos",
    name: "Recent Passport Photos",
    description:
      "Two recent passport-sized photographs with white background (35mm x 45mm).",
    category: "personal",
    required: true,
    status: "pending" as const,
  },
  {
    id: "cover_letter",
    name: "Cover Letter",
    description:
      "Letter stating the purpose of visit, duration, and travel itinerary. Include employer/business details if applicable.",
    category: "personal",
    required: true,
    status: "pending" as const,
  },
  {
    id: "flight_itinerary",
    name: "Flight Itinerary",
    description: "Round-trip or onward flight booking confirmation.",
    category: "travel",
    required: true,
    status: "pending" as const,
  },
  {
    id: "hotel_booking",
    name: "Hotel Booking Confirmation",
    description: "Confirmed accommodation for the entire duration of stay.",
    category: "travel",
    required: true,
    status: "pending" as const,
  },
  {
    id: "travel_insurance",
    name: "Travel Insurance",
    description:
      "Valid travel insurance covering medical expenses and repatriation.",
    category: "travel",
    required: true,
    status: "pending" as const,
  },
  {
    id: "bank_statement",
    name: "Bank Statement (last 3–6 months)",
    description:
      "Recent personal or business bank statements showing sufficient funds.",
    category: "financial",
    required: true,
    status: "pending" as const,
  },
  {
    id: "salary_slips",
    name: "Salary Slips (last 3 months)",
    description:
      "Applicable if employed; shows income and financial stability.",
    category: "financial",
    required: false,
    status: "pending" as const,
  },
  {
    id: "itr",
    name: "Income Tax Returns (last 2 years)",
    description:
      "Filed income tax returns to demonstrate financial track record.",
    category: "financial",
    required: false,
    status: "pending" as const,
  },
  {
    id: "employment_letter",
    name: "Employment Verification Letter / NOC",
    description:
      "Letter from employer verifying employment and granting leave.",
    category: "financial",
    required: false,
    status: "pending" as const,
  },
  {
    id: "business_proof",
    name: "Business Registration / Proof",
    description:
      "Certificate of incorporation, trade license, or business registration (if self-employed).",
    category: "financial",
    required: false,
    status: "pending" as const,
  },
  {
    id: "invitation_letter",
    name: "Invitation Letter",
    description:
      "From host (for family visit) or foreign business partner (for business visa).",
    category: "personal",
    required: false,
    status: "pending" as const,
  },
  {
    id: "relationship_proof",
    name: "Proof of Relationship with Host",
    description:
      "Birth certificate, marriage certificate, or other legal documents.",
    category: "personal",
    required: false,
    status: "issue" as const,
  },
  {
    id: "sponsor_docs",
    name: "Sponsor Documents",
    description:
      "Sponsor’s ID, bank statements, affidavit of support, and relationship proof.",
    category: "financial",
    required: false,
    status: "pending" as const,
  },
  {
    id: "student_id",
    name: "Student ID / Bonafide Certificate",
    description:
      "For student applicants – proof of enrollment from school or university.",
    category: "personal",
    required: false,
    status: "pending" as const,
  },
  {
    id: "retirement_proof",
    name: "Retirement / Pension Documents",
    description:
      "Retirement certificate, pension slips, or investment statements.",
    category: "financial",
    required: false,
    status: "pending" as const,
  },
  {
    id: "tax_registration",
    name: "GST or Tax Registration",
    description: "Business-related tax registration documents, if applicable.",
    category: "financial",
    required: false,
    status: "pending" as const,
  },
  {
    id: "ties_to_home",
    name: "Proof of Ties to Home Country",
    description:
      "Property documents, job letter, family details to establish intention to return.",
    category: "personal",
    required: false,
    status: "pending" as const,
  },
];

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
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'uploaded' | 'issues'>('all');
  // const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateDocumentId, setUpdateDocumentId] = useState<string>("");

  const fetchDocuments = async () => {
    try {
      setFetchLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/user-docs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status !== 200) {
        throw new Error("Failed to fetch documents");
      }
      
      console.log("Fetched documents:", res.data);
      setDocuments(res.data.data.userDocs || []);
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

  // Merge static required documents with API data
  const getMergedDocuments = () => {
    return requiredDocuments.map(reqDoc => {
      const apiDoc = documents.find(doc => doc.documentType.toLowerCase() === reqDoc.name.toLowerCase());
      
      if (apiDoc) {
        return {
          ...reqDoc,
          ...apiDoc,
          status: apiDoc.isVerified ? 'uploaded' : 'issue',
          uploadedDate: new Date(apiDoc.createdAt).toLocaleDateString(),
          issueDescription: apiDoc.note,
        };
      }
      
      return {
        ...reqDoc,
        status: 'pending'
      };
    });
  };

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
      let res;
      
      if (isUpdating && updateDocumentId) {
        // Update existing document
        res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/user/update-user-docs/${updateDocumentId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Upload new document
        res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/upload-docs`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log("Upload/Update response:", res.data);

      setMessage(isUpdating ? "Document updated successfully!" : "Upload successful!");
      resetForm();
      fetchDocuments();

      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage(err.response?.data?.message || err.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDocumentType("");
    setDescription("");
    setFile(null);
    setOpen(false);
    setIsUpdating(false);
    setUpdateDocumentId("");
  };

  const handleUpload = (docType: string) => {
    setDocumentType(docType);
    setDescription("");
    setIsUpdating(false);
    setUpdateDocumentId("");
    setOpen(true);
  };

  const handleReplace = (document: any) => {
    setDocumentType(document.documentType);
    setDescription(document.description || "");
    setIsUpdating(true);
    setUpdateDocumentId(document._id);
    setOpen(true);
  };

  const handlePreview = (filePath: string) => {
    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${filePath}`;
    setPreviewImage(imageUrl);
    setPreviewOpen(true);
  };

  const handleDownload = (filePath: string, fileName: string) => {
    const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL}${filePath}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'issue':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Verified</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Pending</span>;
      case 'issue':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Needs Review</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">Unknown</span>;
    }
  };

  const mergedDocuments = getMergedDocuments();

  const filteredDocuments = mergedDocuments.filter(doc => {
    switch (activeTab) {
      case 'pending':
        return doc.status === 'pending';
      case 'uploaded':
        return doc.status === 'uploaded';
      case 'issues':
        return doc.status === 'issue';
      default:
        return true;
    }
  });

  const getTabCount = (tab: string) => {
    switch (tab) {
      case 'pending':
        return mergedDocuments.filter(doc => doc.status === 'pending').length;
      case 'uploaded':
        return mergedDocuments.filter(doc => doc.status === 'uploaded').length;
      case 'issues':
        return mergedDocuments.filter(doc => doc.status === 'issue').length;
      default:
        return mergedDocuments.length;
    }
  };

  const groupedDocuments = filteredDocuments.reduce((acc, doc) => {
    const category = doc.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(doc);
    return acc;
  }, {} as Record<string, typeof filteredDocuments>);

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'personal':
        return 'Personal Documents';
      case 'financial':
        return 'Financial Documents';
      case 'travel':
        return 'Travel Documents';
      default:
        return 'Other Documents';
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <DashboardHeader />
      <div className="flex flex-1">
        <div className="hidden lg:block w-64 border-r border-gray-200 bg-white">
          <DashboardSidebar userRole="client" />
        </div>

        <div className="flex-1 p-6">
          {/* Document Checklist */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 mb-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div className="p-6 border-slate-700">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Document Checklist</h2>
              <p className="text-gray-500">Upload all required documents for your visa application.</p>
            </div>

            {/* Tabs */}
            <div className="border rounded-lg border-gray-200 bg-white shadow-sm">
              <div className="flex">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'pending', label: 'Pending' },
                  { key: 'uploaded', label: 'Uploaded' },
                  { key: 'issues', label: 'Issues' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.key
                        ? 'border-blue-500 text-white bg-slate-800'
                        : 'border-transparent text-gray-600 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {tab.label}
                    <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-amber-600 text-slate-300 text-xs rounded-full">
                      {getTabCount(tab.key)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Document Lists by Category */}
            <div className="p-6">
              {Object.entries(groupedDocuments).map(([category, docs]) => (
                <div key={category} className="mb-8 last:mb-0">
                  <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-400" />
                    {getCategoryTitle(category)}
                  </h3>
                  
                  <div className="space-y-4">
                    {docs.map((doc) => (
                      <div key={doc.id} className="bg-white rounded-lg p-4 border border-slate-600">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {getStatusIcon(doc.status)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-gray-600 font-medium">{doc.name}</h4>
                                {doc.required && (
                                  <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded">
                                    Required
                                  </span>
                                )}
                                {getStatusBadge(doc.status)}
                              </div>
                              <p className="text-gray-500 text-sm mb-2">{doc.description}</p>
                              
                              {doc.status === 'uploaded' && doc.uploadedDate && (
                                <div className="flex items-center text-xs text-gray-500 space-x-4">
                                  <span className="flex items-center">
                                    <FileText className="w-3 h-3 mr-1" />
                                    Document uploaded
                                  </span>
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    Uploaded: {doc.uploadedDate}
                                  </span>
                                </div>
                              )}
                              
                              {doc.status === 'issue' && doc.issueDescription && (
                                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
                                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                                  {doc.issueDescription}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            {doc.status === 'uploaded' && doc.filePath && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handlePreview(doc.filePath)}
                                  className="text-gray-500 border-slate-600 hover:bg-blue-400 hover:text-white"
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDownload(doc.filePath, `${doc.documentType}.${doc.filePath.split('.').pop()}`)}
                                  className="text-gray-500 border-slate-600 hover:bg-green-400 hover:text-white"
                                >
                                  <Download className="w-4 h-4 mr-1" />
                                  Download
                                </Button>
                              </>
                            )}
                            
                            {doc.status === 'issue' && !doc.isVerified && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReplace(doc)}
                                className="text-gray-500 border-slate-600 hover:bg-orange-400 hover:text-white"
                              >
                                <RefreshCw className="w-4 h-4 mr-1" />
                                Replace
                              </Button>
                            )}
                            
                            {doc.status === 'pending' && (
                              <Button
                                size="sm" 
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => handleUpload(doc.name)}
                              >
                                <Upload className="w-4 h-4 mr-1" />
                                Upload
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload/Update Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl bg-white p-0 rounded-2xl shadow-2xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-white flex items-center">
                    {isUpdating ? <RefreshCw className="w-6 h-6 mr-3" /> : <Upload className="w-6 h-6 mr-3" />}
                    {isUpdating ? 'Replace Document' : 'Upload New Document'}
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
                      readOnly={isUpdating}
                      placeholder="e.g., Passport, Driver's License, ID Card"
                      className={`w-full border-2 border-gray-200 rounded-xl p-4 focus:border-blue-500 focus:ring-0 transition-colors duration-200 ${
                        isUpdating ? 'bg-gray-50 cursor-not-allowed' : ''
                      }`}
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
                      onClick={resetForm}
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
                          {isUpdating ? 'Replacing...' : 'Uploading...'}
                        </div>
                      ) : (
                        isUpdating ? 'Replace Document' : 'Upload Document'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>

          {/* Image Preview Modal */}
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black rounded-2xl overflow-hidden">
              <div className="relative">
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
    </div>
  );
}