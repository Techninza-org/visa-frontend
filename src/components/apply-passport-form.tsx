"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "@/components/file-upload"

export function ApplyPassportForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    birthPlace: "",
    birthDate: "",
    fatherName: "",
    motherName: "",
    maritalStatus: "",
    emergencyContact: "",
  })

  const [documents, setDocuments] = useState({
    birthCertificate: null,
    addressProof: null,
    photo: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (name: string, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [name]: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate form
    if (
      !formData.birthPlace ||
      !formData.birthDate ||
      !formData.fatherName ||
      !formData.motherName ||
      !formData.maritalStatus ||
      !formData.emergencyContact ||
      !documents.birthCertificate ||
      !documents.addressProof ||
      !documents.photo
    ) {
      alert("Please fill all required fields and upload all documents")
      return
    }

    // Submit form
    onSubmit()
  }

  return (
    <div className="flex flex-col ml-72 items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Passport Application</h1>
      <Card>
        <CardHeader>
          <CardTitle>Apply for New Passport</CardTitle>
          <CardDescription>Please provide the required information to apply for a new passport</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="birthPlace">Place of Birth</Label>
                <Input id="birthPlace" name="birthPlace" value={formData.birthPlace} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Date of Birth</Label>
                <Input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fatherName">Father Name</Label>
                <Input
                  id="fatherName"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherName">Mother  Name</Label>
                <Input id="motherName" name="motherName" value={formData.motherName} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("maritalStatus", value)}
                  value={formData.maritalStatus}
                  required
                >
                  <SelectTrigger id="maritalStatus">
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Required Documents</h3>

              <div className="space-y-2">
                <Label>Birth Certificate</Label>
                <FileUpload onFileChange={(file) => handleFileChange("birthCertificate", file)} accept="image/*,.pdf" />
              </div>

              <div className="space-y-2">
                <Label>Address Proof</Label>
                <FileUpload onFileChange={(file) => handleFileChange("addressProof", file)} accept="image/*,.pdf" />
              </div>

              <div className="space-y-2">
                <Label>Passport Size Photo</Label>
                <FileUpload onFileChange={(file) => handleFileChange("photo", file)} accept="image/*" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit Passport Application
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
