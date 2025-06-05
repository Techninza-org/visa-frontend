// Enhanced Checklist Modal Component

import {
  AlertCircle,
  Check,
  FileText,
  Upload,
  X,
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  FileCheck,
} from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface ChecklistItem {
  _id: string;
  note: string;
  file?: string;
  remarks?: string;
  accepted?: string; // "accepted", "rejected", "pending", etc.
}

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  checklist: ChecklistItem[];
  applicationId: string;
}

const ChecklistModal: React.FC<ChecklistModalProps> = ({
  isOpen,
  onClose,
  checklist,
  applicationId,
}) => {
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{
    [key: string]: "success" | "error";
  }>({});
  const token = Cookies.get("token") || "";

  if (!isOpen) return null;

  const handleFileUpload = async (checklistId: string, file: File) => {
    setUploading(checklistId);
    setUploadStatus((prev) => ({ ...prev, [checklistId]: undefined }));

    const formData = new FormData();
    formData.append("applicationId", applicationId);
    formData.append("checklistId", checklistId);
    formData.append("doc", file);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/upload-visa-docs`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus((prev) => ({ ...prev, [checklistId]: "success" }));
      setTimeout(() => {
        setUploadStatus((prev) => ({ ...prev, [checklistId]: undefined }));
      }, 3000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus((prev) => ({ ...prev, [checklistId]: "error" }));
      setTimeout(() => {
        setUploadStatus((prev) => ({ ...prev, [checklistId]: undefined }));
      }, 3000);
    } finally {
      setUploading(null);
    }
  };

  const handleFileInputChange = (
    checklistId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(checklistId, file);
    }
  };

  const getAcceptanceStatus = (accepted?: string) => {
    switch (accepted?.toLowerCase()) {
      case "accepted":
        return {
          icon: <CheckCircle className="w-4 h-4 text-green-600" />,
          text: "Accepted",
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          borderColor: "border-green-200",
          cardBorder: "border-l-green-500",
        };
      case "rejected":
        return {
          icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
          text: "Rejected",
          bgColor: "bg-red-50",
          textColor: "text-red-700",
          borderColor: "border-red-200",
          cardBorder: "border-l-red-500",
        };
      case "pending":
        return {
          icon: <Clock className="w-4 h-4 text-amber-600" />,
          text: "Under Review",
          bgColor: "bg-amber-50",
          textColor: "text-amber-700",
          borderColor: "border-amber-200",
          cardBorder: "border-l-amber-500",
        };
      default:
        return null;
    }
  };

  const getItemBorderColor = (item: ChecklistItem) => {
    const status = getAcceptanceStatus(item.accepted);
    if (status) return status.cardBorder;
    if (item.file) return "border-l-blue-500";
    return "border-l-gray-300";
  };

  const completedItems = checklist.filter(
    (item) => item.file && item.accepted?.toLowerCase() === "accepted"
  ).length;
  const totalItems = checklist.length;
  const progressPercentage =
    totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Document Checklist
                </h2>
                <p className="text-blue-100 text-sm">
                  {completedItems} of {totalItems} documents completed
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-blue-100">Progress</span>
              <span className="text-sm text-white font-medium">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-blue-500 bg-opacity-30 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(92vh-240px)]">
          {checklist && checklist.length > 0 ? (
            <div className="space-y-6">
              {checklist.map((item, index) => {
                const acceptanceStatus = getAcceptanceStatus(item.accepted);
                return (
                  <div
                    key={item._id}
                    className={`border-2 border-l-4 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${getItemBorderColor(
                      item
                    )} border-gray-100 hover:border-gray-200 bg-gradient-to-r from-gray-50 to-white`}
                  >
                    {/* Header Section */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-3 py-1.5 rounded-full min-w-[2.5rem] text-center shadow-sm">
                            {index + 1}
                          </span>
                          <h3 className="font-bold text-gray-900 text-lg">
                            {item.note}
                          </h3>
                        </div>

                        {/* Subnote */}
                        {item.subnote && (
                          <div className="ml-12 mb-3">
                            <p className="text-gray-600 text-sm italic bg-gray-100 px-3 py-1 rounded-lg inline-block">
                              {item.subnote}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Status Badge */}
                      {acceptanceStatus && (
                        <div
                          className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${acceptanceStatus.bgColor} ${acceptanceStatus.borderColor} shadow-sm`}
                        >
                          {acceptanceStatus.icon}
                          <span
                            className={`text-sm font-semibold ${acceptanceStatus.textColor}`}
                          >
                            {acceptanceStatus.text}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Remarks Section */}
                    {item.remarks && (
                      <div className="mb-5">
                        <div
                          className={`rounded-xl p-4 border-l-4 ${
                            item.accepted?.toLowerCase() === "rejected"
                              ? "bg-red-50 border-red-400 border border-red-200"
                              : item.accepted?.toLowerCase() === "pending"
                              ? "bg-amber-50 border-amber-400 border border-amber-200"
                              : "bg-blue-50 border-blue-400 border border-blue-200"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="mt-0.5">
                              {item.accepted?.toLowerCase() === "rejected" ? (
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                              ) : item.accepted?.toLowerCase() === "pending" ? (
                                <Clock className="w-5 h-5 text-amber-500" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-blue-500" />
                              )}
                            </div>
                            <div>
                              <h4
                                className={`font-semibold text-sm mb-1 ${
                                  item.accepted?.toLowerCase() === "rejected"
                                    ? "text-red-700"
                                    : item.accepted?.toLowerCase() === "pending"
                                    ? "text-amber-700"
                                    : "text-blue-700"
                                }`}
                              >
                                {item.accepted?.toLowerCase() === "rejected"
                                  ? "Action Required"
                                  : item.accepted?.toLowerCase() === "pending"
                                  ? "Under Review"
                                  : "Note"}
                              </h4>
                              <p
                                className={`text-sm leading-relaxed ${
                                  item.accepted?.toLowerCase() === "rejected"
                                    ? "text-red-600"
                                    : item.accepted?.toLowerCase() === "pending"
                                    ? "text-amber-600"
                                    : "text-blue-600"
                                }`}
                              >
                                {item.remarks}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Status Indicators */}
                    <div className="flex items-center space-x-4 ">
                    <div className="flex flex-wrap gap-3 ">
                      {/* File upload status */}
                      {item.file ? (
                        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200 shadow-sm">
                          <FileCheck className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-700 font-medium">
                            Document Uploaded
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-200 shadow-sm">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm text-orange-700 font-medium">
                            Document Required
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Document Link */}
                    {item.file && (
                      <div>
                        <a
                          href={`${
                            process.env.NEXT_PUBLIC_API_URL_IMAGE || ""
                          }${item.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors group bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100"
                        >
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          <span className="text-sm font-medium">
                            View Uploaded Document
                          </span>
                        </a>
                      </div>
                    )}

                    {/* Upload Section */}
                    <div className="flex items-center space-x-4">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                          onChange={(e) => handleFileInputChange(item._id, e)}
                          disabled={uploading === item._id}
                        />
                        <div
                          className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-sm ${
                            uploading === item._id
                              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                              : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                          }`}
                        >
                          <Upload
                            className={`w-5 h-5 ${
                              uploading === item._id ? "animate-spin" : ""
                            }`}
                          />
                          <span className="text-sm">
                            {uploading === item._id
                              ? "Uploading..."
                              : item.file
                              ? "Replace Document"
                              : "Upload Document"}
                          </span>
                        </div>
                      </label>

                      {/* Upload Status Messages */}
                      {uploadStatus[item._id] === "success" && (
                        <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200 animate-fade-in shadow-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">
                            Uploaded successfully!
                          </span>
                        </div>
                      )}
                      {uploadStatus[item._id] === "error" && (
                        <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg border border-red-200 animate-fade-in shadow-sm">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-medium text-red-700">
                            Upload failed. Please try again.
                          </span>
                        </div>
                      )}
                    </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                No checklist items
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                No document requirements are available for this application at
                the moment.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white p-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span className="font-medium">
                Complete all required documents to proceed with your application
              </span>
            </div>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChecklistModal;
