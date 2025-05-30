// Checklist Modal Component

import { AlertCircle, Check, FileText, Upload, X } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface ChecklistItem {
  _id: string;
  note: string;
  file?: string;
  remarks?: string;
  accepted?: string; // Assuming this is a string based on your usage
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
  const [uploadStatus, setUploadStatus] = useState<{ [key: string]: 'success' | 'error' }>({});
  const token = Cookies.get('token') || ''; 

  if (!isOpen) return null;

  const handleFileUpload = async (checklistId: string, file: File) => {
    setUploading(checklistId);
    setUploadStatus(prev => ({ ...prev, [checklistId]: undefined }));

    const formData = new FormData();
    formData.append('applicationId', applicationId);
    formData.append('checklistId', checklistId);
    formData.append('doc', file);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/upload-visa-docs`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUploadStatus(prev => ({ ...prev, [checklistId]: 'success' }));
      setTimeout(() => {
        setUploadStatus(prev => ({ ...prev, [checklistId]: undefined }));
      }, 3000);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus(prev => ({ ...prev, [checklistId]: 'error' }));
      setTimeout(() => {
        setUploadStatus(prev => ({ ...prev, [checklistId]: undefined }));
      }, 3000);
    } finally {
      setUploading(null);
    }
  };

  const handleFileInputChange = (checklistId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(checklistId, file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-900">Document Checklist</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {checklist && checklist.length > 0 ? (
            <div className="space-y-4">
              {checklist.map((item, index) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="bg-amber-100 text-amber-800 text-sm font-medium px-2 py-1 rounded-full">
                          #{index + 1}
                        </span>
                        <h3 className="font-semibold text-gray-900">{item.note}</h3>
                      </div>
                      {/* Remarks */}
                      { item.accepted=== "false" &&
                      <p className="text-gray-700 mb-4">{item.remarks}</p>
                      }
                      
                      {/* Current file status */}
                      {item.file ? (
                        <div className="flex items-center space-x-2 mb-3">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">Document uploaded</span>
                          <a
                            href={`${process.env.NEXT_PUBLIC_API_URL_IMAGE}${item.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 underline"
                          >
                            View document
                          </a>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 mb-3">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm text-orange-600 font-medium">Document required</span>
                        </div>
                      )}

                      {/* Upload section */}
                      <div className="flex items-center space-x-3">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                            onChange={(e) => handleFileInputChange(item._id, e)}
                            disabled={uploading === item._id}
                          />
                          <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-2 rounded-lg hover:from-amber-500 hover:to-amber-700 transition-colors disabled:opacity-50">
                            <Upload className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {uploading === item._id ? 'Uploading...' : item.file ? 'Replace Document' : 'Upload Document'}
                            </span>
                          </div>
                        </label>

                        {/* Upload status */}
                        {uploadStatus[item._id] === 'success' && (
                          <div className="flex items-center space-x-1 text-green-600">
                            <Check className="w-4 h-4" />
                            <span className="text-sm font-medium">Uploaded successfully!</span>
                          </div>
                        )}
                        {uploadStatus[item._id] === 'error' && (
                          <div className="flex items-center space-x-1 text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Upload failed. Try again.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No checklist items</h3>
              <p className="text-gray-500">No document requirements available for this application.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistModal;