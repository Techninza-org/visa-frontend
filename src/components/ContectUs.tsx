"use client";

import { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MapPin, Phone } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const encodedData = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      encodedData.append(key, value);
    });

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/public/contact-us`, encodedData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      alert("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        serviceType: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    }
  };

  return (
    <section className="bg-amber-50 mb-10">
      <div className="max-w-7xl mx-auto py-20 px-10 bg-white shadow-lg border border-amber-500/10 rounded-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">
              Contact our premium visa and passport services team for
              personalized assistance
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-amber-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Our Locations
                  </h3>
                  <p className="text-gray-600">
                    K-2/12 13 Peepal Chowk, Mohan Garden Uttam Nagar,
                    <br />
                    Near Reliance Fresh, New Delhi, Delhi – 110059
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-amber-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Contact Numbers
                  </h3>
                  <p className="text-gray-600">
                    Premium Support: +91 9999390696
                    <br />
                    General Inquiries: +91 9009908809
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-amber-500/30 p-6 rounded-xl shadow-inner">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Request a Consultation
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    id="first-name"
                    type="text"
                    value={formData.firstName}
                    className="bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    type="text"
                    value={formData.lastName}
                    className="bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  className="bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  className="bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service Interested In</Label>
                <Select
                  onValueChange={(value) => handleChange("serviceType", value)}
                  value={formData.serviceType}
                >
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Visa">Visa</SelectItem>
                    <SelectItem value="Immigration">Immigration</SelectItem>
                    <SelectItem value="Consultation">Consultation</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                    className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 min-h-[120px]"
                  onChange={(e) => handleChange("message", e.target.value)}
                 
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:bg-amber-600/90 border border-amber-500/20 px-8 py-6 rounded-xl text-lg mt-4 text-white"
              >
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
