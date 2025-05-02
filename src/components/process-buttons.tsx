"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  CreditCard,
  FileText,
  StampIcon as Passport,
  Stamp,
} from "lucide-react";
import { KycModal } from "@/components/modals/kyc-modal";
import { PassportModal } from "@/components/modals/passport-modal";
import { VisaModal } from "@/components/modals/visa-modal";
import { ApplyModal } from "@/components/modals/apply-modal";
import { PaymentModal } from "@/components/modals/payment-modal";
import { ApprovalModal } from "@/components/modals/approval-modal";

export function ProcessButtons() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [approvalModal, setApprovalModal] = useState<string | null>(null);
  const [approvedSteps, setApprovedSteps] = useState<string[]>([]);

  const handleOpenModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleSubmitForm = (formType: string) => {
    handleCloseModal();
    setApprovalModal(formType);
  };

  const handleApprove = (step: string) => {
    setApprovedSteps([...approvedSteps, step]);
    setApprovalModal(null);
  };

  const isStepApproved = (step: string) => {
    return approvedSteps.includes(step);
  };

  const isStepEnabled = (step: string) => {
    const steps = ["kyc", "passport", "visa", "apply", "payment"];
    const currentIndex = steps.indexOf(step);

    if (currentIndex === 0) return true;

    return isStepApproved(steps[currentIndex - 1]);
  };

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <Button
          variant={isStepApproved("kyc") ? "default" : "outline"}
          className={`flex items-center gap-2 ${
            isStepApproved("kyc")
              ? "bg-yellow-600 hover:bg-white text-black"
              : ""
          }`}
          onClick={() => handleOpenModal("kyc")}
        >
          {isStepApproved("kyc") && <CheckCircle className="h-4 w-4" />}
          <FileText className="h-4 w-4" />
          KYC
        </Button>

        <Button
          variant={isStepApproved("passport") ? "default" : "outline"}
          className={`flex items-center gap-2 ${
            isStepApproved("passport")
              ? "bg-yellow-600 hover:bg-white text-black"
              : ""
          }`}
          onClick={() => handleOpenModal("passport")}
          disabled={!isStepEnabled("passport")}
        >
          {isStepApproved("passport") && <CheckCircle className="h-4 w-4" />}
          <Passport className="h-4 w-4" />
          Passport
        </Button>

        <Button
          variant={isStepApproved("visa") ? "default" : "outline"}
          className={`flex items-center gap-2 ${
            isStepApproved("visa")
              ? "bg-yellow-600 hover:bg-white text-black"
              : ""
          }`}
          onClick={() => handleOpenModal("visa")}
          disabled={!isStepEnabled("visa")}
        >
          {isStepApproved("visa") && <CheckCircle className="h-4 w-4" />}
          <Stamp className="h-4 w-4" />
          Visa
        </Button>

        <Button
          variant={isStepApproved("apply") ? "default" : "outline"}
          className={`flex items-center gap-2 ${
            isStepApproved("apply")
              ? "bg-yellow-600 hover:bg-white text-black"
              : ""
          }`}
          onClick={() => handleOpenModal("apply")}
          disabled={!isStepEnabled("apply")}
        >
          {isStepApproved("apply") && <CheckCircle className="h-4 w-4" />}
          <FileText className="h-4 w-4" />
          Apply
        </Button>

        <Button
          variant={isStepApproved("payment") ? "default" : "outline"}
          className={`flex items-center gap-2 ${
            isStepApproved("payment")
              ? "bg-yellow-600 hover:bg-white text-black"
              : ""
          }`}
          onClick={() => handleOpenModal("payment")}
          disabled={!isStepEnabled("payment")}
        >
          {isStepApproved("payment") && <CheckCircle className="h-4 w-4" />}
          <CreditCard className="h-4 w-4" />
          Payment
        </Button>
      </div>

      {/* Modals */}
      {activeModal === "kyc" && (
        <KycModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={() => handleSubmitForm("kyc")}
        />
      )}

      {activeModal === "passport" && (
        <PassportModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={() => handleSubmitForm("passport")}
          kycId="some-kyc-id" // Replace "some-kyc-id" with the actual KYC ID value
        />
      )}

      {activeModal === "visa" && (
        <VisaModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={() => handleSubmitForm("visa")}
        />
      )}

      {activeModal === "apply" && (
        <ApplyModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={() => handleSubmitForm("apply")}
        />
      )}

      {activeModal === "payment" && (
        <PaymentModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={() => handleSubmitForm("payment")}
        />
      )}

      {/* Approval Modals */}
      {approvalModal && (
        <ApprovalModal
          isOpen={true}
          formType={approvalModal}
          onClose={() => setApprovalModal(null)}
          onApprove={() => handleApprove(approvalModal)}
        />
      )}
    </>
  );
}
