import React from "react";
// import Image from "next/image";

const TrustedBy = () => {
  const companies = [
    { name: "Facebook", logo: "/facebooklogo.webp" },
    { name: "LinkedIn", logo: "/LinkedIn_logo_initials.png" },
    { name: "Equinix", logo: "/logos/equinix.svg" },
    { name: "Google", logo: "/Google_Icons-09-512.webp" },
    { name: "BCC", logo: "/logos/bcc.svg" },
    { name: "Expedia", logo: "/logos/expedia.svg" },
    { name: "OnePlus", logo: "/oneplus.png" },
    // Duplicates as shown in your screenshot
    // { name: "Equinix", logo: "/logos/equinix.svg" },
    // { name: "Google", logo: "/logos/google.svg" },
    // { name: "BCC", logo: "/logos/bcc.svg" },
    // { name: "Expedia", logo: "/logos/expedia.svg" },
    // { name: "OnePlus", logo: "/logos/oneplus.svg" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-center mb-6">
        Trusted by professionals from leading companies
      </h1>
      <p className="text-center mb-12">
        Our advisors have helped employees from these organizations with their
        visa needs
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
        {companies.map((company, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative h-12 w-32 mb-2">
              <img
                src={company.logo}
                alt={company.name}
                width={50}
                className="object-contain"
              />
            </div>
            {/* <span className="text-sm text-gray-600">{company.name}</span> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustedBy;
