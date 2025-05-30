"use client";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function USVisaIndiaPassport() {
  const [activeTab, setActiveTab] = useState("tourist");
  const searchParams = useSearchParams();
  const [visaResult, setVisaResult] = useState<any>(null);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [visaType, setVisaType] = useState<string>(""); // "e-visa", "visa-required", or number for visa-free


  

  const visaTypes = [
    {
      id: "tourist",
      name: "Tourist Visa",
      icon: "🏖️",
      duration: "Up to 10 years",
    },
    {
      id: "business",
      name: "Business Visa",
      icon: "💼",
      duration: "Up to 10 years",
    },
    {
      id: "student",
      name: "Student Visa",
      icon: "🎓",
      duration: "Program duration",
    },
    { id: "work", name: "Work Visa", icon: "🏢", duration: "3-5 years" },
    {
      id: "transit",
      name: "Transit Visa",
      icon: "✈️",
      duration: "Single entry",
    },
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
      duration: "30-45 minutes",
    },
    {
      step: 2,
      title: "Pay Visa Fee",
      description: "Pay the non-refundable visa application fee",
      duration: "5 minutes",
    },
    {
      step: 3,
      title: "Schedule Interview",
      description: "Schedule your visa interview at the ${source} embassy",
      duration: "10 minutes",
    },
    {
      step: 4,
      title: "Prepare Documents",
      description: "Gather all required documents for your interview",
      duration: "1-2 days",
    },
    {
      step: 5,
      title: "Attend Interview",
      description: "Visit the embassy on your appointment date and time",
      duration: "2-3 hours",
    },
  ];

  // const successStats = [
  //   { label: "Success Rate", value: "96.8%", icon: "✅" },
  //   { label: "Processing Time", value: "7-15 days", icon: "⏱️" },
  //   { label: "Applications Processed", value: "50,000+", icon: "📊" },
  //   { label: "Expert Support", value: "24/7", icon: "🎯" },
  // ];

  const expertServices = [
    {
      title: "Document Review",
      description:
        "Professional review of all your documents before submission",
      price: "$49",
      popular: false,
    },
    {
      title: "Interview Preparation",
      description: "One-on-one mock interview session with visa experts",
      price: "$99",
      popular: true,
    },
    {
      title: "Priority Processing",
      description: "Expedited application review and submission",
      price: "$149",
      popular: false,
    },
  ];

  // Function to render visa requirement section
  const renderVisaRequirementSection = () => {
    const isNumber = !isNaN(Number(visaResult));
    const router = useRouter();

    const handleClick = () => {
      const token = Cookies.get("token"); // replace 'token' with your actual cookie key

      if (token) {
        router.push("/pages/dashboard");
      } else {
        router.push("/pages/login");
      }
    };

    if (visaResult === "e-visa") {
      return (
        <section className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-8 text-white mb-10">
          <div className="text-center">
            {/* <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📱</span>
            </div> */}
            <h2 className="text-4xl font-bold mb-4">
              Electronic Visa Available
            </h2>
            <p className="text-xl mb-2 text-green-100">
              Great news! {destination} offers e-Visa for {source} passport
              holders
            </p>
            <p className="text-lg mb-8 text-green-100">
              Apply online from the comfort of your home - No embassy visit
              required!
            </p>

            {/* <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">⚡</div>
                <div className="font-bold text-lg">Quick Processing</div>
                <div className="text-green-100">2-5 business days</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">💳</div>
                <div className="font-bold text-lg">Online Payment</div>
                <div className="text-green-100">Secure & convenient</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">📧</div>
                <div className="font-bold text-lg">Email Delivery</div>
                <div className="text-green-100">Instant notification</div>
              </div>
            </div> */}

            <Button
              onClick={handleClick}
              className="bg-white text-green-600 hover:bg-green-50 px-12 py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Apply for e-Visa Now
            </Button>
          </div>
        </section>
      );
    }

    if (visaResult === "visa required") {
      return (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-8 text-white mb-10">
          <div className="text-center">
            {/* <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🏛️</span>
            </div> */}
            <h2 className="text-4xl font-bold mb-4">Visa Required</h2>
            <p className="text-xl mb-2 text-blue-100">
              {source} passport holders need a visa to visit {destination}
            </p>
            <p className="text-lg mb-8 text-blue-100">
              Let our experts handle your visa application process
              professionally
            </p>

            {/* <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">📋</div>
                <div className="font-bold text-lg">Document Prep</div>
                <div className="text-blue-100">Professional review</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-bold text-lg">Expert Guidance</div>
                <div className="text-blue-100">96.8% success rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-bold text-lg">Premium Service</div>
                <div className="text-blue-100">End-to-end support</div>
              </div>
            </div> */}

            <Button
              onClick={handleClick}
              className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Apply for Visa Now
            </Button>
          </div>
        </section>
      );
    }

    if (visaResult === "visa on arrival") {
      return (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-8 text-white mb-10">
          <div className="text-center">
            {/* <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🏛️</span>
            </div> */}
            <h2 className="text-4xl font-bold mb-4">visa on arrival</h2>
            <p className="text-xl mb-2 text-blue-100">
              {source} passport holders need a visa on arrival to visit{" "}
              {destination}
            </p>
            <p className="text-lg mb-8 text-blue-100">
              Let our experts handle your visa application process
              professionally
            </p>
            {/* 
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">📋</div>
                <div className="font-bold text-lg">Document Prep</div>
                <div className="text-blue-100">Professional review</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-bold text-lg">Expert Guidance</div>
                <div className="text-blue-100">96.8% success rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-bold text-lg">Premium Service</div>
                <div className="text-blue-100">End-to-end support</div>
              </div>
            </div> */}

            <Button
              onClick={handleClick}
              className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Apply for Visa Now
            </Button>
          </div>
        </section>
      );
    }

    if (visaResult === "visa free") {
      return (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-8 text-white mb-10">
          <div className="text-center">
            {/* <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🏛️</span>
            </div> */}
            <h2 className="text-4xl font-bold mb-4">visa free</h2>
            <p className="text-xl mb-2 text-blue-100">
              {source} passport holders no need a visa to visit {destination}
            </p>
            <p className="text-lg mb-8 text-blue-100">
              Let our experts handle your visa application process
              professionally
            </p>
            <Button
              onClick={handleClick}
              className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Apply for Visa Now
            </Button>
          </div>
        </section>
      );
    }

    if (isNumber && Number(visaResult) > 0) {
      return (
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white mb-10">
          <div className="text-center">
            {/* <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div> */}
            <h2 className="text-4xl font-bold mb-4">
              {" "}
              {visaResult} Visa-Free Travel!
            </h2>
            <p className="text-xl mb-2 text-purple-100">
              Excellent! {source} passport holders can visit {destination}{" "}
              without a visa
            </p>
            {/* <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 mb-8">
              <span className="text-5xl font-bold mr-4">{visaResult}</span>
              <div className="text-left">
                <div className="text-2xl font-bold"> Days</div>
                <div className="text-purple-100">Visa-free stay</div>
              </div>
            </div> */}

            {/* <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">✈️</div>
                <div className="font-bold text-lg">Just Fly</div>
                <div className="text-purple-100">No visa needed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">💰</div>
                <div className="font-bold text-lg">Save Money</div>
                <div className="text-purple-100">No visa fees</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl mb-2">⏰</div>
                <div className="font-bold text-lg">Save Time</div>
                <div className="text-purple-100">No processing wait</div>
              </div>
            </div> */}

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Important Reminders:</h3>
              <ul className="text-left text-purple-100 space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  Passport must be valid for at least 6 months
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  Maximum stay: {visaType} days per visit
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  Return ticket may be required at immigration
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-white rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  Sufficient funds proof may be requested
                </li>
              </ul>
            </div>

            {/* <Button className="bg-white text-purple-600 hover:bg-purple-50 px-12 py-4 text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Plan Your Trip Now
            </Button> */}
          </div>
        </section>
      );
    }

    return null;
  };
  useEffect(() => {
    const data = searchParams.get("data");
    const sourceParam = searchParams.get("source");
    const destinationParam = searchParams.get("destination");
    const visaTypeParam = searchParams.get("visaType"); // e-visa, visa-required, or number

    if (data) {
      try {
        setVisaResult(JSON.parse(data));
        setSource(sourceParam || "");
        setDestination(destinationParam || "");
        setVisaType(visaTypeParam || "");
      } catch (err) {
        console.error("Invalid JSON:", err);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 mt-20">
      <Head>
        <title>
          {destination} Visa for {source} Passport Holders | {source}
        </title>
        <meta
          name="description"
          content={`Apply for ${destination} visa through the ${source} embassy. Get information on requirements, fees, and application process.`}
        />
      </Head>

      <Header />

      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Trusted by 50,000+ successful applicants
            </div> */}

            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-white bg-clip-text text-transparent drop-shadow-lg tracking-tight text-center">
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-lg">
                {visaResult === "-1"
                  ? "You selected your own country"
                  : visaResult === "e-visa"
                  ? "Electronic Visa"
                  : visaResult === "visa required"
                  ? "Visa Required"
                  : visaResult === "visa on arrival"
                  ? "Visa on Arrival"
                  : visaResult === "visa free"
                  ? "Visa Free"
                  : "Visa"}{" "}
              </span>
              for {source} Holders
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light">
              Premium visa application services through {source} Embassy
            </p>

            {/* Premium Stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {successStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div> */}

            {renderVisaRequirementSection()}

            {/* Premium Visa Type Selection */}
            {/* <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
              <h3 className="text-lg font-semibold mb-4 text-blue-100">
                Select Your Visa Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {visaTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveTab(type.id)}
                    className={`p-4 rounded-xl transition-all duration-300 border-2 ${
                      activeTab === type.id
                        ? "bg-white text-slate-900 border-white shadow-lg transform scale-105"
                        : "bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="font-semibold text-sm">{type.name}</div>
                    <div className="text-xs opacity-75 mt-1">
                      {type.duration}
                    </div>
                  </button>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Dynamic Visa Requirement Section */}

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Premium Visa Overview */}
            <section className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold mr-4">
                  {visaTypes.find((v) => v.id === activeTab)?.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">
                    {destination}{" "}
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                    Visa
                  </h2>
                  <p className="text-slate-600">Premium application service</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                <p className="text-slate-700 text-lg leading-relaxed">
                  The {destination} {activeTab} visa allows {source} passport
                  holders to visit the {destination} for{" "}
                  {activeTab === "tourist"
                    ? "tourism, vacation, or visiting family and friends"
                    : activeTab === "business"
                    ? "business meetings, conferences, or negotiations"
                    : activeTab === "student"
                    ? "academic studies at approved institutions"
                    : activeTab === "work"
                    ? "employment with a there country-based company"
                    : `passing through the ${destination}   to another destination`}
                  .
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">
                    Processing Time
                  </h4>
                  <p className="text-green-700">
                    7–15 working days after interview
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Success Rate
                  </h4>
                  <p className="text-blue-700">
                    96.8% with our premium service
                  </p>
                </div>
              </div>
            </section>

            {/* Premium Requirements */}
            <section className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200/50">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white mr-4">
                  ✓
                </span>
                Visa Requirements
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {requirements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-slate-50 rounded-xl border border-slate-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-3">
                    {visaTypes.find((v) => v.id === activeTab)?.icon}
                  </span>
                  Additional Requirements for{" "}
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Visa
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {activeTab === "tourist"
                    ? "Proof of sufficient funds, travel itinerary, and ties to (employment, property, family)"
                    : activeTab === "business"
                    ? "Letter from employer, invitation, and details of business activities"
                    : activeTab === "student"
                    ? "Form I-20, SEVIS fee receipt, academic transcripts, and proof of financial support"
                    : activeTab === "work"
                    ? "Approved petition (such as H1B, L1), labor certification, and employment contract"
                    : "Confirmed tickets to final destination and visa for that country (if required)"}
                </p>
              </div>
            </section>

            {/* Premium Application Process */}
            <section className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200/50">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white mr-4">
                  📋
                </span>
                Application Process
              </h2>

              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <div key={step.step} className="relative">
                    <div className="flex items-start">
                      <div className="flex flex-col items-center mr-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center text-lg shadow-lg">
                          {step.step}
                        </div>
                        {index < processSteps.length - 1 && (
                          <div className="w-0.5 h-16 bg-gradient-to-b from-blue-300 to-purple-300 mt-4"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-slate-800">
                              {step.title}
                            </h3>
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Expert Services Section */}
            <section className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200/50">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white mr-4">
                  🎯
                </span>
                Expert Services
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {expertServices.map((service, index) => (
                  <div
                    key={index}
                    className={`relative rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl ${
                      service.popular
                        ? "border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    {service.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center">
                      <h3 className="text-xl font-bold text-slate-800 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="text-3xl font-bold text-slate-800 mb-4">
                        {service.price}
                      </div>
                      <Button
                        className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                          service.popular
                            ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                            : "bg-slate-800 hover:bg-slate-700 text-white"
                        }`}
                      >
                        Add Service
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials Section */}
            {/* <section className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200/50">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center text-white mr-4">
                  ⭐
                </span>
                Success Stories
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">
                          {testimonial.name}
                        </h4>
                        <p className="text-slate-600 text-sm">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">
                          ⭐
                        </span>
                      ))}
                    </div>

                    <p className="text-slate-700 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                ))}
              </div>
            </section> */}
          </div>

          {/* Premium Right Column */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200/50 h-fit sticky top-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                📄
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Document Checklist
              </h2>
              <p className="text-slate-600">Everything you need for success</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <h3 className="font-bold text-green-800 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white mr-2">
                    ✓
                  </span>
                  Mandatory Documents
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-slate-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    Passport (valid for at least 6 months after {source})
                  </li>
                  <li className="flex items-start text-slate-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    DS-160 confirmation page
                  </li>
                  <li className="flex items-start text-slate-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    Application fee payment receipt
                  </li>
                  <li className="flex items-start text-slate-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    Appointment confirmation letter
                  </li>
                  <li className="flex items-start text-slate-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    Passport Photo (see Photo Requirements)
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white mr-2">
                    +
                  </span>
                  Recommended Documents
                </h3>
                <ul className="space-y-3">
                  {[
                    "Bank statements",
                    "Employment/student proof",
                    "Travel Itinerary",
                    "Invitation Letter",
                    "Property ownership proof",
                    "Photos at tourist attractions",
                    "Old passports with stamps/visas",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-slate-700">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-4 border border-amber-200">
                <p className="text-amber-800 text-sm font-medium">
                  💡 <strong>Expert Tip:</strong> Our team reviews each case
                  individually and suggests additional documents to strengthen
                  your application.
                </p>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-800 mb-4">
                    Premium Service Pricing
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">
                        Visa Application Fee
                      </span>
                      <span className="font-semibold">$185</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">
                        Premium Service Fee
                      </span>
                      <span className="font-semibold">$145</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-xl text-slate-800">
                          $330
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a href="/pages/dashboard/client/applications">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Start Premium Application
                </Button>
              </a>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
                  <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </span>
                  <span className="text-sm font-medium">
                    100% Money-back Guarantee
                  </span>
                </div>
                <p className="text-slate-500 text-xs">
                  By placing your order, you agree to our privacy policy and
                  terms of use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
