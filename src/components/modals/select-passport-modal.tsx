"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ModalWrapper } from "@/components/modals/modal-wrapper";
import { PassportModal } from "@/components/modals/passport-modal";
import AddPassportModal from "@/components/modals/addpassport-modal";

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  kycId: string;
}

export function SelectPassportModal({
  isOpen,
  onClose,
  onSubmit,
  kycId,
}: PassportModalProps) {
  const [isPassportModalOpen, setIsPassportModalOpen] = useState(false);
  const [isAddPassportModalOpen, setIsAddPassportModalOpen] = useState(false);

  const handlePassportApply = () => {
    setIsPassportModalOpen(true);
  };

  const handlePassportClose = () => {
    setIsPassportModalOpen(false);
  };

  const handleAddPassport = () => {
    setIsAddPassportModalOpen(true);
  };

  const handleAddPassportClose = () => {
    setIsAddPassportModalOpen(false);
  };

  return (
    <>
      <ModalWrapper isOpen={isOpen} onClose={onClose} title="Select Passport">
        <form className="space-y-6">
          <div className="flex justify-center gap-3 pt-4">
            <Button
              type="button"
              className="bg-gradient-to-r from-amber-100 to-amber-400 border border-amber-100/20 text-black"
              onClick={handleAddPassport}
            >
              Upload Passport
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-r from-amber-100 to-amber-400 border border-amber-100/20 text-black"
              onClick={handlePassportApply}
            >
              Apply Passport
            </Button>
          </div>
        </form>
      </ModalWrapper>

      {/* Passport Modal */}
      {isPassportModalOpen && (
        <PassportModal
          userId=""
          isOpen={isPassportModalOpen}
          onClose={handlePassportClose}
          onSubmit={onSubmit}
          kycId={kycId}
        />
      )}

      {/* Add Passport Modal */}
      {isAddPassportModalOpen && (
        <AddPassportModal
          isOpen={isAddPassportModalOpen}
          onClose={handleAddPassportClose}
          onSubmit={onSubmit}
          kycId={kycId}
        />
      )}
    </>
  );
}
