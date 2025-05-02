"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ModalWrapper } from "@/components/modals/modal-wrapper";
import { useState } from "react";
import { FileText, Clock, CalendarClock, Phone, FileCheck } from "lucide-react";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function ApplyModal({ isOpen, onClose, onSubmit }: ApplyModalProps) {
  const [formData, setFormData] = useState({
    applicationType: "",
    processingSpeed: "",
    travelDate: "",
    specialRequirements: "",
    emergencyContact: "",
    agreeTerms: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Application Submission"
    >
      <div className="mb-6 flex items-center p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100">
        <div className="mr-4 bg-amber-100 p-2 rounded-full">
          <FileCheck className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <h3 className="font-medium text-amber-800">Final Application</h3>
          <p className="text-sm text-amber-700">
            Submit your application for processing
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="applicationType"
              className="text-sm font-medium flex items-center gap-1"
            >
              <FileText className="h-4 w-4 text-amber-500" />
              Application Type
            </Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("applicationType", value)
              }
            >
              <SelectTrigger
                id="applicationType"
                className="h-11 border-gray-200 focus:border-amber-500 focus:ring-amber-500 transition-colors duration-200"
              >
                <SelectValue placeholder="Select application type" />
              </SelectTrigger>
              <SelectContent className="border-gray-200">
                <SelectItem value="new">New Application</SelectItem>
                <SelectItem value="renewal">Renewal</SelectItem>
                <SelectItem value="extension">Extension</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="processingSpeed"
              className="text-sm font-medium flex items-center gap-1"
            >
              <Clock className="h-4 w-4 text-amber-500" />
              Processing Speed
            </Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("processingSpeed", value)
              }
            >
              <SelectTrigger
                id="processingSpeed"
                className="h-11 border-gray-200 focus:border-amber-500 focus:ring-amber-500 transition-colors duration-200"
              >
                <SelectValue placeholder="Select processing speed" />
              </SelectTrigger>
              <SelectContent className="border-gray-200">
                <SelectItem value="standard">
                  <div className="flex flex-col">
                    <span>Standard</span>
                    <span className="text-xs text-gray-500">
                      7-10 business days
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="express">
                  <div className="flex flex-col">
                    <span>Express</span>
                    <span className="text-xs text-gray-500">
                      3-5 business days
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="urgent">
                  <div className="flex flex-col">
                    <span>Urgent</span>
                    <span className="text-xs text-gray-500">
                      1-2 business days
                    </span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="travelDate"
              className="text-sm font-medium flex items-center gap-1"
            >
              <CalendarClock className="h-4 w-4 text-amber-500" />
              Expected Travel Date
            </Label>
            <Input
              id="travelDate"
              name="travelDate"
              type="date"
              value={formData.travelDate}
              onChange={handleChange}
              className="h-11 border-gray-200 focus:border-amber-500 focus:ring-amber-500 transition-colors duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="emergencyContact"
              className="text-sm font-medium flex items-center gap-1"
            >
              <Phone className="h-4 w-4 text-amber-500" />
              Emergency Contact
            </Label>
            <Input
              id="emergencyContact"
              name="emergencyContact"
              placeholder="Name and phone number"
              value={formData.emergencyContact}
              onChange={handleChange}
              className="h-11 border-gray-200 focus:border-amber-500 focus:ring-amber-500 transition-colors duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="specialRequirements"
              className="text-sm font-medium"
            >
              Special Requirements or Notes
            </Label>
            <Textarea
              id="specialRequirements"
              name="specialRequirements"
              placeholder="Any special requirements or additional information"
              value={formData.specialRequirements}
              onChange={handleChange}
              className="min-h-[100px] border-gray-200 focus:border-amber-500 focus:ring-amber-500 transition-colors duration-200"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={handleCheckboxChange}
                className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                required
              />
              <Label htmlFor="agreeTerms" className="text-sm">
                I agree to the{" "}
                <span className="text-amber-600 hover:underline cursor-pointer">
                  terms and conditions
                </span>{" "}
                and confirm that all provided information is accurate
              </Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!formData.agreeTerms}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white transition-colors duration-200"
          >
            Submit Application
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
