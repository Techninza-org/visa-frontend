"use client";
import { useState } from "react";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function USVisaIndiaPassport() {
  const [activeTab, setActiveTab] = useState("tourist");

  const visaTypes = [
    { id: "tourist", name: "Tourist Visa" },
    { id: "business", name: "Business Visa" },
    { id: "student", name: "Student Visa" },
    { id: "work", name: "Work Visa" },
    { id: "transit", name: "Transit Visa" },
  ];

  const requirements = [
    "Original passport valid for at least 6 months",
    "Previous passports (if any)",
    "DS-160 confirmation page",
    "One photograph (5cm x 5cm, white background)",
    "Visa fee payment receipt",
    "Interview appointment letter",
  ];

  const processSteps = [
    {
      step: 1,
      title: "Complete DS-160 Form",
      description: "Fill out the online nonimmigrant visa application form",
    },
    {
      step: 2,
      title: "Pay Visa Fee",
      description: "Pay the non-refundable visa application fee",
    },
    {
      step: 3,
      title: "Schedule Interview",
      description: "Schedule your visa interview at the US Embassy",
    },
    {
      step: 4,
      title: "Prepare Documents",
      description: "Gather all required documents for your interview",
    },
    {
      step: 5,
      title: "Attend Interview",
      description: "Visit the embassy on your appointment date and time",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>US Visa for Indian Passport Holders | Abu Dhabi Embassy</title>
        <meta
          name="description"
          content="Apply for US visa from India through Abu Dhabi embassy. Get information on requirements, fees, and application process."
        />
      </Head>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              US Visa for Indian Passport Holders
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Applying through US Embassy in Abu Dhabi, United Arab Emirates
            </p>
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {visaTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={`px-4 py-2 rounded-md whitespace-nowrap ${
                      activeTab === type.id
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Visa Overview */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                US {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Visa
                Overview
              </h2>
              <p className="text-gray-600 mb-4">
                The United States {activeTab} visa allows Indian passport
                holders to visit the US for{" "}
                {activeTab === "tourist"
                  ? "tourism, vacation, or visiting family and friends"
                  : activeTab === "business"
                  ? "business meetings, conferences, or negotiations"
                  : activeTab === "student"
                  ? "academic studies at approved institutions"
                  : activeTab === "work"
                  ? "employment with a US-based company"
                  : "passing through the US to another destination"}
                .
              </p>
              <p className="text-gray-600">
                Indian citizens applying through the Abu Dhabi embassy typically
                receive visa decisions within 7-15 working days after the
                interview, depending on the visa type and individual
                circumstances.
              </p>
            </section>

            {/* Requirements */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Visa Requirements
              </h2>
              <ul className="space-y-3">
                {requirements.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Additional Requirements for{" "}
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Visa
                </h3>
                <p className="text-gray-600">
                  {activeTab === "tourist"
                    ? "Proof of sufficient funds, travel itinerary, and ties to India (employment, property, family)"
                    : activeTab === "business"
                    ? "Letter from employer, invitation from US company, and details of business activities"
                    : activeTab === "student"
                    ? "Form I-20, SEVIS fee receipt, academic transcripts, and proof of financial support"
                    : activeTab === "work"
                    ? "Approved petition (such as H1B, L1), labor certification, and employment contract"
                    : "Confirmed tickets to final destination and visa for that country (if required)"}
                </p>
              </div>
            </section>

            {/* Application Process */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Application Process
              </h2>
              <div className="space-y-6">
                {processSteps.map((step) => (
                  <div key={step.step} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold">
                        {step.step}
                      </div>
                      {step.step < processSteps.length && (
                        <div className="w-px h-full bg-gray-300"></div>
                      )}
                    </div>
                    <div className="pb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Documents required for submission:
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Mandatory Documents:
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>
                    Passport (valid for at least 6 months after the U.S. stay)
                  </li>
                  <li>DS-160 confirmation page</li>
                  <li>Application fee payment receipt</li>
                  <li>Appointment confirmation letter</li>
                  <li>Passport Photo (see Photo Requirements)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  Optional Documents:
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Bank statements</li>
                  <li>Employment/student proof</li>
                  <li>Travel Itinerary</li>
                  <li>Invitation Letter</li>
                  <li>Property ownership proof</li>
                  <li>Clear photos of you at tourist attractions</li>
                  <li>Old passports with stamps/visas</li>
                </ul>
              </div>

              <p className="text-gray-600 text-sm">
                <strong>This list is a starting point.</strong> We review each
                case and suggest extra documents to strengthen it.
              </p>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="py-2 text-gray-600 font-medium">
                        outbound service fees
                      </td>
                      <td className="py-2 text-right font-semibold">US$145</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-2 font-bold">Total</td>
                      <td className="py-2 text-right font-bold">US$145</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <a href="/pages/dashboard">
                <button className="mt-4 w-full bg-black text-white py-3 rounded-md hover:bg-gray-700 font-medium">
                  Apply Now
                </button>
              </a>

              <p className="text-gray-500 text-xs mt-2">
                By placing your order, you agree to outbound s privacy policy
                and terms of use.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Choose Package
              </h2>
              <p className="text-gray-600 mb-4">
                Wondering why we are priced higher? 😊
              </p>

              {/* Standard Package */}
              <div className="border border-gray-200 rounded-lg p-5 mb-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1">
                  Standard
                </h3>
                <p className="text-2xl font-bold text-blue-800 mb-3">US$680</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">💷</span>
                    <span>
                      <strong>Regular processing:</strong> More than 30 days
                      from travel date
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💸</span>
                    <span>
                      <strong>Unlimited consultations and revisions</strong>{" "}
                      with dedicated visa experts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💹</span>
                    <span>
                      <strong>Document review and verification</strong>, with
                      templates from successful cases
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💺</span>
                    <span>
                      <strong>Appointment scheduling</strong> at your local
                      consulate/visa center
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💻</span>
                    <span>
                      <strong>Mobile friendly intake forms</strong>
                    </span>
                  </li>
                </ul>
                <button className="mt-4 w-full border border-black text-black py-2 rounded-md hover:bg-blue-50 font-medium">
                  Select Standard
                </button>
              </div>

              {/* Premium Package */}
              <div className="border-2 border-blue-500 rounded-lg p-5 mb-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1">
                  Premium
                </h3>
                <p className="text-2xl font-bold text-blue-800 mb-3">US$980</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">💷</span>
                    <span>
                      Everything in Standard, <em>plus</em>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💸</span>
                    <span>
                      <strong>Express processing:</strong> Less than 30 days
                      from travel date
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💹</span>
                    <span>
                      <strong>Specialized support for complex cases</strong>{" "}
                      (previous visa refusals, domestic workers, other special
                      circumstances)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💹</span>
                    <span>
                      <strong>Mock interview</strong> for your U.S. Embassy
                      Interview
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💹</span>
                    <span>
                      <strong>Eligible for a 50% refund</strong> of our service
                      fees if your visa application is denied
                    </span>
                  </li>
                </ul>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-medium">
                  Select Premium
                </button>
              </div>

              {/* Schedule Appointments */}
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-1">
                  Schedule Appointments
                </h3>
                <p className="text-2xl font-bold text-blue-800 mb-3">US$145</p>
                <p className="text-gray-600 mb-3">
                  <strong>
                    Filled out your DS-160 and just looking for Interview
                    Appointments?
                  </strong>
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">💷</span>
                    <span>
                      Global team to monitor for earlier appointment slots
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💸</span>
                    <span>Reschedules missed interviews on your behalf</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💹</span>
                    <span>
                      Consular appointment services only, <strong>no</strong>
                    </span>
                  </li>
                </ul>
                <button className="mt-4 w-full border border-black text-black py-2 rounded-md hover:bg-blue-50 font-medium">
                  Select Appointment Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-7xl mx-auto space-y-4">
            {[
              {
                question: "How early should I apply for my US visa?",
                answer:
                  "We recommend applying at least 2-3 months before your intended travel date to account for processing times and potential delays.",
              },
              {
                question:
                  "Can I apply for a US visa while in UAE on a visit visa?",
                answer:
                  "Yes, Indian passport holders can apply for a US visa from Abu Dhabi even if they are in UAE on a visit visa, as long as they have legal status in the country.",
              },
              {
                question:
                  "What is the visa validity for Indian passport holders?",
                answer:
                  "US tourist and business visas for Indians are typically issued for 10 years with multiple entries. Student and work visas are issued for the duration of your program or employment.",
              },
              {
                question: "Do I need to submit my original documents?",
                answer:
                  "For the interview, you should bring original documents along with photocopies. The embassy may keep some documents but usually returns originals like passports and birth certificates.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
