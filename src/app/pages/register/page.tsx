"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    nationality: "",
    password: "",
  });

  const [countries, setCountries] = useState<any[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch countries data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/iso"
        );
        setCountries(response.data.data);
        setFilteredCountries(response.data.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search
  useEffect(() => {
    if (countrySearch.trim() === "") {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(countrySearch.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [countrySearch, countries]);

  const handleCountrySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountrySearch(e.target.value);
    setShowDropdown(true);
  };

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setForm({ ...form, nationality: country.name });
    setCountrySearch(country.name);
    setShowDropdown(false);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/public/user-register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.success) {
        alert(response.data.message || "Registration successful!");
        router.push("/pages/login");
      } else {
        alert(
          `Registration failed: ${response.data?.message || "Unknown error"}`
        );
      }
    } catch (error: any) {
      const responseData = error.response?.data;
      if (Array.isArray(responseData?.errors)) {
        alert(
          "Registration failed:\n" +
            responseData.errors.map((err: string) => `• ${err}`).join("\n")
        );
      } else if (responseData?.message) {
        alert(`Registration failed: ${responseData.message}`);
      } else {
        alert(`Registration failed: ${error.message || "Unknown error"}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px] mb-5">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-sm text-gray-300">
              Enter your details to register a new account
            </p>
          </div>
          <Card className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl mt-5">
            <CardHeader>
              <CardTitle className="text-white">Sign Up</CardTitle>
              <CardDescription className="text-gray-300">
                Fill in your details below
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {/* Full Name */}
              <div>
                <Label htmlFor="name" className="text-white mb-2">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-[#f6d365]"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-white mb-2">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-[#f6d365]"
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label htmlFor="phone" className="text-white mb-2">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-[#f6d365]"
                />
              </div>

              {/* Nationality Dropdown with Search */}
              <div className="relative">
                <Label htmlFor="nationality" className="text-white mb-2">
                  Nationality
                </Label>
                <div className="relative">
                  <Input
                    id="nationality"
                    name="nationality"
                    type="text"
                    value={countrySearch}
                    onChange={handleCountrySearch}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="Search and select your nationality"
                    className="bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-[#f6d365] pr-12"
                  />
                  {selectedCountry && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <img
                        src={`https://flagcdn.com/w40/${selectedCountry.Iso2.toLowerCase()}.png`}
                        className="w-6 h-4 rounded shadow"
                        alt={selectedCountry.name}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                {showDropdown && (
                  <div className="absolute z-50 w-full mt-1 bg-white/95 backdrop-blur-sm border border-white/20 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <div
                          key={country.Iso2}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 cursor-pointer text-gray-900 hover:text-white transition-colors"
                          onClick={() => handleCountrySelect(country)}
                        >
                          <img
                            src={`https://flagcdn.com/w40/${country.Iso2.toLowerCase()}.png`}
                            className="w-6 h-4 rounded shadow flex-shrink-0"
                            alt={country.name}
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjE2IiBmaWxsPSIjQ0NDIiByeD0iMiIvPgo8L3N2Zz4K';
                            }}
                          />
                          <span className="truncate text-gray-500">{country.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-gray-500 text-sm">
                        No countries found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-white mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:ring-2 focus:ring-[#f6d365]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#f6d365] to-[#fda085] text-black font-semibold hover:opacity-90 transition"
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </CardFooter>
          </Card>
          <p className="px-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/pages/login"
              className="underline underline-offset-4 text-[#f6d365] hover:text-[#fda085]"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}