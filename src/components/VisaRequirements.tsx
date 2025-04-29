"use client";
import { useState } from "react";

const countries = [
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Dubai", flag: "🇦🇪" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Turkey", flag: "🇹🇷" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "France", flag: "🇫🇷" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "USA", flag: "🇺🇸" },
  { name: "South Africa", flag: "🇿🇦" },
];

const countryDetails: { [key: string]: string } = {
  Malaysia: `
Passport:

Passport should be valid for at least 6 months from the date of departure from Malaysia.
Handwritten passport and passports valid for more than 10 years are not accepted.
Coloured scanned copy of the passport.

Travel Details

Flight Tickets
Copy of confirmed Arrival and Departure tickets.

Hotel Reservation

Copy of confirmed hotel reservation, including the hotel address, contact number, applicant's name, and reservation dates for the entire duration of travel.

Additional Information

Process Time
MDAC process time to apply is 48 Hours prior including arrival date
`,
  Dubai: `
Passport:
- Valid for 6 months.
- Clear scan required.

Travel:
- Round trip flight tickets.
- Hotel reservation.

Extras:
- Processing: 48 Hours
`,
};

export default function VisaRequirements() {
  const [selectedCountry, setSelectedCountry] = useState("Malaysia");

  return (
    <div className=" bg-yellow-500/5 p-8 hover:border-amber-500/30 transition-all text-gray-800 text-black mt-10 rounded-2xl border border-amber-500/30 shadow-md">
      <h1 className="text-5xl font-bold mb-6 text-center pt-20 text-black">
        Visa Requirements
      </h1>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex flex-col lg:flex-row gap-8">
        {/* Left - Selectors */}
        <div className="lg:w-1/2">
          <h2 className="text-lg font-semibold mb-4">Select a purpose:</h2>
          <div className="flex gap-4 mb-8">
            <button className="bg-black text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-opacity-80 transition">
              🧳 Tourism
            </button>
            <button className="bg-black text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-opacity-80 transition">
              💼 Business
            </button>
          </div>

          <h2 className="text-lg font-semibold mb-4">Select a country:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {countries.map((country) => (
              <button
                key={country.name}
                onClick={() => setSelectedCountry(country.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded border transition ${
                  selectedCountry === country.name
                    ? "bg-amber-100 border-amber-500 text-black font-semibold"
                    : "hover:bg-amber-50 border-transparent"
                }`}
              >
                <span>{country.flag}</span>
                {country.name}
              </button>
            ))}
          </div>

          <button className="mt-8 px-6 py-3 rounded bg-black text-white hover:bg-opacity-80 transition flex items-center justify-between gap-2 w-fit">
            🌍 & 98+ other countries →
          </button>
        </div>

        {/* Center divider */}
        <div className="hidden lg:block w-px bg-amber-500/30" />

        {/* Right - Visa Info Box */}
        <div className="lg:w-1/2 bg-yellow-500/10 border border-amber-500/30 p-6 rounded-xl max-h-[80vh] overflow-y-auto shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-black">
            Traveller Details
          </h3>
          <pre className="whitespace-pre-wrap leading-relaxed text-sm text-gray-800">
            {countryDetails[selectedCountry] || "Details coming soon..."}
          </pre>
        </div>
      </div>
    </div>
  );
}
