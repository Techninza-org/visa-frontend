"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import { ModalWrapper } from "@/components/modals/modal-wrapper";
import axios from "axios";

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  userId: string;
}

export function PassportModal({
  isOpen,
  onClose,
  onSubmit,
}: PassportModalProps) {
  const token = Cookies.get("token");

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    email: "",
    phone: "",
    address: "",
    applicationType: "",
  });

  const [files, setFiles] = useState<{
    aadharCard: File | null;
    dobProof: File | null;
    identityProof: File | null;
    passportPhotos: File[];
    employmentProof: File | null;
    annexures: File[];
    oldPassport: File | null;
    policeVerificationProof: File | null;
  }>({
    aadharCard: null,
    dobProof: null,
    identityProof: null,
    passportPhotos: [],
    employmentProof: null,
    annexures: [],
    oldPassport: null,
    policeVerificationProof: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: inputFiles } = e.target;
    if (!inputFiles) return;

    if (name === "passportPhotos" || name === "annexures") {
      setFiles((prev) => ({ ...prev, [name]: Array.from(inputFiles) }));
    } else {
      setFiles((prev) => ({ ...prev, [name]: inputFiles[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (files.aadharCard) data.append("aadharCard", files.aadharCard);
    if (files.dobProof) data.append("dobProof", files.dobProof);
    if (files.identityProof) data.append("identityProof", files.identityProof);
    if (files.employmentProof) data.append("employmentProof", files.employmentProof);
    if (files.oldPassport) data.append("oldPassport", files.oldPassport);
    if (files.policeVerificationProof) data.append("policeVerificationProof", files.policeVerificationProof);

    files.passportPhotos.forEach((file) => data.append("passportPhotos", file));
    files.annexures.forEach((file) => data.append("annexures", file));

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/passport-application`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Passport info submitted successfully!");
      onSubmit();
      onClose();
    } catch (error: any) {
      const message = error.response?.data?.message || "Submission failed.";
      alert(`Error: ${message}`);
    }
  };

  return (
 <ModalWrapper isOpen={isOpen} onClose={onClose} title="Passport Information">
  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Text Inputs */}
    {[
      { label: "Full Name", name: "fullName" },
      { label: "Date of Birth", name: "dob", type: "date" },
      { label: "Nationality", name: "nationality" },
      { label: "Email", name: "email" },
      { label: "Phone", name: "phone" },
      { label: "Address", name: "address" },
    ].map(({ label, name, type = "text" }) => (
      <div key={name}>
        <Label className="mb-2" htmlFor={name}>{label}</Label>
        <Input
          id={name}
          name={name}
          type={type}
          value={formData[name as keyof typeof formData]}
          onChange={handleInputChange}
          required
           className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
    ))}

    {/* Select Inputs */}
    {[
      {
        label: "Gender",
        name: "gender",
        options: ["Male", "Female", "Other"],
      },
      {
        label: "Marital Status",
        name: "maritalStatus",
        options: ["Single", "Married", "Divorced", "Widowed"],
      },
      {
        label: "Application Type",
        name: "applicationType",
        options: ["Fresh", "Re-issue", "Lost/Damaged"],
      },
    ].map(({ label, name, options }) => (
      <div key={name}>
        <Label className="mb-2" htmlFor={name}>{label}</Label>
        <select
          id={name}
          name={name}
          value={formData[name as keyof typeof formData]}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    ))}

    {/* File Inputs */}
    {[
      { label: "Aadhar Card", name: "aadharCard" },
      { label: "DOB Proof", name: "dobProof" },
      { label: "Identity Proof", name: "identityProof" },
      { label: "Employment Proof", name: "employmentProof" },
      { label: "Old Passport", name: "oldPassport" },
      { label: "Police Verification Proof", name: "policeVerificationProof" },
    ].map(({ label, name }) => (
      <div key={name}>
        <Label className="mb-2" htmlFor={name}>{label}</Label>
        <Input
          id={name}
          name={name}
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileChange}
          required
           className="w-full border border-gray-300 rounded-md "
        />
      </div>
    ))}

    {/* Multiple File Inputs */}
    <div>
      <Label className="mb-2" htmlFor="passportPhotos">Passport Photos (2 files)</Label>
      <Input
        id="passportPhotos"
        name="passportPhotos"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        required
         className="w-full border border-gray-300 rounded-md "
      />
    </div>

    <div>
      <Label className="mb-2" htmlFor="annexures">Annexures (2 files)</Label>
      <Input
        id="annexures"
        name="annexures"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        required
         className="w-full border border-gray-300 rounded-md "
      />
    </div>

    {/* Submit Button spans both columns */}
    <div className="md:col-span-2">
      <Button type="submit" className="bg-yellow-400 text-black w-full mt-4">
        Submit Passport Application
      </Button>
    </div>
  </form>
</ModalWrapper>

  );
}
