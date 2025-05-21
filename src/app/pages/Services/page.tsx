"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { ShieldCheck, Clock, Globe2, Users } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Tourist Visa Assistance",
    desc: "Get quick and hassle-free visa processing for travel across 98+ countries. Our experts ensure all documents meet embassy standards.",
  },
  {
    title: "Business Visa Services",
    desc: "Apply for short or long-term business visas with guidance on invitation letters, financial proofs, and faster processing routes.",
  },
  {
    title: "Passport Application & Renewal",
    desc: "We handle new passport applications, renewals, and damaged/lost passport replacements across India with doorstep documentation.",
  },
  {
    title: "Student Visa Support",
    desc: "We assist Indian students in applying to universities abroad with proper student visa documentation and embassy interview preparation.",
  },
];

const additionalservices = [
  {
    title: "Travel Insurance",
    desc: "Protect your travel plans with our comprehensive insurance packages covering medical emergencies, trip cancellations, and more.",
  },
  {
    title: "Acoommodation Booking",
    desc: "We help you find the best accommodation options worldwide, from hotels to hostels, ensuring a comfortable stay.",
  },
  {
    title: "Flight Booking",
    desc: "Book your flights with us for the best deals and personalized service, ensuring a smooth travel experience.",
  },
];

const stats = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-amber-500" />,
    label: "Approval Rate",
    value: "98.7%",
  },
  {
    icon: <Clock className="h-8 w-8 text-amber-500" />,
    label: "Avg. Processing Time",
    value: "48 Hours",
  },
  {
    icon: <Globe2 className="h-8 w-8 text-amber-500" />,
    label: "Countries Covered",
    value: "100+",
  },
  {
    icon: <Users className="h-8 w-8 text-amber-500" />,
    label: "Happy Clients",
    value: "25,000+",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white text-black min-h-screen">
      <Header />
      <section className="max-w-7xl mx-auto px-6 py-20 mt-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Complete visa and passport solutions trusted by thousands of
            travelers, students, and professionals across India.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-gray-50 p-6 rounded-xl border border-amber-300 hover:shadow-md transition"
            >
              <h3 className="text-2xl font-semibold text-amber-600 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-700">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-24 mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Additional services
          </h1>
          {/* <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Complete visa and passport solutions trusted by thousands of
            travelers, students, and professionals across India.
          </p> */}
        </div>

        {/* Additional services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {additionalservices.map((service) => (
            <Link key={service.title} href={service.link || "#"}>
              <div className="bg-gray-50 p-6 rounded-xl border border-amber-300 hover:shadow-md transition cursor-pointer">
                <h3 className="text-2xl font-semibold text-amber-600 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-amber-600 mb-6">
            Why People Trust AXE Visa Technology
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center bg-gray-100 p-6 rounded-xl border border-gray-200"
              >
                {stat.icon}
                <p className="text-2xl font-bold mt-2 text-black">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
