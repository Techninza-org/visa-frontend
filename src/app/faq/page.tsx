"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Shield, Clock, CreditCard, Users, FileText, Phone } from 'lucide-react';
import Footer from '@/components/footer';
import Header from '@/components/header';
// import { Header } from '../header';

const FAQ_DATA = [
  {
    category: "General Questions",
    icon: <HelpCircle className="w-5 h-5" />,
    questions: [
      {
        id: "q1",
        question: "What services does Axe Visa Technology provide?",
        answer: "Axe Visa offers end-to-end visa assistance including document verification, visa form filling, appointment bookings, flight/hotel reservations, travel insurance, and personalized visa consultations."
      },
      {
        id: "q2", 
        question: "Which countries do you assist with?",
        answer: "We support visa applications for the UK, Schengen countries, USA, Canada, UAE, Australia, Japan, South Korea, and 100+ other destinations."
      },
      {
        id: "q3",
        question: "How do I get started with my visa application?",
        answer: "You can fill out our visa inquiry form on the website, or contact us via WhatsApp. Our team will assess your case and guide you through the next steps."
      }
    ]
  },
  {
    category: "Documentation & Eligibility",
    icon: <FileText className="w-5 h-5" />,
    questions: [
      {
        id: "q4",
        question: "What documents are required for a tourist visa?",
        answer: "Requirements vary by country, but typically include: Passport, Financial proof (bank statements, ITR), Travel itinerary, Accommodation & flight reservations, Cover letter & employment proof."
      },
      {
        id: "q5",
        question: "Can you help me prepare a cover letter or sponsor letter?",
        answer: "Yes! We provide professionally written cover letters, sponsor letters, and detailed itinerary documents as per embassy requirements."
      },
      {
        id: "q6",
        question: "I have a previous visa rejection. Can you still help?",
        answer: "Absolutely. We'll review your previous case, identify issues, and prepare a stronger application with detailed support."
      }
    ]
  },
  {
    category: "Appointments & Timeline",
    icon: <Clock className="w-5 h-5" />,
    questions: [
      {
        id: "q7",
        question: "Do you book visa appointments on my behalf?",
        answer: "Yes, we book embassy appointments and help you get earlier slots (subject to availability) through our priority booking team."
      },
      {
        id: "q8",
        question: "How long does the visa process take?",
        answer: "It depends on the destination and type of visa. For example: UK: 15–21 working days, Schengen: 10–15 working days, USA: Interview wait time + 5–7 days post interview. We'll give you an exact timeline when we review your case."
      },
      {
        id: "q9",
        question: "Can I apply for urgent or express visa services?",
        answer: "Yes, many embassies offer priority processing, and we can guide you through that. Additional fees may apply."
      }
    ]
  },
  {
    category: "Payments & Charges",
    icon: <CreditCard className="w-5 h-5" />,
    questions: [
      {
        id: "q10",
        question: "How much do your visa services cost?",
        answer: "Our pricing starts from: Basic: ₹4,999, Standard: ₹7,999, Premium: ₹9,999. Add-on services like insurance, bookings, or professional reviews are also available."
      },
      {
        id: "q11",
        question: "How do I pay for your services?",
        answer: "We accept UPI, bank transfers, credit/debit cards, and international payments. A payment link or invoice will be shared upon confirmation."
      }
    ]
  },
  {
    category: "Support & Communication",
    icon: <Phone className="w-5 h-5" />,
    questions: [
      {
        id: "q12",
        question: "Will I have a dedicated visa expert?",
        answer: "Yes. Every client is assigned a visa consultant who will handle your case from start to finish."
      },
      {
        id: "q13",
        question: "How can I track my visa application status?",
        answer: "You can use our client dashboard or WhatsApp updates to track your status in real time."
      },
      {
        id: "q14",
        question: "Do you offer support for business or student visas too?",
        answer: "Yes, we handle tourist, business, student, transit, and dependent visa categories."
      }
    ]
  },
  {
    category: "Safety & Reliability",
    icon: <Shield className="w-5 h-5" />,
    questions: [
      {
        id: "q15",
        question: "Are your bookings (flights/hotels) real and embassy-compliant?",
        answer: "Yes. We only provide verifiable flight and hotel bookings that are accepted by consulates."
      },
      {
        id: "q16",
        question: "Is my data safe with you?",
        answer: "Absolutely. All client information is kept secure and confidential. We never share or sell data."
      }
    ]
  },
  {
    category: "Additional Services",
    icon: <Users className="w-5 h-5" />,
    questions: [
      {
        id: "q17",
        question: "Which visas do you support?",
        answer: "We assist with a wide range of visa categories: tourist, business, student, work, dependent, medical, and conference visas for 100+ countries."
      },
      {
        id: "q18",
        question: "Can you help with eVisas and visa on arrival?",
        answer: "Yes. We guide you through eVisa applications and advise on visa on arrival eligibility and documentation."
      },
      {
        id: "q19",
        question: "What documents do you prepare for business/employment visas?",
        answer: "We assist with: Valid passport, Financial standing and contracts, Business purpose or skill documentation."
      },
      {
        id: "q20",
        question: "Do you offer a risk-checker or visa assessment?",
        answer: "Yes, our AI-driven Visa Risk Checker analyzes your profile against embassy criteria."
      },
      {
        id: "q21",
        question: "Do you service clients abroad?",
        answer: "Yes, we work remotely with international clients using encrypted channels."
      },
      {
        id: "q22",
        question: "What if my visa is delayed or denied?",
        answer: "We provide guidance for appeals, reapplication, and next steps."
      },
      {
        id: "q23",
        question: "Can I add services later?",
        answer: "Yes, you can add-on bookings, documents, or embassy services anytime."
      }
    ]
  }
];

export default function AxeVisaFAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredData = FAQ_DATA.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    selectedCategory === 'all' || 
    category.category === selectedCategory ||
    category.questions.length > 0
  );

  const categories = ['all', ...FAQ_DATA.map(cat => cat.category)];

  return (
    <>
      <Header />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 mt-18">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Get instant answers to your visa-related questions
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your question..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-white border-2 shadow-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Content */}
          <div className="space-y-8">
            {filteredData.map((category, categoryIndex) => (
              category.questions.length > 0 && (
                <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-600">
                        {category.icon}
                      </div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {category.category}
                      </h2>
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {category.questions.length} questions
                      </span>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {category.questions.map((item, index) => (
                      <div key={item.id} className="p-6">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200"
                        >
                          <h3 className="text-lg font-medium text-gray-900 pr-4">
                            {item.question}
                          </h3>
                          <div className="flex-shrink-0">
                            {openItems[item.id] ? (
                              <ChevronUp className="w-5 h-5 text-blue-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </button>
                        
                        {openItems[item.id] && (
                          <div className="mt-4 px-4">
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                              <p className="text-gray-700 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>

          {/* No Results */}
          {filteredData.every(category => category.questions.length === 0) && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                No questions found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or browse all categories
              </p>
            </div>
          )}

          {/* Contact Section */}
          {/* <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our visa experts are here to help you with personalized assistance for your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Contact via WhatsApp
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Schedule Consultation
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
       <Footer />
    </>
  );
}