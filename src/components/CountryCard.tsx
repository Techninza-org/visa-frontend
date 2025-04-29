// components/CountryCard.tsx
import React from "react";
import Image from "next/image";

interface CountryCardProps {
  country: string;
  image: string;
  visaType: string;
  onClick: () => void;
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  image,
  visaType,
  onClick,
}) => (
  <div
    className="rounded-xl shadow-md overflow-hidden relative cursor-pointer bg-gradient-to-br from-amber-500/40 to-transparent backdrop-blur-lg border border-amber-500/10"
    onClick={onClick}
  >
    <Image
      src={image}
      alt={country}
      width={1000}
      height={500}
      className="w-full h-48 object-cover"
    />
    <button className="absolute top-3 left-3 bg-black bg-opacity-60 text-white px-3 py-1 text-sm rounded">
      Apply for {country} Visa
    </button>
    <div className="p-3">
      <h3 className="font-semibold text-">{country}</h3>
      <p className="text-sm text-gray-400">{visaType}</p>
    </div>
  </div>
);

export default CountryCard;
