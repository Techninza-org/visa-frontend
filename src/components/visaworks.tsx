import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Create Your Account",
      description:
        "Sign up with your email or phone number and verify with a secure OTP. Your personal dashboard will be created instantly.",
    },
    {
      number: "2",
      title: "Select Your Destination & Visa Type",
      description:
        "Choose your nationality, destination country, and purpose of travel. We'll show you the exact visa requirements and processing time.",
    },
    {
      number: "3",
      title: "Upload Documents & Complete Form",
      description:
        "Fill out our simplified application form and upload the required documents. Our experts will review everything for accuracy.",
    },
    {
      number: "4",
      title: "Track Progress & Receive Updates",
      description:
        "Monitor your application in real-time through our dashboard. Receive email and SMS notifications at each step of the process.",
    },
  ];

  return (
    // <div className="bg-gray-50 w-full">
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-4">
        How Axe Visa Works
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-4xl text-lg mx-auto">
        Our streamlined process makes visa applications simple, transparent, and
        efficient.
      </p>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex items-start">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-600 text-white text-lg font-bold">
                {step.number}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{step.title}</h2>
              <p className="text-gray-600 mb-4">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default HowItWorks;
