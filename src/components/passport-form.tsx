"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/file-upload"

export function PassportForm({ onSubmit }: { onSubmit: () => void }) {
  const [formData, setFormData] = useState({
    passportNumber: "",
    expiryDate: "",
  })

  const [documents, setDocuments] = useState({
    passportFront: null,
    passportBack: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (name: string, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [name]: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate form
    if (!formData.passportNumber || !formData.expiryDate || !documents.passportFront || !documents.passportBack) {
      alert("Please fill all required fields and upload all documents")
      return
    }

    // Submit form
    onSubmit()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Passport Submission</h1>
      <Card>
        <CardHeader>
          <CardTitle>Passport Details</CardTitle>
          <CardDescription>Please provide your passport details and upload images of both sides</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Passport Number</Label>
                <Input
                  id="passportNumber"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Passport Images</h3>

              <div className="space-y-2">
                <Label>Passport (Front/Main Page)</Label>
                <FileUpload onFileChange={(file) => handleFileChange("passportFront", file)} accept="image/*" />
              </div>

              <div className="space-y-2">
                <Label>Passport (Back/Last Page)</Label>
                <FileUpload onFileChange={(file) => handleFileChange("passportBack", file)} accept="image/*" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit Passport Details
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
