import React from "react";

const AddOnServices = () => {
  const services = [
    {
      title: "✅ Professional Review",
      price: "₹3,999",
      description:
        "Comprehensive document evaluation by a visa expert with detailed, personalized feedback",
    },
    {
      title: "🛡️ Travel Insurance",
      price: "₹1,999",
      description:
        "Embassy-approved insurance plan offering complete coverage and peace of mind for your travel period",
    },
    {
      title: "📅 Appointment Booking",
      price: "₹2,999",
      description:
        "Hassle-free embassy/VFS appointment scheduling through our global expert team",
    },
    {
      title: "🏨 Hotel Reservations",
      price: "₹1,999",
      description:
        "Embassy-compliant hotel reservation confirmation strictly for visa submission purposes",
    },
    {
      title: "📝 Form-Filling Service",
      price: "₹2,999",
      description:
        "Professional assistance to complete visa forms with accuracy, ensuring embassy standards are met",
    },
    {
      title: "✈️ Flight Reservations",
      price: "₹1,999",
      description:
        "IATA-certified dummy tickets crafted specifically for visa application purposes",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-6">Popular Add-on Services</h1>
        <p className="mb-8">
          Need additional help? Add individual services as you need them -
          maximum flexibility, minimum commitment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="border rounded-xl p-6 hover:shadow-md transition-shadow bg-amber-50"
          >
            <h2 className="text-lg font-semibold mb-2">{service.title}</h2>
            <p className="text-xl font-bold text-yellow-600 mb-3">
              {service.price}
            </p>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddOnServices;
