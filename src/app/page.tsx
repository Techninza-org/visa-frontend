"use client";

import AddOnServices from "@/components/addservices";
import TrustedBy from "@/components/trustedby";
import HowItWorks from "@/components/visaworks";
import Image from "next/image";
import { Award, CheckCircle, Clock, Shield, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocationForm from "@/components/LocationForm";
import VisaPage from "@/components/VisaPage";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import ContactForm from "@/components/ContectUs";
import TestimonialComponent from "@/components/Testimonial";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section - Made responsive */}
   <section className="relative flex md:h-[100vh] h-[80vh]  w-full items-center justify-center mb-6 md:mb-10">
  <div className="absolute inset-0 z-0">
    <Image
      src="/hero2.jpeg"
      alt="Hero Background"
      fill
      className="object-cover brightness-75"
      style={{ objectFit: "cover" }}  
      priority
    />
  </div>

  <div className="relative z-10 text-center  w-full px-4">
    <div className="max-w-4xl mx-auto w-full">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-4 sm:mb-6">
        Simplify Your Global Journey
      </h1>

      <div className="w-full max-w-2xl mx-auto bg">
        <LocationForm />
      </div>
    </div>
  </div>
</section>
        {/* Trust Indicators - Made responsive */}
        <section className="py-2 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
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
                className="bg-yellow-500/5 shadow-lg border border-amber-500/50 p-4 sm:p-6 md:p-8 rounded-xl hover:border-amber-500/30 transition-all"
              >
                <item.icon className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-amber-600 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Visa Services */}
        <section className="bg-white py-8 md:py-12">
          <VisaPage />
        </section>
        
        <section className="bg-white py-8 md:py-12">
          <AddOnServices />
        </section>

        <section className="bg-white py-8 md:py-12">
          <TrustedBy />
        </section>

        <section className="bg-gray-50 py-8 md:py-12">
          <HowItWorks />
        </section>

        {/* Services - Made responsive */}
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-3 md:mb-4">
                Premium Services
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Bespoke visa and passport solutions tailored to your exclusive needs
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="relative group overflow-hidden rounded-xl md:rounded-2xl">
                <div className="bg-yellow-500/10 border border-amber-500/30 rounded-xl p-6 md:p-8 transition-all group-hover:border-amber-500/30">
                  <div className="space-y-4 md:space-y-6">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                      Global Visa Solutions
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Premium handling for tourist, business, and diplomatic
                      visas across 150+ countries
                    </p>
                    <ul className="space-y-2 md:space-y-3">
                      {[
                        "24h Processing",
                        "Dedicated Manager",
                        "VIP Lounge Access",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center text-gray-700 text-sm md:text-base">
                          <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-amber-600 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  "Tourist Visa",
                  "Business Visa",
                  "Passport Services",
                  "Consultation",
                ].map((service, i) => (
                  <div
                    key={i}
                    className="bg-yellow-500/10 border border-amber-500/30 p-4 md:p-6 rounded-lg md:rounded-xl shadow-lg hover:border-amber-500/30 transition-all"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                      {service}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Premium processing with dedicated support
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process - Made responsive */}
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-3 md:mb-4">
                Effortless Process
              </h2>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-amber-500/30 to-transparent" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 relative">
                {["Application", "Verification", "Delivery"].map((step, i) => (
                  <div key={i} className="text-center">
                    <div
                      className={cn(
                        "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-center justify-center mx-auto mb-4 md:mb-6",
                        "hover:bg-amber-500/10 transition-colors"
                      )}
                    >
                      <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">
                      {step}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      Premium handling with expert review
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Made responsive */}
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-7xl mx-auto bg-white shadow-lg border border-amber-500/10 rounded-xl md:rounded-2xl p-6 md:p-8">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-3 md:mb-4">
                Why Choose Our Premium Services
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-xl md:rounded-2xl overflow-hidden">
                <Image
                  src="/luxury.jpg"
                  alt="Luxury office"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="space-y-4 md:space-y-6">
                <ul className="space-y-3 md:space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mr-2 sm:mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Personalized Consultation
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Dedicated visa experts to guide you through every step
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mr-2 sm:mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Premium Lounge Experience
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Luxury waiting areas with refreshments and amenities
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mr-2 sm:mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Expedited Processing
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Fast-track options for urgent visa and passport needs
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mr-2 sm:mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        24/7 Support
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Round-the-clock assistance for all your queries
                      </p>
                    </div>
                  </li>
                </ul>
                <Button
                  className="bg-gradient-to-r from-amber-400 to-amber-600 hover:bg-amber-600/90 border border-amber-500/20 px-6 py-4 sm:px-8 sm:py-6 rounded-lg md:rounded-xl text-sm text-white"
                  size="lg"
                >
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialComponent/>

        {/* Contact Form */}
        <ContactForm/>
      </main>

      <Footer />
    </div>
  );
}