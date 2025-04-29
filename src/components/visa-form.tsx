"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "@/components/file-upload"
import { Checkbox } from "@/components/ui/checkbox"

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "nz", label: "New Zealand" }, 
  { value: "sg", label: "Singapore" },
  { value: "jp", label: "Japan" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "ch", label: "Switzerland" },
  { value: "se", label: "Sweden" },
  { value: "no", label: "Norway" },
  { value: "dk", label: "Denmark" },
]

export function VisaForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    country: "",
    visaType: "",
    travelDate: "",
    returnDate: "",
    travelPurpose: "",
    accommodation: "",
    hasInvitation: false,
  })

  const [documents, setDocuments] = useState({
    photo: null,
    bankStatement: null,
    invitation: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (name: string, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [name]: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate form
    if (
      !formData.country ||
      !formData.visaType ||
      !formData.travelDate ||
      !formData.returnDate ||
      !formData.travelPurpose ||
      !formData.accommodation ||
      !documents.photo ||
      !documents.bankStatement
    ) {
      alert("Please fill all required fields and upload all documents")
      return
    }

    // If invitation is required but not uploaded
    if (formData.hasInvitation && !documents.invitation) {
      alert("Please upload the invitation letter")
      return
    }

    // Submit form
    onSubmit()
  }

  return (
    <div className="max-w-5xl mx-auto p-4 ml-72">
      <h1 className="text-3xl font-bold mb-6">Visa Application</h1>
      <Card className="max-w-8xl mx-auto">
        <CardHeader >
          <CardTitle>Apply for Visa</CardTitle>
          <CardDescription>Please select a country and provide the required information</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select onValueChange={(value) => handleSelectChange("country", value)} value={formData.country} required>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visaType">Visa Type</Label>
              <Select
                onValueChange={(value) => handleSelectChange("visaType", value)}
                value={formData.visaType}
                required
              >
                <SelectTrigger id="visaType">
                  <SelectValue placeholder="Select visa type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tourist">Tourist Visa</SelectItem>
                  <SelectItem value="business">Business Visa</SelectItem>
                  <SelectItem value="student">Student Visa</SelectItem>
                  <SelectItem value="work">Work Visa</SelectItem>
                  <SelectItem value="transit">Transit Visa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="travelDate">Travel Date</Label>
                <Input
                  id="travelDate"
                  name="travelDate"
                  type="date"
                  value={formData.travelDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnDate">Return Date</Label>
                <Input
                  id="returnDate"
                  name="returnDate"
                  type="date"
                  value={formData.returnDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelPurpose">Purpose of Travel</Label>
              <Textarea
                id="travelPurpose"
                name="travelPurpose"
                value={formData.travelPurpose}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accommodation">Accommodation Details</Label>
              <Textarea
                id="accommodation"
                name="accommodation"
                value={formData.accommodation}
                onChange={handleChange}
                placeholder="Hotel name, address, or host details"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasInvitation"
                checked={formData.hasInvitation}
                onCheckedChange={(checked) => handleCheckboxChange("hasInvitation", checked as boolean)}
              />
              <Label htmlFor="hasInvitation">I have an invitation letter</Label>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Required Documents</h3>

              <div className="space-y-2">
                <Label>Recent Passport Size Photo</Label>
                <FileUpload onFileChange={(file) => handleFileChange("photo", file)} accept="image/*" />
              </div>

              <div className="space-y-2">
                <Label>Bank Statement (Last 3 months)</Label>
                <FileUpload onFileChange={(file) => handleFileChange("bankStatement", file)} accept="image/*,.pdf" />
              </div>

              {formData.hasInvitation && (
                <div className="space-y-2">
                  <Label>Invitation Letter</Label>
                  <FileUpload onFileChange={(file) => handleFileChange("invitation", file)} accept="image/*,.pdf" />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Proceed to Payment
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
