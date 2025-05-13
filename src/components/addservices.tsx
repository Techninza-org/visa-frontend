import React from "react";

const AddOnServices = () => {
  const services = [
    {
      title: "Professional Review",
      price: "US$99",
      description:
        "Expert advisor thoroughly reviews your application and provides personalized guidance for success",
    },
    {
      title: "Travel Insurance",
      price: "US$25",
      description:
        "Complete peace of mind with comprehensive coverage that meets all embassy requirements",
    },
    {
      title: "Appointment Booking",
      price: "US$49",
      description:
        "Our global team monitors and secures the earliest available embassy appointment slots for you",
    },
    {
      title: "Hotel Reservations",
      price: "US$75",
      description:
        "Real, verifiable hotel booking confirmations that meet embassy requirements",
    },
    {
      title: "Form-filling Service",
      price: "US$99",
      description:
        "Professional assistance with your visa application forms, ensuring accuracy and completeness",
    },
    {
      title: "Flight Reservations",
      price: "US$75",
      description:
        "IATA-certified flight booking confirmations required by many embassies",
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
