"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

/**
 * @typedef {Object} Country
 * @property {string} name - The name of the country.
 * @property {string} Iso2 - The ISO2 code of the country.
 */

export default function LocationForm() {
  const [countries, setCountries] = useState<{ name: string; Iso2: string }[]>(
    []
  );
  const [selectedCountry1, setSelectedCountry1] = useState(""); // name
  const [selectedCountry2, setSelectedCountry2] = useState(""); // name
  const [visaResult, setVisaResult] = useState<any>(null);

  const router = useRouter();

  // Fetch country list
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/iso")
      .then((res) => {
        setCountries(res.data.data); // Contains both name and Iso2
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  const handleVisaCheck = async () => {
    const source = countries.find((c) => c.name === selectedCountry1)?.Iso2;
    const destination = countries.find(
      (c) => c.name === selectedCountry2
    )?.Iso2;

    if (!source || !destination) {
      alert("Please select both countries.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/get-visa-requirements",
        {
          source,
          destination,
        }
      );
      setVisaResult(response.data.requirement);
      const result = response.data.requirement;
      router.push(
        `/pages/detailspage?data=${JSON.stringify(
          result
        )}&source=${selectedCountry1}&destination=${selectedCountry2}`
      );
      console.log("Visa Info:", response.data);
    } catch (error) {
      console.error("Error checking visa:", error);
      alert("Failed to check visa requirements.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-gray-800 p-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col md:flex-row items-stretch md:items-end justify-between gap-4"
      >
        <div className="flex flex-col flex-1 min-w-0">
          <select
            id="country1"
            className="px-3 py-3 rounded-xl bg-yellow-500/5 shadow-lg border border-amber-500/50 p-8 hover:border-amber-500/30 transition-all text-gray-800 w-full"
            value={selectedCountry1}
            onChange={(e) => setSelectedCountry1(e.target.value)}
          >
            <option value="">Your Passport</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <select
            id="country2"
            className="px-3 py-3 rounded-xl bg-yellow-500/5 shadow-lg border border-amber-500/50 p-8 hover:border-amber-500/30 transition-all text-gray-800 w-full"
            value={selectedCountry2}
            onChange={(e) => setSelectedCountry2(e.target.value)}
          >
            <option value="">Destination</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleVisaCheck}
          className="bg-amber-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-amber-600 transition-all"
        >
          Check Visa
        </button>
      </form>

      {visaResult && (
        <div className="mt-6 p-4 border border-green-400 bg-green-50 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">
            Visa Requirement Result
          </h3>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(visaResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
