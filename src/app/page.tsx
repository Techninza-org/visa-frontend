"use client";

import { Textarea } from "@/components/ui/textarea";
import { SelectItem } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddOnServices from "@/components/addservices";
import TrustedBy from "@/components/trustedby";
import HowItWorks from "@/components/visaworks";
import Image from "next/image";
import {
  Award,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LocationForm from "@/components/LocationForm";
import VisaPage from "@/components/VisaPage";
// import VisaRequirements from "@/components/VisaRequirements";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex h-[600px] items-center justify-center mb-10">
          <div className="absolute inset-0 z-0 h-[600px]">
            <Image
              src="/hero2.jpeg"
              alt="Hero Background"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0" />
          </div>

          <div className="relative z-10 text-center mb-5 px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-6">
                Simplify Your Global Journey
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 items-center mt-20 bg-white px-6 rounded-2xl">
                <LocationForm />
                <a href="/pages/detailspage">
                  {/* <Button
                    className="bg-gradient-to-r from-amber-400 to-amber-600 hover:bg-amber-600/90 border border-amber-500/20 px-8 py-6 rounded-xl text-lg sm:ml-4 text-white"
                    size="lg"
                  >
                    Check Visa
                  </Button> */}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-2 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Government Authorized",
                text: "Official partner for visa services",
              },
              {
                icon: Users,
                title: "50k+ Clients",
                text: "Trusted by professionals worldwide",
              },
              {
                icon: Award,
                title: "98% Success",
                text: "Premium approval rate",
              },
              {
                icon: Clock,
                title: "Express Processing",
                text: "As fast as 24 hours",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-yellow-500/5 shadow-lg border border-amber-500/50 p-8 rounded-2xl hover:border-amber-500/30 transition-all"
              >
                <item.icon className="h-12 w-12 text-amber-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Visa Services */}
        <section className="bg-white">
          <VisaPage />
        </section>
        <section className="bg-white">
          <AddOnServices />
        </section>

        <section className="bg-white">
          <TrustedBy />
        </section>

        <section className="bg-gray-50">
          <HowItWorks />
        </section>

        {/* Services */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-4">
                Premium Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Bespoke visa and passport solutions tailored to your exclusive
                needs
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative group overflow-hidden rounded-2xl">
                <div className="absolute inset-0  bg-yellow-500/10 border border-amber-500/30 rounded-xl p-8 transition-all group-hover:border-amber-500/30">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Global Visa Solutions
                    </h3>
                    <p className="text-gray-600">
                      Premium handling for tourist, business, and diplomatic
                      visas across 150+ countries
                    </p>
                    <ul className="space-y-3">
                      {[
                        "24h Processing",
                        "Dedicated Manager",
                        "VIP Lounge Access",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <CheckCircle className="h-5 w-5 text-amber-600 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  "Tourist Visa",
                  "Business Visa",
                  "Passport Services",
                  "Consultation",
                ].map((service, i) => (
                  <div
                    key={i}
                    className=" bg-yellow-500/10 border border-amber-500/30 p-6 rounded-xl shadow-lg hover:border-amber-500/30 transition-all"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Premium processing with dedicated support
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-4">
                Effortless Process
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-amber-500/30 to-transparent" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                {["Application", "Verification", "Delivery"].map((step, i) => (
                  <div key={i} className="text-center">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-center justify-center mx-auto mb-6",
                        "hover:bg-amber-500/10 transition-colors"
                      )}
                    >
                      <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {step}
                    </h3>
                    <p className="text-gray-600">
                      Premium handling with expert review
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto bg-white shadow-lg border border-amber-500/10 rounded-2xl p-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-4">
                Why Choose Our Premium Services
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/luxury.jpg"
                  alt="Luxury office"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-amber-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Personalized Consultation
                      </h3>
                      <p className="text-gray-600">
                        Dedicated visa experts to guide you through every step
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-amber-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Premium Lounge Experience
                      </h3>
                      <p className="text-gray-600">
                        Luxury waiting areas with refreshments and amenities
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-amber-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Expedited Processing
                      </h3>
                      <p className="text-gray-600">
                        Fast-track options for urgent visa and passport needs
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-amber-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        24/7 Support
                      </h3>
                      <p className="text-gray-600">
                        Round-the-clock assistance for all your queries
                      </p>
                    </div>
                  </li>
                </ul>
                <Button
                  className="bg-gradient-to-r from-amber-400 to-amber-600 hover:bg-amber-600/90 border border-amber-500/20 px-8 py-6 rounded-xl text-sm text-white"
                  size="lg"
                >
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-amber-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hear from our satisfied clients about their premium experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  initials: "RA",
                  name: "Rahul Agarwal",
                  role: "Business Executive, Delhi",
                  content:
                    "The premium service was worth every penny. My business visa was processed in record time, and the staff was incredibly professional and attentive.",
                },
                {
                  initials: "SP",
                  name: "Sanjana Patel",
                  role: "Travel Enthusiast, Mumbai",
                  content:
                    "I was amazed by the luxury experience. The lounge was comfortable, and my tourist visa was processed without any hassle. Highly recommended!",
                },
                {
                  initials: "VK",
                  name: "Vikram Kumar",
                  role: "CEO, Bangalore",
                  content:
                    "Their passport renewal service is exceptional. The attention to detail and personalized approach made the entire process smooth and stress-free.",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg border border-amber-500/10 p-8 rounded-2xl hover:border-amber-500/30 transition-all"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-full w-12 h-12 flex items-center justify-center text-amber-600 font-bold text-lg mr-4">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4 text-amber-600">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-amber-50 mb-10">
          <div className="max-w-7xl mx-auto py-20 px-4 bg-white shadow-lg border border-amber-500/10 rounded-2xl">
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

              <div className=" bg-yellow-500/10 border border-amber-500/30 p-6 rounded-xl shadow-inner">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Request a Consultation
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="text-gray-900">
                        First Name
                      </Label>
                      <Input
                        id="first-name"
                        className="bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="text-gray-900">
                        Last Name
                      </Label>
                      <Input
                        id="last-name"
                        className="bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-900">
                      Email
                    </Label>
                    <Input
                      id="email"
                      className="bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-900">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      className="bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                      type="tel"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-gray-900">
                      Service Interested In
                    </Label>
                    <Select>
                      <SelectTrigger
                        id="service"
                        className="bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                      >
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300 text-gray-900">
                        <SelectItem
                          value="tourist"
                          className="hover:bg-amber-50"
                        >
                          Tourist Visa
                        </SelectItem>
                        <SelectItem
                          value="business"
                          className="hover:bg-amber-50"
                        >
                          Business Visa
                        </SelectItem>
                        <SelectItem
                          value="student"
                          className="hover:bg-amber-50"
                        >
                          Student Visa
                        </SelectItem>
                        <SelectItem value="work" className="hover:bg-amber-50">
                          Work Visa
                        </SelectItem>
                        <SelectItem
                          value="passport"
                          className="hover:bg-amber-50"
                        >
                          Passport Services
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-900">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 min-h-[120px]"
                    />
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:bg-amber-600/90 border border-amber-500/20 px-8 py-6 rounded-xl text-lg mt-4 text-white"
                    size="lg"
                  >
                    Submit Request
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
