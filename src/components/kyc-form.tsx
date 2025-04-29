"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/file-upload"

export function KycForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    pincode: "",
    mobileNo: "",
  })

  const [documents, setDocuments] = useState({
    aadharFront: null,
    aadharBack: null,
    panFront: null,
    panBack: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (name: string, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [name]: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate form
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.address ||
      !formData.pincode ||
      !formData.mobileNo ||
      !documents.aadharFront ||
      !documents.aadharBack ||
      !documents.panFront ||
      !documents.panBack
    ) {
      alert("Please fill all required fields and upload all documents")
      return
    }

    // Submit form
    onSubmit()
  }

  return (
    <div className="flex items-center justify-center ml-96">
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">KYC Verification</h1>
        <Card className="max-w-8xl mx-auto">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Please provide your personal details for KYC verification</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
              </div>

              <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNo">Mobile Number</Label>
              <Input id="mobileNo" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required />
            </div>
              </div>

              <div className="space-y-4">
            <h3 className="text-lg font-medium">Document Upload</h3>

            <div className="space-y-2">
              <Label>Aadhar Card (Front)</Label>
              <FileUpload onFileChange={(file) => handleFileChange("aadharFront", file)} accept="image/*" />
            </div>

            <div className="space-y-2">
              <Label>Aadhar Card (Back)</Label>
              <FileUpload onFileChange={(file) => handleFileChange("aadharBack", file)} accept="image/*" />
            </div>

            <div className="space-y-2">
              <Label>PAN Card (Front)</Label>
              <FileUpload onFileChange={(file) => handleFileChange("panFront", file)} accept="image/*" />
            </div>

            <div className="space-y-2">
              <Label>PAN Card (Back)</Label>
              <FileUpload onFileChange={(file) => handleFileChange("panBack", file)} accept="image/*" />
            </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
            Submit KYC
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
