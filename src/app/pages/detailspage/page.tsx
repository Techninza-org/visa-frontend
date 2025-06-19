"use client";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
// import ExpertServices from "@/components/GetPackage";

function USVisaIndiaPassportContent() {
  const [activeTab, setActiveTab] = useState("tourist");
  const searchParams = useSearchParams();
  const [visaResult, setVisaResult] = useState<any>(null);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState("visa-required");
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

  // const requirements = [
  //   "Original passport valid for at least 6 months",
  //   "Previous passports (if any)",
  //   "DS-160 confirmation page",
  //   "One photograph (5cm x 5cm, white background)",
  //   "Visa fee payment receipt",
  //   "Interview appointment letter",
  // ];

  // FAQ Data
  const faqData = {
    "visa-required": [
      {
        q: "How early should I apply before my travel date?",
        a: "Ideally, 2–3 months in advance to accommodate embassy processing times and avoid delays.",
      },
      {
        q: "Do I need to visit the embassy in person?",
        a: "It depends on the country. For many visas, biometrics or interviews are required at an embassy or VFS/BLS/TLS center.",
      },
      {
        q: "Can I apply for my family together?",
        a: "Yes. We assist with group or family visa applications, ensuring documentation is aligned.",
      },
      {
        q: "What happens if I miss my visa appointment?",
        a: "We can help you reschedule, but repeated no-shows can impact your future applications.",
      },
      {
        q: "What if my visa is rejected?",
        a: "We analyze the reason for rejection and guide you through a stronger reapplication or alternative solution.",
      },
    ],
    "e-visa": [
      {
        q: "Is eVisa applicable for all passport holders?",
        a: "No. Eligibility depends on nationality and destination rules. We check your eligibility first.",
      },
      {
        q: "Can I apply eVisa urgently?",
        a: "Yes, many countries offer express or super express processing for an extra fee.",
      },
      {
        q: "What format should my documents be in?",
        a: "PDFs for passport and photos (JPG/PNG). We help resize or format them correctly.",
      },
      {
        q: "Do I need to print the eVisa?",
        a: "Yes, it's highly recommended to carry a physical printout along with a soft copy.",
      },
      {
        q: "Is eVisa valid for multiple entries?",
        a: "Some eVisas are single-entry only. We inform you of the rules for your selected country.",
      },
    ],
    "visa-on-arrival": [
      {
        q: "Will the visa be granted 100% at the airport?",
        a: "Not guaranteed. You must meet all entry conditions. We help you prepare properly.",
      },
      {
        q: "What if the visa fee is in a currency I don't have?",
        a: "Some countries accept USD, but not all. Always carry extra cash or check with us first.",
      },
      {
        q: "Can I stay as long as I want with visa on arrival?",
        a: "No. Stay durations are limited — typically 15 to 30 days.",
      },
      {
        q: "Is travel insurance required for visa on arrival?",
        a: "Some countries do require it. We recommend it in all cases.",
      },
      {
        q: "What if I don't have hotel booking proof?",
        a: "You may be denied entry. We can provide embassy-compliant bookings in advance.",
      },
    ],
    "visa-free": [
      {
        q: "Do I still need a passport to travel visa-free?",
        a: "Yes. Your passport must be valid for at least 6 months from the date of travel.",
      },
      {
        q: "Can I enter multiple times during visa-free stay?",
        a: "Some countries allow multiple entries; others don't. We help clarify rules for your destination.",
      },
      {
        q: "Is return flight mandatory?",
        a: "Many airlines and border officers ask for proof of return or onward travel.",
      },
      {
        q: "What if I want to extend my stay?",
        a: "In most visa-free countries, extensions are not allowed. You must exit and re-enter after a gap.",
      },
      {
        q: "Do I need travel insurance for visa-free travel?",
        a: "Not always mandatory, but strongly recommended. We offer visa-compliant policies instantly.",
      },
    ],
  };
  const requirements = [
    "Original passport with at least 6 months validity",
    "All previous passports (if available)",
    "Completed and signed visa application form",
    "Recent passport-sized photograph (as per specifications)",
    "Visa fee payment receipt or proof of payment",
    "Appointment confirmation or interview letter (if applicable)",
    "Proof of travel purpose (e.g., invitation letter, itinerary, hotel booking)",
    "Financial documents to prove sufficient funds",
    "Travel insurance covering the duration of stay (if required)",
    "Any additional documents required by the specific embassy or consulate",
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

  const renderFaqSection = () => {
    const faqCategories = [
      { id: "visa-required", name: "Visa Required", icon: "🔴" },
      { id: "e-visa", name: "eVisa Required", icon: "🌐" },
      { id: "visa-on-arrival", name: "Visa on Arrival", icon: "🛬" },
      { id: "visa-free", name: "Visa-Free", icon: "🟢" },
    ];

    return (
      <section className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200/50">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
            ❓
          </div>
          <h2 className="text-3xl font-bold text-slate-800">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600">Get answers to common visa questions</p>
        </div>

        {/* FAQ Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFaqCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeFaqCategory === category.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className="space-y-4">
          {faqData[activeFaqCategory]?.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenFaq(
                    openFaq === `${activeFaqCategory}-${index}`
                      ? null
                      : `${activeFaqCategory}-${index}`
                  )
                }
                className="w-full px-6 py-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors duration-200 flex justify-between items-center"
              >
                <span className="font-semibold text-slate-800">{faq.q}</span>
                <span
                  className={`transform transition-transform duration-200 ${
                    openFaq === `${activeFaqCategory}-${index}`
                      ? "rotate-180"
                      : ""
                  }`}
                >
                  ⌄
                </span>
              </button>
              {openFaq === `${activeFaqCategory}-${index}` && (
                <div className="px-6 py-4 bg-white border-t border-slate-200">
                  <p className="text-slate-700 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

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
              for {source} Passport Holders
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light">
              Premium visa application services through {source} Embassy
            </p>

            {renderVisaRequirementSection()}
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
                {/* Type-Specific Requirements */}
                {visaResult === "visa required" &&
                  [
                    "Visa application form",
                    "Appointment confirmation",
                    "Cover letter",
                    "Employment/student proof",
                    "Previous passports (if any)",
                    "Visa fee payment receipt",
                  ].map((item, index) => (
                    <div
                      key={`required-${index}`}
                      className="flex items-start p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
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

                {visaResult === "e-visa" &&
                  [
                    "Scanned passport copy",
                    "Digital photograph",
                    "Email ID for eVisa delivery",
                    "Credit card for payment",
                    "eVisa printout (after approval)",
                  ].map((item, index) => (
                    <div
                      key={`evisa-${index}`}
                      className="flex items-start p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
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

                {visaResult === "visa on arrival" &&
                  [
                    "Return/onward flight ticket",
                    "Visa fee in cash (correct currency)",
                    "Passport-size photos (quantity varies)",
                    "Local currency for expenses",
                    "Visa on arrival form (if applicable)",
                  ].map((item, index) => (
                    <div
                      key={`arrival-${index}`}
                      className="flex items-start p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
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

                {visaResult === "visa free" &&
                  [
                    "Return/onward flight ticket",
                    "Proof of sufficient funds",
                    "Hotel/accommodation details",
                    "Travel insurance (recommended)",
                    "Visa-free entry confirmation",
                  ].map((item, index) => (
                    <div
                      key={`free-${index}`}
                      className="flex items-start p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white mr-4 mt-1 flex-shrink-0">
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
                    {activeTab === "visaRequired"
                      ? "📋"
                      : activeTab === "eVisa"
                      ? "🌐"
                      : activeTab === "visaOnArrival"
                      ? "🛬"
                      : "🟢"}
                  </span>
                  Additional Notes for{" "}
                  {activeTab === "visaRequired"
                    ? "Visa Required"
                    : activeTab === "eVisa"
                    ? "eVisa"
                    : activeTab === "visaOnArrival"
                    ? "Visa on Arrival"
                    : "Visa-Free"}{" "}
                  Entry
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {activeTab === "visaRequired"
                    ? "Processing times vary by embassy (typically 15-30 days). Some countries require biometrics or interviews. We can help with appointment scheduling and document preparation."
                    : activeTab === "eVisa"
                    ? "eVisas typically process within 3-7 business days. Approval is at the discretion of immigration authorities. Always carry a printed copy of your eVisa approval."
                    : activeTab === "visaOnArrival"
                    ? "Visa on arrival is not guaranteed - you must meet all entry requirements. Have all documents organized for quick presentation at immigration. Fees must be paid in exact currency."
                    : "Even for visa-free entry, border officers may ask for proof of onward travel and sufficient funds. Maximum stay durations vary by country (typically 30-90 days)."}
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
            {renderFaqSection()}
          </div>

          {/* Premium Right Column */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200/50 h-fit sticky top-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                📎
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Visa Document Checklist
              </h2>
              <p className="text-slate-600">Reviewed & accepted worldwide</p>
            </div>

            <div className="space-y-6">
              {/* Mandatory Documents & Guidance Section */}
              {visaResult === "visa required" && (
                <>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 mb-6">
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
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 mb-6">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                      <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white mr-2">
                        🛡️
                      </span>
                      How Our Experts Help
                    </h4>
                    <ul className="list-disc pl-6 text-slate-700 space-y-2">
                      <li>
                        Review your nationality, travel history &amp; purpose
                      </li>
                      <li>
                        Evaluate your employment, finances &amp; past rejections
                        (if any)
                      </li>
                      <li>
                        Prepare a personalized visa checklist based on embassy
                        guidelines
                      </li>
                      <li>
                        Help you avoid over-documentation or missing papers
                      </li>
                      <li>Ensure 100% embassy-compliant submission</li>
                    </ul>
                  </div>
                </>
              )}

              {visaResult === "e-visa" && (
                <>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 mb-6">
                    <h3 className="font-bold text-green-800 mb-4 flex items-center">
                      <span className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white mr-2">
                        ✓
                      </span>
                      Mandatory Documents
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start text-slate-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        Scanned passport copy
                      </li>
                      <li className="flex items-start text-slate-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        Digital photograph
                      </li>
                      <li className="flex items-start text-slate-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        Email ID for eVisa delivery
                      </li>
                      <li className="flex items-start text-slate-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        Credit card for payment
                      </li>
                      <li className="flex items-start text-slate-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        eVisa printout (after approval)
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 mb-4">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                      <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white mr-2">
                        ⚙️
                      </span>
                      What We Do
                    </h4>
                    <ul className="list-disc pl-6 text-slate-700 space-y-2">
                      <li>Verify eligibility and country rules</li>
                      <li>Fill &amp; submit your eVisa application</li>
                      <li>Upload documents correctly</li>
                      <li>Track eVisa status</li>
                      <li>Send you the eVisa copy</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <h4 className="font-bold text-purple-800 mb-2 flex items-center">
                      <span className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white mr-2">
                        🔍
                      </span>
                      Tailored eVisa Guidance by Visa Experts
                    </h4>
                    <p className="text-slate-700 mb-2">
                      While eVisa seems simple, small errors can lead to
                      rejection. That’s why our experts provide precision-driven
                      assistance.
                    </p>
                    <ul className="list-disc pl-6 text-slate-700 space-y-2">
                      <li>
                        Confirm eVisa eligibility based on your nationality
                      </li>
                      <li>
                        Review your documents for correct size, clarity &amp;
                        format
                      </li>
                      <li>
                        Handle the entire eVisa application on your behalf
                      </li>
                      <li>Track approval status and keep you updated</li>
                      <li>
                        Share final approved eVisa with clear travel
                        instructions
                      </li>
                    </ul>
                  </div>
                </>
              )}

              {visaResult === "visa on arrival" && (
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-200 mb-6">
                  <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                    <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white mr-2">
                      💡
                    </span>
                    Important Notes
                  </h4>
                  <ul className="list-disc pl-6 text-slate-700 space-y-2">
                    <li>Entry may be denied if you lack any document</li>
                    <li>Queue times at immigration may vary</li>
                    <li>We recommend pre-arranged support</li>
                  </ul>
                </div>
              )}

              {visaResult === "visa free" && (
                <>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200 mb-6">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center">
                      <span className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white mr-2">
                        🟢
                      </span>
                      Entry Guidelines
                    </h4>
                    <ul className="list-disc pl-6 text-slate-700 space-y-2">
                      <li>Stay allowed: Up to 90 days (varies by country)</li>
                      <li>Passport must be valid at least 6 months</li>
                      <li>May need return flight ticket</li>
                      <li>Proof of accommodation (sometimes checked)</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                      <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white mr-2">
                        🧳
                      </span>
                      We Can Still Help You With
                    </h4>
                    <ul className="list-disc pl-6 text-slate-700 space-y-2">
                      <li>Travel insurance that covers COVID &amp; delays</li>
                      <li>Flight &amp; hotel bookings</li>
                      <li>
                        Visa-free entry confirmation letter (for airlines)
                      </li>
                      <li>Currency exchange &amp; airport pickup</li>
                    </ul>
                  </div>
                </>
              )}

              {/* Recommended Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white mr-2">
                    +
                  </span>
                  Recommended Documents
                </h3>
                <ul className="space-y-3">
                  {[
                    "Bank Statements (last 3–6 months)",
                    "Employment or Student Verification Letter",
                    "Travel Itinerary (flight and hotel bookings)",
                    "Invitation Letter (if applicable)",
                    "Property or Asset Proof (land, house, etc.)",
                    "Old Passports with Travel History",
                    "Proof of Ties to Home Country (family, job, studies)",
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

export default function USVisaIndiaPassport() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <USVisaIndiaPassportContent />
    </Suspense>
  );
}
