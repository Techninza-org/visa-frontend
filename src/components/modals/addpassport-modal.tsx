"use client";

import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // npm install js-cookie

export default function AddPassportModal({
  isOpen,
  onClose,
}: // onSubmit,
// kycId,
{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  kycId: string;
}) {
  const [formData, setFormData] = useState({
    passportNumber: "",
    issuingCountry: "",
    placeOfIssue: "",
    dateOfIssue: "",
    dateOfExpiry: "",
    fullName: "",
    dateOfBirth: "",
    gender: "Male",
    nationality: "",
    passportType: "Ordinary",
    passportFile: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, passportFile: e.target.files?.[0] || null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("token"); // Assumes your cookie is named 'token'
    if (!token) {
      alert("User not authenticated.");
      return;
    }

    const payload = new FormData();
    payload.append("passportFrontImg", formData.passportFile as Blob);
    payload.append("Fullname", formData.fullName);
    payload.append("kycId", "6811b93d1143bddf522c63fc"); // Replace with dynamic value if needed
    payload.append("PassportNumber", formData.passportNumber);
    payload.append("IssuingCountry", formData.issuingCountry);
    payload.append("PlaceofIssue", formData.placeOfIssue);
    payload.append("DateofBirth", formData.dateOfBirth);
    payload.append("DateofIssue", formData.dateOfIssue);
    payload.append("DateofExpiry", formData.dateOfExpiry);
    payload.append("Nationality", formData.nationality);
    payload.append("Gender", formData.gender.toLowerCase());
    payload.append("PassportType", formData.passportType.toLowerCase());

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/onlypassport/onlypassport/681b0a444e594a11542ba5b0`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Submitted successfully");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error submitting data");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          🛂 Add Passport Details
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {[
            { label: "Passport Number", name: "passportNumber" },
            { label: "Issuing Country", name: "issuingCountry" },
            { label: "Place of Issue", name: "placeOfIssue" },
            { label: "Date of Issue", name: "dateOfIssue", type: "date" },
            { label: "Date of Expiry", name: "dateOfExpiry", type: "date" },
            { label: "Full Name", name: "fullName" },
            { label: "Date of Birth", name: "dateOfBirth", type: "date" },
            { label: "Nationality", name: "nationality" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Gender
            </label>
            <select
              name="gender"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Passport Type
            </label>
            <select
              name="passportType"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option>Ordinary</option>
              <option>Diplomatic</option>
              <option>Official</option>
              <option>Student</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">
              Upload Passport File
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              required
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold hover:shadow-lg transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
