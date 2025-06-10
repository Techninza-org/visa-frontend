"use client";

import React, { useState } from "react";
import CountryCard from "@/components/CountryCard";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const visaData = [
  {
    country: "Australia",
    category: "Instant",
    image: "/australia.jpeg",
    visaType: "Visa issued on arrival",
  },
  {
    country: "Belgium",
    category: "Instant",
    image: "/belgium.jpeg",
    visaType: "Visa issued on arrival",
  },
  {
    country: "Bulgaria",
    category: "Instant",
    image: "/bulgaria.jpeg",
    visaType: "Visa issued on arrival",
  },
  {
    country: "Canada",
    category: "In a month",
    image: "/canada.jpeg",
    visaType: "Visa issued on arrival",
  },
  {
    country: "China",
    category: "In a week",
    image: "/china.jpeg",
    visaType: "Visa issued in a week",
  },
  {
    country: "Combodia",
    category: "In a week",
    image: "/combodia.jpeg",
    visaType: "Visa issued in a week",
  },
];

const VisaPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const router = useRouter();

    const handleClick = () => {
      const token = Cookies.get("token"); // replace 'token' with your actual cookie key

      if (token) {
        router.push("/pages/dashboard");
      } else {
        router.push("/pages/login");
      }
    };

  const filteredData =
    selectedFilter === "All"
      ? visaData.slice(0, 3)
      : visaData.filter((item) => item.category === selectedFilter).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 mt-10">
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent pb-5">
        Trending Visas
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-10 mt-16">
        {["All", "Instant", "In a week", "In a month"].map((filter) => (
          <Button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 border border-amber-400 ${
              selectedFilter === filter
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-amber-50"
            }`}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Country Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.map((item) => (
          <CountryCard
            key={item.country}
            country={item.country}
            image={item.image}
            visaType={item.visaType}
            onClick={() => handleClick()}
          />
        ))}
      </div>
    </div>
  );
};

export default VisaPage;
