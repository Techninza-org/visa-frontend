import Image from "next/image";
import React from "react";

const TrustedBy = () => {
  const companies = [
    { name: "Google", logo: "/google.png" },
    { name: "LinkedIn", logo: "/linkdin.png" },
    { name: "Uber", logo: "/uber.png" },
    { name: "Expedia", logo: "/expedia.png" },
    { name: "Alliance University ", logo: "/alliance.jpg" },
    { name: "Bennet University", logo: "/bannett.jpg" },
    { name: "SRM University’s ", logo: "/srm.png" },
    { name: "Nalanda University ", logo: "/nalanda.jpg" },
    { name: "Amazon", logo: "/amazon.png" },
    { name: "One Plus", logo: "/oneplus.png" },
    { name: "Udemy ", logo: "/udemy.jpg" },
    { name: " Amity University ", logo: "/amity-university.jpg" },

    { name: "Facebook", logo: "/fb.png" },
    { name: "Microsoft", logo: "/microsoft.png" },
    { name: "Salesforce", logo: "/salesforce.png" },
    { name: "Airbnb", logo: "/airbnb.png" },
    { name: "Oracle", logo: "/oracle.png" },
    { name: "Spotify", logo: "/shopify.png" },
    { name: "Adobe", logo: "/adobe.png" },
    { name: "Intel", logo: "/intel.png" },
    // { name: "Shopify", logo: "/shopify.png" },
    { name: "TravelX", logo: "/Tr.png" },
    { name: "World Travel Inc", logo: "/world-travel.png" },
  ];

  // Triple the companies array for truly seamless infinite loop
  const duplicatedCompanies = [...companies, ...companies, ...companies];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 overflow-hidden">
      <h1 className="text-2xl font-bold text-center mb-6">
       Trusted by Professionals from the World’s Leading Companies

      </h1>
      <p className="text-center mb-12 text-gray-600">
       Since 2018, our visa experts have been delivering personalized visa solutions to professionals from top global organizations—helping them travel, relocate, and work seamlessly across borders
      </p>

      {/* Infinite moving logos container */}
      <div className="relative overflow-hidden logo-container">
        <div className="flex items-center animate-scroll-left h-28">
          {duplicatedCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex-shrink-0 mx-6 flex items-center justify-center min-w-[120px]"
            >
              <div className="relative flex items-center h-28 w-32  transition-all duration-500">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={100}
                  height={32}
                  className="object-contain "
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add this to your global CSS or Tailwind config */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 25s linear infinite;
          width: max-content;
        }
        
        /* Ensure continuous movement without pause */
        .animate-scroll-left:hover {
          animation-play-state: running;
        }
        
        /* Optional: Add fade effect at edges */
        .logo-container::before,
        .logo-container::after {
          content: '';
          position: absolute;
          top: 0;
          width: 100px;
          height: 100%;
          z-index: 10;
          pointer-events: none;
        }
        
        .logo-container::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        
        .logo-container::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }
      `}</style>
    </div>
  );
};

export default TrustedBy;