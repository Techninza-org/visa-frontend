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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ModalWrapper } from "@/components/modals/modal-wrapper";
import { useState } from "react";
import {
  CreditCard,
  Landmark,
  Wallet,
  ShieldCheck,
  Lock,
  CreditCardIcon,
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function PaymentModal({ isOpen, onClose, onSubmit }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Payment Information">
      <div className="mb-6 flex items-center p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-slate-100">
        <div className="mr-4 bg-slate-100 p-2 rounded-full">
          <ShieldCheck className="h-6 w-6 text-slate-600" />
        </div>
        <div>
          <h3 className="font-medium text-slate-800">Secure Payment</h3>
          <p className="text-sm text-slate-700">
            Your payment information is encrypted and secure
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 border-b">
              <p className="font-medium text-slate-800">
                Application Fee Summary
              </p>
            </div>
            <div className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Base Application Fee</span>
                  <span className="font-medium">$150.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-medium">$25.00</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Service Charge</span>
                  <span className="font-medium">$10.00</span>
                </div>
                <div className="flex justify-between font-medium pt-3 border-t mt-2 text-base">
                  <span>Total Amount</span>
                  <span className="text-slate-900">$185.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Select Payment Method</Label>
            <RadioGroup
              defaultValue="creditCard"
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div
                className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  paymentMethod === "creditCard"
                    ? "border-slate-600 bg-slate-50 shadow-sm"
                    : "border-gray-200 hover:border-slate-300"
                }`}
              >
                <RadioGroupItem
                  value="creditCard"
                  id="creditCard"
                  className="data-[state=checked]:border-slate-600 data-[state=checked]:bg-slate-600"
                />
                <Label
                  htmlFor="creditCard"
                  className="flex items-center cursor-pointer"
                >
                  <CreditCard className="h-4 w-4 mr-2 text-slate-600" />
                  Credit Card
                </Label>
              </div>
              <div
                className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  paymentMethod === "bankTransfer"
                    ? "border-slate-600 bg-slate-50 shadow-sm"
                    : "border-gray-200 hover:border-slate-300"
                }`}
              >
                <RadioGroupItem
                  value="bankTransfer"
                  id="bankTransfer"
                  className="data-[state=checked]:border-slate-600 data-[state=checked]:bg-slate-600"
                />
                <Label
                  htmlFor="bankTransfer"
                  className="flex items-center cursor-pointer"
                >
                  <Landmark className="h-4 w-4 mr-2 text-slate-600" />
                  Bank Transfer
                </Label>
              </div>
              <div
                className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                  paymentMethod === "digitalWallet"
                    ? "border-slate-600 bg-slate-50 shadow-sm"
                    : "border-gray-200 hover:border-slate-300"
                }`}
              >
                <RadioGroupItem
                  value="digitalWallet"
                  id="digitalWallet"
                  className="data-[state=checked]:border-slate-600 data-[state=checked]:bg-slate-600"
                />
                <Label
                  htmlFor="digitalWallet"
                  className="flex items-center cursor-pointer"
                >
                  <Wallet className="h-4 w-4 mr-2 text-slate-600" />
                  Digital Wallet
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "creditCard" && (
            <div className="space-y-5 p-5 border border-gray-200 rounded-lg bg-white">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-slate-800">
                  Card Information
                </p>
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="cardNumber"
                  className="text-sm font-medium flex items-center gap-1"
                >
                  <CreditCardIcon className="h-4 w-4 text-slate-500" />
                  Card Number
                </Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="h-11 pl-10 border-gray-200 focus:border-slate-500 focus:ring-slate-500 transition-colors duration-200"
                    required
                  />
                  <CreditCard className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardholderName" className="text-sm font-medium">
                  Cardholder Name
                </Label>
                <Input
                  id="cardholderName"
                  name="cardholderName"
                  placeholder="John Doe"
                  value={formData.cardholderName}
                  onChange={handleChange}
                  className="h-11 border-gray-200 focus:border-slate-500 focus:ring-slate-500 transition-colors duration-200"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryMonth" className="text-sm font-medium">
                    Expiry Month
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("expiryMonth", value)
                    }
                  >
                    <SelectTrigger
                      id="expiryMonth"
                      className="h-11 border-gray-200 focus:border-slate-500 focus:ring-slate-500 transition-colors duration-200"
                    >
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-200">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (month) => (
                          <SelectItem
                            key={month}
                            value={month.toString().padStart(2, "0")}
                          >
                            {month.toString().padStart(2, "0")}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryYear" className="text-sm font-medium">
                    Expiry Year
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("expiryYear", value)
                    }
                  >
                    <SelectTrigger
                      id="expiryYear"
                      className="h-11 border-gray-200 focus:border-slate-500 focus:ring-slate-500 transition-colors duration-200"
                    >
                      <SelectValue placeholder="YY" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-200">
                      {Array.from(
                        { length: 10 },
                        (_, i) => new Date().getFullYear() + i
                      ).map((year) => (
                        <SelectItem
                          key={year}
                          value={year.toString().slice(-2)}
                        >
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="cvv"
                    className="text-sm font-medium flex items-center gap-1"
                  >
                    <Lock className="h-4 w-4 text-slate-500" />
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="h-11 border-gray-200 focus:border-slate-500 focus:ring-slate-500 transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <Lock className="h-4 w-4 text-slate-500 mr-2" />
                <p className="text-xs text-slate-600">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          )}

          {paymentMethod === "bankTransfer" && (
            <div className="border rounded-lg p-5 space-y-4 bg-white border-gray-200">
              <div className="flex items-center mb-2">
                <Landmark className="h-5 w-5 text-slate-600 mr-2" />
                <p className="font-medium text-slate-800">
                  Bank Transfer Details
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Please transfer the total amount to the following account:
              </p>
              <div className="text-sm space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="grid grid-cols-3">
                  <span className="font-medium text-slate-700">Bank Name:</span>
                  <span className="col-span-2">Global Trust Bank</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium text-slate-700">
                    Account Name:
                  </span>
                  <span className="col-span-2">Premium Visa Services Ltd</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium text-slate-700">
                    Account Number:
                  </span>
                  <span className="col-span-2">1234567890</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium text-slate-700">SWIFT/BIC:</span>
                  <span className="col-span-2">GTBKUS12</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="font-medium text-slate-700">Reference:</span>
                  <span className="col-span-2 font-medium">APP-2023-12345</span>
                </div>
              </div>
              <p className="text-sm mt-4">
                Please upload your payment receipt below:
              </p>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 transition-colors hover:border-slate-300 cursor-pointer">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="bg-slate-50 p-2 rounded-full">
                    <CreditCard className="h-6 w-6 text-slate-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">
                      Upload payment receipt
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, JPG or PNG (max. 5MB)
                    </p>
                  </div>
                  <Input id="receiptUpload" type="file" className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    Browse Files
                  </Button>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "digitalWallet" && (
            <div className="border rounded-lg p-5 space-y-4 bg-white border-gray-200">
              <div className="flex items-center mb-2">
                <Wallet className="h-5 w-5 text-slate-600 mr-2" />
                <p className="font-medium text-slate-800">
                  Digital Wallet Options
                </p>
              </div>
              <RadioGroup defaultValue="paypal" className="space-y-3">
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-slate-300 transition-all duration-200">
                  <RadioGroupItem
                    value="paypal"
                    id="paypal"
                    className="data-[state=checked]:border-slate-600 data-[state=checked]:bg-slate-600"
                  />
                  <Label
                    htmlFor="paypal"
                    className="flex items-center cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded-full mr-2 flex items-center justify-center text-white text-xs font-bold">
                      P
                    </div>
                    PayPal
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-slate-300 transition-all duration-200">
                  <RadioGroupItem
                    value="applepay"
                    id="applepay"
                    className="data-[state=checked]:border-slate-600 data-[state=checked]:bg-slate-600"
                  />
                  <Label
                    htmlFor="applepay"
                    className="flex items-center cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-black rounded-full mr-2 flex items-center justify-center text-white text-xs font-bold">
                      A
                    </div>
                    Apple Pay
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-slate-300 transition-all duration-200">
                  <RadioGroupItem
                    value="googlepay"
                    id="googlepay"
                    className="data-[state=checked]:border-slate-600 data-[state=checked]:bg-slate-600"
                  />
                  <Label
                    htmlFor="googlepay"
                    className="flex items-center cursor-pointer"
                  >
                    <div className="w-6 h-6 bg-white border border-gray-200 rounded-full mr-2 flex items-center justify-center text-xs font-bold">
                      G
                    </div>
                    Google Pay
                  </Label>
                </div>
              </RadioGroup>
              <div className="flex items-center mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <Lock className="h-4 w-4 text-slate-500 mr-2" />
                <p className="text-xs text-slate-600">
                  You will be redirected to the selected payment provider after
                  clicking Proceed to Payment.
                </p>
              </div>
            </div>
          )}
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
            className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white transition-colors duration-200"
          >
            Proceed to Payment
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
