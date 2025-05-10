"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

export default function NewApplicationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit form and redirect
      router.push("/dashboard/client/applications");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex ml-8 p-8">
      <DashboardSidebar userRole="client" />
      <div className="flex-1">
        <div className="mb-8">
          <Link
            href="/dashboard/client/applications"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mt-4">
            New Visa Application
          </h1>
          <p className="text-muted-foreground">
            Complete the form below to submit a new visa application
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 1
                  ? "bg-primary text-primary-foreground"
                  : "border border-input bg-background"
              }`}
            >
              1
            </div>
            <div
              className={`h-0.5 w-12 ${step > 1 ? "bg-primary" : "bg-border"}`}
            ></div>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 2
                  ? "bg-primary text-primary-foreground"
                  : "border border-input bg-background"
              }`}
            >
              2
            </div>
            <div
              className={`h-0.5 w-12 ${step > 2 ? "bg-primary" : "bg-border"}`}
            ></div>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 3
                  ? "bg-primary text-primary-foreground"
                  : "border border-input bg-background"
              }`}
            >
              3
            </div>
            <div
              className={`h-0.5 w-12 ${step > 3 ? "bg-primary" : "bg-border"}`}
            ></div>
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                step >= 4
                  ? "bg-primary text-primary-foreground"
                  : "border border-input bg-background"
              }`}
            >
              4
            </div>
          </div>
          <div className="text-sm text-muted-foreground">Step {step} of 4</div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Enter your personal details for the visa application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select>
                    <SelectTrigger id="nationality">
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passport">Passport Number</Label>
                  <Input id="passport" placeholder="AB1234567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passport-expiry">Passport Expiry Date</Label>
                  <Input id="passport-expiry" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Current Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your current address"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Travel Information</CardTitle>
              <CardDescription>
                Provide details about your intended travel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination Country</Label>
                  <Select>
                    <SelectTrigger id="destination">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="eu">
                        European Union (Schengen)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visa-type">Visa Type</Label>
                  <Select>
                    <SelectTrigger id="visa-type">
                      <SelectValue placeholder="Select visa type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tourist">Tourist</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="transit">Transit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entry-date">Intended Entry Date</Label>
                  <Input id="entry-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exit-date">Intended Exit Date</Label>
                  <Input id="exit-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose of Travel</Label>
                <Textarea
                  id="purpose"
                  placeholder="Briefly describe the purpose of your travel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="previous-travel">
                  Have you traveled to this country before?
                </Label>
                <Select>
                  <SelectTrigger id="previous-travel">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>
                Upload the required documents for your visa application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-dashed p-6">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <h3 className="font-medium">Passport Copy</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a clear copy of your passport bio page
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Select File
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border border-dashed p-6">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <h3 className="font-medium">Photo</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a recent passport-sized photo (35mm x 45mm)
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Select File
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border border-dashed p-6">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <h3 className="font-medium">Financial Documents</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload bank statements or other financial proof
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Select File
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border border-dashed p-6">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <h3 className="font-medium">Additional Documents</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload any additional supporting documents
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Select File
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </CardFooter>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Additional Services</CardTitle>
              <CardDescription>
                Select any additional services you may need
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox id="travel-insurance" />
                  <div>
                    <Label htmlFor="travel-insurance" className="font-medium">
                      Travel Insurance
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get compliant travel insurance for your visa application
                    </p>
                    <p className="text-sm font-medium mt-1">$50</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox id="hotel-booking" />
                  <div>
                    <Label htmlFor="hotel-booking" className="font-medium">
                      Hotel Booking
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Embassy-accepted hotel confirmation for your visa
                      application
                    </p>
                    <p className="text-sm font-medium mt-1">$30</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox id="flight-reservation" />
                  <div>
                    <Label htmlFor="flight-reservation" className="font-medium">
                      Flight Reservation
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      IATA-certified flight reservation for your visa
                      application
                    </p>
                    <p className="text-sm font-medium mt-1">$40</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox id="expedited" />
                  <div>
                    <Label htmlFor="expedited" className="font-medium">
                      Expedited Processing
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get priority processing for your visa application
                    </p>
                    <p className="text-sm font-medium mt-1">$100</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-muted p-4">
                <h3 className="font-medium">Order Summary</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Visa Application Fee</span>
                    <span>$200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span>$50</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>$250</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext}>Submit Application</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
