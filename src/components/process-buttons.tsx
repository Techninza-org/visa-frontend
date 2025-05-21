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
// import { ApprovalModal } from "@/components/modals/approval-modal";
import { SelectPassportModal } from "./modals/select-passport-modal";

export function ProcessButtons() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  // const [approvalModal, setApprovalModal] = useState<string | null>(null);
  const [approvedSteps, setApprovedSteps] = useState<string[]>([]);

  const handleOpenModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleSubmitForm = (formType: string) => {
    handleCloseModal();
    // setApprovalModal(formType);
  };

  // const handleApprove = (step: string) => {
  //   setApprovedSteps([...approvedSteps, step]);
  //   // setApprovalModal(null);
  // };

  const isStepApproved = (step: string) => {
    return approvedSteps.includes(step);
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
          variant={isStepApproved("select-passport") ? "default" : "outline"}
          className={`flex items-center gap-2 ${
            isStepApproved("select-passport")
              ? "bg-yellow-600 hover:bg-white text-black"
              : ""
          }`}
          onClick={() => handleOpenModal("select-passport")}
          // disabled={!isStepEnabled("select-passport")}
        >
          {isStepApproved("select-passport") && (
            <CheckCircle className="h-4 w-4" />
          )}
          <Passport className="h-4 w-4" />
          Passport
        </Button>

        {/* <Button
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
        </Button> */}

        <Button
          variant={isStepApproved("visa") ? "default" : "outline"}
          className={`flex items-center gap-2 ${
            isStepApproved("visa")
              ? "bg-yellow-600 hover:bg-white text-black"
              : ""
          }`}
          onClick={() => handleOpenModal("visa")}
        >
          {isStepApproved("visa") && <CheckCircle className="h-4 w-4" />}
          <Stamp className="h-4 w-4" />
          Visa
        </Button>

        <Button
          variant={isStepApproved("preview") ? "default" : "outline"}
          className={`flex items-center gap-2 ${
            isStepApproved("preview")
              ? "bg-yellow-600 hover:bg-white text-black"
              : ""
          }`}
          onClick={() => handleOpenModal("preview")}
          // disabled={!isStepEnabled("preview")}
        >
          {isStepApproved("preview") && <CheckCircle className="h-4 w-4" />}
          <FileText className="h-4 w-4" />
          Preview
        </Button>

        <Button
          variant={isStepApproved("payment") ? "default" : "outline"}
          className={`flex items-center gap-2 ${
            isStepApproved("payment")
              ? "bg-yellow-600 hover:bg-white text-black"
              : ""
          }`}
          onClick={() => handleOpenModal("payment")}
          // disabled={!isStepEnabled("payment")}
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

      {activeModal === "select-passport" && (
        <SelectPassportModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={() => handleSubmitForm("select-passport")}
          kycId="some-kyc-id" // Replace "some-kyc-id" with the actual KYC ID value
        />
      )}

      {activeModal === "passport" && (
        <PassportModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={() => handleSubmitForm("passport")}
          kycId="some-kyc-id" // Replace "some-kyc-id" with the actual KYC ID value
          userId="userId"
        />
      )}

      {activeModal === "visa" && (
        <VisaModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={() => handleSubmitForm("visa")}
          userId="userId"
        />
      )}

      {activeModal === "preview" && (
        <ApplyModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={() => handleSubmitForm("preview")}
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
      {/* {approvalModal && (
        <ApprovalModal
          isOpen={true}
          formType={approvalModal}
          onClose={() => setApprovalModal(null)}
          onApprove={() => handleApprove(approvalModal)}
        />
      )} */}
    </>
  );
}
