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
  const [selectedCountry1, setSelectedCountry1] = useState<Country | null>(null);
  const [selectedCountry2, setSelectedCountry2] = useState<Country | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  // State for dropdowns
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
      setLoader(true);
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
    setLoader(false);
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

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "selectedCountries",
        JSON.stringify({
          source: selectedCountry1?.name || "",
          destination: selectedCountry2?.name || "",
        })
      );
    }

    return (
      <div className="relative w-full">
        <label className="block mb-1 text-sm sm:text-base">{label}</label>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-3 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-yellow-500/5 shadow-md sm:shadow-lg border border-amber-500/50 hover:border-amber-500/30 cursor-pointer"
        >
          {selected ? (
            <div className="flex items-center gap-2 overflow-hidden">
              <img
                src={`https://flagcdn.com/w40/${selected.Iso2.toLowerCase()}.png`}
                className="w-5 h-3 sm:w-6 sm:h-4 rounded shadow"
                alt={selected.name}
                loading="lazy"
              />
              <span className="truncate text-sm sm:text-base">
                {selected.name}
              </span>
            </div>
          ) : (
            <span className="text-gray-800 text-sm sm:text-base">
              Select Country
            </span>
          )}
          <span className="text-sm sm:text-base">▾</span>
        </div>
        {isOpen && (
          <div className="absolute z-50 mt-1 sm:mt-2 max-h-60 sm:max-h-72 overflow-y-auto w-full bg-white border border-gray-300 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg">
            <input
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 sm:px-3 py-1 sm:py-2 border-b border-gray-300 focus:outline-none placeholder-gray-500 text-sm sm:text-base"
            />
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, idx) => (
                <div
                  key={idx}
                  className="flex items-center px-2 sm:px-4 py-1 sm:py-2 gap-2 hover:bg-amber-100 cursor-pointer"
                  onClick={() => {
                    setSelected(country);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <img
                    src={`https://flagcdn.com/w40/${country.Iso2.toLowerCase()}.png`}
                    className="w-5 h-3 sm:w-6 sm:h-4 rounded shadow"
                    alt={country.name}
                    loading="lazy"
                  />
                  <span className="text-sm sm:text-base">{country.name}</span>
                </div>
              ))
            ) : (
              <div className="p-2 sm:p-4 text-center text-gray-400 text-sm sm:text-base">
                No countries found
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-gray-800 p-2 sm:p-4">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-3 sm:gap-4"
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
          disabled={loader}
          className={`bg-amber-500 text-white px-4 sm:px-8 py-2 rounded-lg sm:rounded-xl shadow-md hover:bg-amber-600 transition-all duration-200 flex items-center justify-center gap-2 w-full sm:w-auto ${
            loader ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ minHeight: "44px", maxWidth: "none", sm: { maxWidth: "150px" } }}
        >
          {loader ? (
            <span className="text-sm sm:text-base">Checking...</span>
          ) : (
            <span className="text-sm sm:text-base">Check Visa</span>
          )}
        </button>
      </form>
    </div>
  );
}