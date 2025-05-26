"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Country {
  name: string;
  Iso2: string;
}

export default function LocationForm() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry1, setSelectedCountry1] = useState<Country | null>(
    null
  );
  const [selectedCountry2, setSelectedCountry2] = useState<Country | null>(
    null
  );
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [visaResult, setVisaResult] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/iso")
      .then((res) => setCountries(res.data.data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  const handleVisaCheck = async () => {
    const source = selectedCountry1?.Iso2;
    const destination = selectedCountry2?.Iso2;

    if (!source || !destination) {
      alert("Please select both countries.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/public/check-visa`,
        {
          source,
          destination,
        }
      );

      const result = response.data.requirement;
      setVisaResult(result);

      router.push(
        `/pages/detailspage?data=${encodeURIComponent(
          JSON.stringify(result)
        )}&source=${selectedCountry1?.name}&destination=${
          selectedCountry2?.name
        }`
      );
    } catch (error) {
      console.error("Error checking visa:", error);
      alert("Failed to check visa requirements.");
    }
  };

  const renderDropdown = (
    label: string,
    selected: Country | null,
    setSelected: (country: Country) => void,
    isOpen: boolean,
    setIsOpen: (val: boolean) => void,
    searchTerm: string,
    setSearchTerm: (val: string) => void
  ) => {
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="relative w-full">
        <label className="block mb-1">{label}</label>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-3 py-3 rounded-xl bg-yellow-500/5 shadow-lg border border-amber-500/50 hover:border-amber-500/30 cursor-pointer"
        >
          {selected ? (
            <div className="flex items-center gap-2">
              <img
                src={`https://flagcdn.com/w40/${selected.Iso2.toLowerCase()}.png`}
                className="w-6 h-4 rounded shadow"
                alt={selected.name}
              />
              <span>{selected.name}</span>
            </div>
          ) : (
            <span className="text-gray-800">Select Country</span>
          )}
          <span>▾</span>
        </div>
        {isOpen && (
          <div className="absolute z-50 mt-2 max-h-72 overflow-y-auto w-full bg-white border border-gray-300 rounded-xl shadow-lg">
            <input
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none placeholder-black"
            />
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, idx) => (
                <div
                  key={idx}
                  className="flex items-center px-4 py-2 gap-2 hover:bg-amber-100 cursor-pointer"
                  onClick={() => {
                    setSelected(country);
                    setIsOpen(false);
                    setSearchTerm(""); // Clear search after selection
                  }}
                >
                  <img
                    src={`https://flagcdn.com/w40/${country.Iso2.toLowerCase()}.png`}
                    className="w-6 h-4 rounded shadow"
                    alt={country.name}
                  />
                  <span>{country.name}</span>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-400">
                No countries found
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-gray-800 p-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col md:flex-row items-stretch md:items-end justify-between gap-4"
      >
        {renderDropdown(
          "Your Nationality",
          selectedCountry1,
          setSelectedCountry1,
          isOpen1,
          setIsOpen1,
          search1,
          setSearch1
        )}
        {renderDropdown(
          "Destination Country",
          selectedCountry2,
          setSelectedCountry2,
          isOpen2,
          setIsOpen2,
          search2,
          setSearch2
        )}
        <button
          type="button"
          onClick={handleVisaCheck}
          className="bg-amber-500 text-white px-8 py-2 rounded-xl shadow-md hover:bg-amber-600 transition-all duration-200 flex items-center gap-2 w-full"
          style={{ maxWidth: "150px", height: "50px" }}
        >
          Check Visa
        </button>
      </form>

      {visaResult && (
        <div className="mt-6 p-4 border border-green-400 bg-green-50 rounded-xl">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(visaResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
