"use client";

import { Button } from "@/components/ui/button";
import { ModalWrapper } from "@/components/modals/modal-wrapper";
import {
  CheckCircle,
  Clock,
  FileText,
  StampIcon as Passport,
  Stamp,
  CreditCard,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface ApprovalModalProps {
  isOpen: boolean;
  formType: string;
  onClose: () => void;
  onApprove: () => void;
}

export function ApprovalModal({
  isOpen,
  formType,
  onClose,
  onApprove,
}: ApprovalModalProps) {
  const getFormTitle = () => {
    switch (formType) {
      case "kyc":
        return "KYC Verification";
      case "passport":
        return "Passport Information";
      case "visa":
        return "Visa Application";
      case "apply":
        return "Application";
      case "payment":
        return "Payment";
      default:
        return "Form";
    }
  };

  const getFormIcon = () => {
    switch (formType) {
      case "kyc":
        return <FileText className="h-6 w-6 text-amber-600" />;
      case "passport":
        return <Passport className="h-6 w-6 text-blue-600" />;
      case "visa":
        return <Stamp className="h-6 w-6 text-purple-600" />;
      case "apply":
        return <FileText className="h-6 w-6 text-amber-600" />;
      case "payment":
        return <CreditCard className="h-6 w-6 text-slate-600" />;
      default:
        return <FileText className="h-6 w-6 text-amber-600" />;
    }
  };

  // In a real application, this would be replaced with actual admin functionality
  const handleAdminApprove = () => {
    console.log("Approval granted");
    onApprove();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={`${getFormTitle()} Status`}
    >
      <div className={`mb-6 p-5 bg-yellow-50 rounded-lg border`}>
        <div className="flex items-center">
          <div className="mr-4 bg-white bg-opacity-50 p-3 rounded-full">
            {getFormIcon()}
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Awaiting Approval</h3>
            <p className="text-sm text-gray-700">
              Your {getFormTitle().toLowerCase()} is pending admin approval
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center p-4 bg-yellow-50 rounded-lg border border-emerald-50">
          <CheckCircle2 className="h-5 w-5 text-yellow-600 mr-3" />
          <p className="text-gray-700">Information submitted successfully</p>
        </div>

        <div className="flex items-center p-4 bg-amber-50 rounded-lg border border-amber-100">
          <Clock className="h-5 w-5 text-amber-600 mr-3" />
          <p className="text-amber-800">Waiting for admin verification</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            Your {getFormTitle().toLowerCase()} has been submitted and is
            currently under review. This process typically takes 1-2 business
            days. You will be notified once it has been approved.
          </p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            What happens next?
          </h4>
          <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
            <li>Our team will review your submission</li>
            <li>You will receive an email notification when approved</li>
            <li>Once approved, you can proceed to the next step</li>
          </ul>
        </div>
      </div>

      {/* Admin actions - in a real app, this would only be visible to admins */}
      {/* <div className="border-t pt-5 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-medium text-gray-800 mb-1">
            Admin Actions
          </p>
          <p className="text-xs text-gray-500">
            Review and approve or reject this submission
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
          >
            <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
            Reject
          </Button>
          <Button
            onClick={handleAdminApprove}
            className="bg-gradient-to-r from-amber-400 to-amber-600 hover:bg-amber-600/90 border border-amber-500/20 text-white transition-colors duration-200"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Note: In a production environment, this section would only be visible
          to administrators.
        </p>
      </div> */}
    </ModalWrapper>
  );
}
