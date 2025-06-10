"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown, Sparkles } from "lucide-react";

type Package = {
  _id: string;
  name: string;
  price: number;
  offerPrice: number;
  points: string[];
  notes?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type PackageResponse = {
  success: boolean;
  packages: Package[];
};

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const ExpertServices: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
    const router = useRouter();
    // Function to handle button click


   const handleClick = () => {
      const token = Cookies.get("token"); // replace 'token' with your actual cookie key

      if (token) {
        router.push("/pages/dashboard");
      } else {
        router.push("/pages/login");
      }
    };

  useEffect(() => {
    setLoading(true);
    axios
      .get<PackageResponse>(`${process.env.NEXT_PUBLIC_API_URL}/public/get-packages`)
      .then((res) => {
        if (res.data.success) {
          setPackages(res.data.packages);
        }
      })
      .catch((err) => {
        console.error("Error fetching packages:", err);
      })
      .finally(() => setLoading(false));
  }, []);



  const getPackageIcon = (index: number) => {
    switch (index) {
      case 0: return <Zap className="w-5 h-5" />;
      case 1: return <Crown className="w-5 h-5" />;
      case 2: return <Sparkles className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getPackageGradient = (index: number) => {
    switch (index) {
      case 0: return "from-blue-500 via-purple-500 to-pink-500";
      case 1: return "from-amber-400 via-orange-500 to-red-500";
      case 2: return "from-emerald-400 via-teal-500 to-cyan-500";
      default: return "from-slate-500 to-slate-600";
    }
  };

  const getCardGradient = (index: number) => {
    switch (index) {
      case 0: return "from-blue-50/80 via-purple-50/60 to-pink-50/80";
      case 1: return "from-amber-50/80 via-orange-50/60 to-red-50/80";
      case 2: return "from-emerald-50/80 via-teal-50/60 to-cyan-50/80";
      default: return "from-slate-50 to-slate-100";
    }
  };

  const getBorderGradient = (index: number) => {
    switch (index) {
      case 0: return "from-blue-200 via-purple-200 to-pink-200";
      case 1: return "from-amber-200 via-orange-200 to-red-200";
      case 2: return "from-emerald-200 via-teal-200 to-cyan-200";
      default: return "from-slate-200 to-slate-300";
    }
  };

  if (loading) {
    return (
      <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-slate-200/50">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded-lg w-64 mb-8"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-slate-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white/80 backdrop-blur-sm rounded-3xl  p-8 border border-slate-200/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-blue-50/30 pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl mb-6 shadow-lg">
            <span className="text-2xl">🎯</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Packages Services
          </h2>
          {/* <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Choose the perfect plan that fits your needs and unlock professional expertise
          </p> */}
        </header>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={pkg._id}
              className={`relative group transition-all duration-500 hover:scale-105 hover:-translate-y-2 flex flex-col ${
                index === 0 ? 'md:scale-105 z-10' : ''
              }`}
            >
              {/* Popular badge - show for first package */}
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`bg-gradient-to-r ${getPackageGradient(index)} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2`}>
                    <Crown className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`relative rounded-3xl p-6 border-2 bg-gradient-to-br ${getCardGradient(index)} border-transparent bg-clip-padding shadow-xl group-hover:shadow-2xl transition-all duration-300 flex-1 flex flex-col`}>
                {/* Gradient border effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${getBorderGradient(index)} p-[2px] -z-10`}>
                  <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${getCardGradient(index)}`}></div>
                </div>

                {/* Package header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${getPackageGradient(index)} rounded-xl mb-4 text-white shadow-lg`}>
                    {getPackageIcon(index)}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{pkg.name}</h3>
                </div>

                {/* Features list */}
                <div className="mb-8 flex-1">
                  <ul className="space-y-3">
                    {pkg.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700">
                        <div className={`flex-shrink-0 w-5 h-5 bg-gradient-to-r ${getPackageGradient(index)} rounded-full flex items-center justify-center mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  {/* <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg text-slate-500 line-through font-medium">
                      ₹{pkg.price.toLocaleString()}
                    </span>
                    <span className={`text-xs font-bold px-2 py-1 bg-gradient-to-r ${getPackageGradient(index)} text-white rounded-full`}>
                      {Math.round(((pkg.price - pkg.offerPrice) / pkg.price) * 100)}% OFF
                    </span>
                  </div> */}
                  <div className="text-4xl font-black text-slate-800 mb-1">
                    ₹{pkg.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600">
                    One-time payment
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={()=>handleClick()}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl bg-gradient-to-r ${getPackageGradient(index)} text-white border-0 relative overflow-hidden group`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Add Service
                    {/* <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                      →
                    </div> */}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Button>

                {/* Notes if available */}
                {/* {pkg.notes && (
                  <div className="mt-4 p-3 bg-slate-100/50 rounded-lg border border-slate-200/50">
                    <p className="text-xs text-slate-600 text-center italic">
                      {pkg.notes}
                    </p>
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertServices;
