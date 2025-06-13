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
        <label className="block mb-2 text-sm font-semibold text-gray-700 md:text-base">
          {label}
        </label>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center justify-between px-4 py-3 md:py-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg border-2 border-amber-200 hover:border-amber-300 hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {selected ? (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex-shrink-0 relative">
                <img
                  src={`https://flagcdn.com/w40/${selected.Iso2.toLowerCase()}.png`}
                  className="w-6 h-4 md:w-8 md:h-5 rounded shadow-md border border-gray-200"
                  alt={selected.name}
                  loading="lazy"
                />
              </div>
              <span className="truncate text-sm md:text-base font-medium text-gray-800">
                {selected.name}
              </span>
            </div>
          ) : (
            <span className="text-gray-500 text-sm md:text-base font-medium">
              Select Country
            </span>
          )}
          <div className="flex-shrink-0 ml-2">
            <svg
              className={`w-5 h-5 text-amber-600 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40 bg-black bg-opacity-20 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <div className="absolute z-50 mt-2 w-full bg-white border-2 border-gray-200 rounded-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-gray-400 text-sm md:text-base"
                    autoFocus
                  />
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Countries List */}
              <div className="max-h-64 md:max-h-80 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country, idx) => (
                    <div
                      key={idx}
                      className="flex items-center px-4 py-3 gap-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 cursor-pointer transition-all duration-200 border-b border-gray-50 last:border-b-0"
                      onClick={() => {
                        setSelected(country);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={`https://flagcdn.com/w40/${country.Iso2.toLowerCase()}.png`}
                          className="w-6 h-4 md:w-7 md:h-5 rounded shadow-sm border border-gray-200"
                          alt={country.name}
                          loading="lazy"
                        />
                      </div>
                      <span className="text-sm md:text-base text-gray-700 font-medium">
                        {country.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <div className="text-gray-400 mb-2">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <p className="text-sm md:text-base text-gray-500">No countries found</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8">
        {/* <div className="mb-6 md:mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Visa Requirements Checker
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Check visa requirements between countries instantly
          </p>
        </div> */}

        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-6 md:space-y-0"
        >
          {/* Mobile: Stacked Layout */}
          <div className="md:hidden space-y-6">
            {renderDropdown(
              "Your Nationality",
              selectedCountry1,
              setSelectedCountry1,
              isOpen1,
              setIsOpen1,
              search1,
              setSearch1
            )}
            
            {/* Swap Icon */}
            <div className="flex justify-center">
              <div className="bg-amber-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
            </div>

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
              className={`w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-4 rounded-xl shadow-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 font-semibold text-base ${
                loader ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loader ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking Requirements...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Check Visa
                </>
              )}
            </button>
          </div>

          {/* Desktop: Horizontal Layout */}
          <div className="hidden md:grid md:grid-cols-12 md:gap-6 md:items-end">
            <div className="col-span-5">
              {renderDropdown(
                "Your Nationality",
                selectedCountry1,
                setSelectedCountry1,
                isOpen1,
                setIsOpen1,
                search1,
                setSearch1
              )}
            </div>
            
            {/* Swap Icon */}
            <div className="col-span-2 flex justify-center pb-2">
              <div className="bg-amber-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
            </div>

            <div className="col-span-5">
              {renderDropdown(
                "Destination Country",
                selectedCountry2,
                setSelectedCountry2,
                isOpen2,
                setIsOpen2,
                search2,
                setSearch2
              )}
            </div>

            <div className="col-span-12 mt-6">
              <button
                type="button"
                onClick={handleVisaCheck}
                disabled={loader}
                className={`w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-4 rounded-xl shadow-lg hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 font-semibold text-lg ${
                  loader ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loader ? (
                  <>
                    <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking Requirements...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Check Visa 
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}