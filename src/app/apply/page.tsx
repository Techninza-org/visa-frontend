"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Lock,
  Shield,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(20);
  const [visaType, setVisaType] = useState("tourist");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleNext = () => {
    const nextStep = step + 1;
    setStep(nextStep);
    setProgress(nextStep * 20);
  };

  const handlePrevious = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    setProgress(prevStep * 20);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => file.name);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file !== fileName));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-gray-900 backdrop-blur supports-[backdrop-filter]:bg-gray-900">
        <div className="container max-w-7xl mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo2.png"
              alt="Global Visa Solutions"
              width={80}
              height={20}
              className="h-10 w-16 md:h-12 md:w-20 lg:h-16 lg:w-24"
            />
            <span className="text-lg md:text-xl text-white font-bold hidden md:block">
              AXE VISA <br className="hidden lg:block" /> TECHNOLOGY
            </span>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center text-white gap-2 text-xs md:text-sm">
              <Lock className="h-3 w-3 md:h-4 md:w-4 text-yellow-400" />
              <span>Secure Application</span>
            </div>
            <Button
              variant="outline"
              className="bg-yellow-400 hover:bg-yellow-700 text-xs md:text-sm h-8 md:h-9 px-3 md:px-4"
              asChild
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 md:py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 md:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">
              Visa & Passport Application
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Complete your application in 5 simple steps. Our secure system
              ensures your documents are handled with the utmost
              confidentiality.
            </p>
          </div>

            <div className="mb-6 md:mb-8">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-xs sm:text-sm text-gray-500">
              <div
              className={`${
                step >= 1 ? "text-amber-600 font-medium" : ""
              } ${step >= 1 ? "mr-2 md:mr-0" : ""}`}
              >
              Personal Details
              </div>
              <div
              className={`${
                step >= 2 ? "text-amber-600 font-medium" : ""
              } ${step >= 2 ? "mr-2 md:mr-0" : ""}`}
              >
              Visa Selection
              </div>
              <div
              className={`${
                step >= 3 ? "text-amber-600 font-medium" : ""
              } ${step >= 3 ? "mr-2 md:mr-0" : ""}`}
              >
              Document Upload
              </div>
              <div
             className={`${
                step >= 3 ? "text-amber-600 font-medium" : ""
              } ${step >= 3 ? "mr-2 md:mr-0" : ""}`}
              >
              Review
              </div>
                <div
                className={`${
                  step >= 3 ? "text-amber-600 font-medium" : ""
                } ${step >= 3 ? "mr-2 md:mr-0" : ""} hidden sm:block`}
                >
                Payment
                </div>
            </div>
            </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 sm:p-6 md:p-8">
              {step === 1 && (
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-lg md:text-xl font-bold">Personal Information</h2>
                    <p className="text-gray-500 text-sm md:text-base">
                      Please provide your personal details as they appear on
                      your passport.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        placeholder="Enter your first name"
                        className="text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        placeholder="Enter your last name"
                        className="text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" className="text-sm md:text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Select>
                        <SelectTrigger id="nationality" className="text-sm md:text-base">
                          <SelectValue placeholder="Select your nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="passport">Passport Number</Label>
                      <Input
                        id="passport"
                        placeholder="Enter your passport number"
                        className="text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passport-expiry">
                        Passport Expiry Date
                      </Label>
                      <Input id="passport-expiry" type="date" className="text-sm md:text-base" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Current Address</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your current address"
                        className="text-sm md:text-base min-h-[100px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="text-sm md:text-base"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        placeholder="Enter your phone number" 
                        className="text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={handleNext}
                      className="bg-yellow-400 hover:bg-yellow-700 text-sm md:text-base"
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-lg md:text-xl font-bold">Visa Selection</h2>
                    <p className="text-gray-500 text-sm md:text-base">
                      Select the type of visa you wish to apply for and provide
                      travel details.
                    </p>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <Label>Visa Type</Label>
                    <RadioGroup
                      defaultValue={visaType}
                      onValueChange={setVisaType}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
                    >
                      <div className="relative">
                        <RadioGroupItem
                          value="tourist"
                          id="tourist"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="tourist"
                          className="flex flex-col items-start p-3 md:p-4 border rounded-md cursor-pointer peer-checked:border-amber-600 peer-checked:bg-amber-50 hover:bg-gray-50"
                        >
                          <span className="font-medium text-sm md:text-base mb-1">Tourist Visa</span>
                          <span className="text-xs md:text-sm text-gray-500">
                            For leisure travel, visiting friends & family
                          </span>
                        </Label>
                      </div>
                      <div className="relative">
                        <RadioGroupItem
                          value="business"
                          id="business"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="business"
                          className="flex flex-col items-start p-3 md:p-4 border rounded-md cursor-pointer peer-checked:border-amber-600 peer-checked:bg-amber-50 hover:bg-gray-50"
                        >
                          <span className="font-medium text-sm md:text-base mb-1">
                            Business Visa
                          </span>
                          <span className="text-xs md:text-sm text-gray-500">
                            For business meetings, conferences & trade
                          </span>
                        </Label>
                      </div>
                      <div className="relative">
                        <RadioGroupItem
                          value="work"
                          id="work"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="work"
                          className="flex flex-col items-start p-3 md:p-4 border rounded-md cursor-pointer peer-checked:border-amber-600 peer-checked:bg-amber-50 hover:bg-gray-50"
                        >
                          <span className="font-medium text-sm md:text-base mb-1">Work Visa</span>
                          <span className="text-xs md:text-sm text-gray-500">
                            For employment purposes
                          </span>
                        </Label>
                      </div>
                      <div className="relative">
                        <RadioGroupItem
                          value="student"
                          id="student"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="student"
                          className="flex flex-col items-start p-3 md:p-4 border rounded-md cursor-pointer peer-checked:border-amber-600 peer-checked:bg-amber-50 hover:bg-gray-50"
                        >
                          <span className="font-medium text-sm md:text-base mb-1">Student Visa</span>
                          <span className="text-xs md:text-sm text-gray-500">
                            For educational purposes
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination Country</Label>
                      <Select>
                        <SelectTrigger id="destination" className="text-sm md:text-base">
                          <SelectValue placeholder="Select destination country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="sg">Singapore</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration of Stay</Label>
                      <Select>
                        <SelectTrigger id="duration" className="text-sm md:text-base">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">Up to 30 days</SelectItem>
                          <SelectItem value="90">Up to 90 days</SelectItem>
                          <SelectItem value="180">Up to 180 days</SelectItem>
                          <SelectItem value="365">Up to 1 year</SelectItem>
                          <SelectItem value="730">Up to 2 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="travel-date">Expected Travel Date</Label>
                      <Input id="travel-date" type="date" className="text-sm md:text-base" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="return-date">Expected Return Date</Label>
                      <Input id="return-date" type="date" className="text-sm md:text-base" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose of Visit</Label>
                    <Textarea
                      id="purpose"
                      placeholder="Please describe the purpose of your visit"
                      className="text-sm md:text-base min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious}
                      className="text-sm md:text-base"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="bg-yellow-400 hover:bg-yellow-700 text-sm md:text-base"
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-lg md:text-xl font-bold">Document Upload</h2>
                    <p className="text-gray-500 text-sm md:text-base">
                      Upload all required documents. Accepted formats: PDF, JPG,
                      PNG (max 5MB per file).
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3 md:p-4 mb-4 md:mb-6">
                    <h3 className="font-medium text-amber-800 text-sm md:text-base mb-2">
                      Required Documents for{" "}
                      {visaType === "tourist"
                        ? "Tourist Visa"
                        : visaType === "business"
                        ? "Business Visa"
                        : visaType === "work"
                        ? "Work Visa"
                        : "Student Visa"}
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-amber-700 text-xs md:text-sm">
                      <li>Passport scan (all pages with visa stamps)</li>
                      <li>
                        Recent passport-sized photograph (white background)
                      </li>
                      <li>Proof of accommodation</li>
                      {visaType === "tourist" && (
                        <>
                          <li>Travel itinerary</li>
                          <li>Bank statements (last 6 months)</li>
                        </>
                      )}
                      {visaType === "business" && (
                        <>
                          <li>Invitation letter from host company</li>
                          <li>Business registration documents</li>
                          <li>Bank statements (last 6 months)</li>
                        </>
                      )}
                      {visaType === "work" && (
                        <>
                          <li>Employment contract</li>
                          <li>Work permit or approval letter</li>
                          <li>Educational certificates</li>
                          <li>Resume/CV</li>
                        </>
                      )}
                      {visaType === "student" && (
                        <>
                          <li>
                            Acceptance letter from educational institution
                          </li>
                          <li>Educational certificates</li>
                          <li>Proof of financial support</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-10 md:h-11">
                      <TabsTrigger value="upload" className="text-xs md:text-sm">Upload Files</TabsTrigger>
                      <TabsTrigger value="uploaded" className="text-xs md:text-sm">
                        Uploaded Files ({uploadedFiles.length})
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="space-y-3 md:space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-8 text-center">
                        <Upload className="h-8 w-8 md:h-10 md:w-10 text-gray-400 mx-auto mb-3 md:mb-4" />
                        <h3 className="font-medium text-sm md:text-base mb-2">
                          Drag and drop your files here
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4">or</p>
                        <div className="relative">
                          <Input
                            type="file"
                            multiple
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileUpload}
                          />
                          <Button variant="outline" className="mx-auto text-xs md:text-sm">
                            Browse Files
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-3 md:mt-4">
                          Maximum file size: 5MB. Supported formats: PDF, JPG,
                          PNG
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                        <Lock className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                        <span>
                          Your documents are encrypted and securely stored
                        </span>
                      </div>
                    </TabsContent>
                    <TabsContent value="uploaded">
                      {uploadedFiles.length > 0 ? (
                        <div className="space-y-2 md:space-y-3">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 md:p-3 border rounded-md"
                            >
                              <div className="flex items-center gap-2 md:gap-3">
                                <div className="bg-amber-100 p-1 md:p-2 rounded-md">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 md:h-5 md:w-5 text-amber-600"
                                  >
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                    <polyline points="14 2 14 8 20 8" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="font-medium text-xs md:text-sm">{file}</p>
                                  <p className="text-xs text-gray-500">
                                    Uploaded successfully
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(file)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 text-xs md:text-sm"
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 md:py-8 text-gray-500 text-sm md:text-base">
                          <p>No files uploaded yet</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-between pt-2">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious}
                      className="text-sm md:text-base"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="bg-yellow-400 hover:bg-yellow-700 text-sm md:text-base"
                    >
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-lg md:text-xl font-bold">
                      Review Your Application
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base">
                      Please review your application details before proceeding
                      to payment.
                    </p>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm md:text-base mb-2">
                        Personal Information
                      </h3>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-md">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">Full Name</p>
                            <p className="font-medium text-sm md:text-base">John Smith</p>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">
                              Date of Birth
                            </p>
                            <p className="font-medium text-sm md:text-base">15/05/1985</p>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">Nationality</p>
                            <p className="font-medium text-sm md:text-base">India</p>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">
                              Passport Number
                            </p>
                            <p className="font-medium text-sm md:text-base">J8234567</p>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">
                              Email Address
                            </p>
                            <p className="font-medium text-sm md:text-base">
                              john.smith@example.com
                            </p>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">
                              Phone Number
                            </p>
                            <p className="font-medium text-sm md:text-base">+91 98765 43210</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 text-sm md:text-base mb-2">
                        Visa Details
                      </h3>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-md">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">Visa Type</p>
                            <p className="font-medium text-sm md:text-base">
                              {visaType === "tourist"
                                ? "Tourist Visa"
                                : visaType === "business"
                                ? "Business Visa"
                                : visaType === "work"
                                ? "Work Visa"
                                : "Student Visa"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">
                              Destination Country
                            </p>
                            <p className="font-medium text-sm md:text-base">United States</p>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">
                              Duration of Stay
                            </p>
                            <p className="font-medium text-sm md:text-base">90 days</p>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">Travel Date</p>
                            <p className="font-medium text-sm md:text-base">15/08/2023</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 text-sm md:text-base mb-2">
                        Uploaded Documents
                      </h3>
                      <div className="bg-gray-50 p-3 md:p-4 rounded-md">
                        {uploadedFiles.length > 0 ? (
                          <ul className="space-y-2">
                            {uploadedFiles.map((file, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2 text-xs md:text-sm"
                              >
                                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                                {file}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs md:text-sm text-gray-500">
                            No documents uploaded
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3 md:p-4">
                      <h3 className="font-medium text-amber-800 text-sm md:text-base mb-2">
                        Processing Time & Fees
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 text-xs md:text-sm">
                            Standard Processing (7-10 business days)
                          </span>
                          <span className="font-medium text-sm md:text-base">₹8,500</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 text-xs md:text-sm">
                            Express Processing (3-5 business days)
                          </span>
                          <span className="font-medium text-sm md:text-base">₹12,500</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 text-xs md:text-sm">
                            Premium Processing (24-48 hours)
                          </span>
                          <span className="font-medium text-sm md:text-base">₹18,500</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious}
                      className="text-sm md:text-base"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      className="bg-yellow-400 hover:bg-yellow-700 text-sm md:text-base"
                    >
                      Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-lg md:text-xl font-bold">Payment</h2>
                    <p className="text-gray-500 text-sm md:text-base">
                      Select your preferred payment method and complete your
                      application.
                    </p>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3 md:p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm md:text-base">
                            Premium Processing
                          </h3>
                          <p className="text-gray-500 text-xs md:text-sm">
                            24-48 hours processing time
                          </p>
                        </div>
                        <span className="font-bold text-base md:text-lg">₹18,500</span>
                      </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <Label className="text-sm md:text-base">Select Payment Method</Label>
                      <RadioGroup
                        defaultValue="card"
                        className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
                      >
                        <div className="relative">
                          <RadioGroupItem
                            value="card"
                            id="card"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="card"
                            className="flex flex-col items-center p-3 md:p-4 border rounded-md cursor-pointer peer-checked:border-amber-600 peer-checked:bg-amber-50 hover:bg-gray-50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5 md:h-6 md:w-6 mb-2"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <line x1="2" x2="22" y1="10" y2="10" />
                            </svg>
                            <span className="font-medium text-sm md:text-base">
                              Credit/Debit Card
                            </span>
                          </Label>
                        </div>
                        <div className="relative">
                          <RadioGroupItem
                            value="netbanking"
                            id="netbanking"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="netbanking"
                            className="flex flex-col items-center p-3 md:p-4 border rounded-md cursor-pointer peer-checked:border-amber-600 peer-checked:bg-amber-50 hover:bg-gray-50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5 md:h-6 md:w-6 mb-2"
                            >
                              <rect width="20" height="16" x="2" y="4" rx="2" />
                              <path d="M6 8h.01" />
                              <path d="M12 8h.01" />
                              <path d="M18 8h.01" />
                              <path d="M12 12h.01" />
                              <path d="M18 12h.01" />
                              <path d="M6 16h.01" />
                              <path d="M12 16h.01" />
                              <path d="M18 16h.01" />
                            </svg>
                            <span className="font-medium text-sm md:text-base">Net Banking</span>
                          </Label>
                        </div>
                        <div className="relative">
                          <RadioGroupItem
                            value="upi"
                            id="upi"
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor="upi"
                            className="flex flex-col items-center p-3 md:p-4 border rounded-md cursor-pointer peer-checked:border-amber-600 peer-checked:bg-amber-50 hover:bg-gray-50"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5 md:h-6 md:w-6 mb-2"
                            >
                              <path d="M16 2h-8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
                              <path d="M12 10h4" />
                              <path d="M12 6h4" />
                              <path d="M12 14h4" />
                              <path d="M12 18h4" />
                              <path d="M8 18V6l4 4-4 4" />
                            </svg>
                            <span className="font-medium text-sm md:text-base">UPI</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4 mt-6">
                      <h3 className="font-medium">Card Details</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Name on Card</Label>
                          <Input
                            id="card-name"
                            placeholder="Enter name as on card"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" type="password" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-600">
                        Your payment information is encrypted and secure
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button className="bg-yellow-400 hover:bg-yellow-700">
                      Complete Payment
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 md:py-12">
  <div className="container max-w-7xl mx-auto px-4 md:px-6">
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      <div className="col-span-2 sm:col-span-2 md:col-span-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
          <Image
            src="/logo2.png"
            alt="Global Visa Solutions"
            width={120}
            height={30}
            className="h-12 sm:h-16 w-20 sm:w-24"
          />
          <span className="text-lg sm:text-xl font-bold">AXE VISA TECHNOLOGY</span>
        </div>
        <p className="text-sm md:text-base text-gray-400 mb-4">
          Premium visa and passport services for discerning clients across
          India.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Quick Links</h3>
        <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#services"
              className="text-gray-400 hover:text-white"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="text-gray-400 hover:text-white"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="#testimonials"
              className="text-gray-400 hover:text-white"
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="text-gray-400 hover:text-white"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-6 sm:mt-0">
        <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Services</h3>
        <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Tourist Visa
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Business Visa
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Student Visa
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Work Visa
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Passport Services
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-6 md:mt-0">
        <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4">Legal</h3>
        <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Refund Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="text-gray-400 hover:text-white">
              Cookie Policy
            </Link>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-800 mt-8 md:mt-10 pt-4 md:pt-6 text-center text-gray-400 text-sm md:text-base">
      <p>
        &copy; {new Date().getFullYear()} AXE VISA TECHNOLOGY. All rights
        reserved.
      </p>
    </div>
  </div>
</footer>
    </div>
  );
}
