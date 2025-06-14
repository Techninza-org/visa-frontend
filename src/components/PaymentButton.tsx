"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Star, Shield, Zap, Award, CreditCard, Lock, Users, Crown, Gem, Sparkles } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useRazorpayPayment } from "@/lib/useRazorpayPayment";

interface PaymentButtonProps {
  currentUser: string;
  totalAmount: number;
  productId: string;
  packageId: string;
  selectedAddressId: string;
}

const PaymentButton = ({
  currentUser,
  totalAmount,
  packageId,
  productId,
  selectedAddressId,
}: PaymentButtonProps) => {
  const router = useRouter();

  const { handleRazorpayPayment, isProcessing } = useRazorpayPayment({
    currentUser,
    totalAmount,
    packageId,
    productId,
    selectedAddressId,
    router,
  });

  return (
    <div className="w-full space-y-4">
      <button
        onClick={handleRazorpayPayment}
        disabled={isProcessing}
        className="group relative w-full bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 hover:from-emerald-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl hover:shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 overflow-hidden border border-white/20"
      >
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-4 right-8 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-3 left-12 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          {isProcessing ? (
            <>
              <div className="relative">
                <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-2 border-white/30"></div>
                <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-2 border-white border-t-transparent absolute inset-0"></div>
              </div>
              <span className="text-sm sm:text-base md:text-lg font-semibold">Processing Payment...</span>
            </>
          ) : (
            <>
              <div className="bg-white/20 rounded-full p-1 sm:p-2">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-sm sm:text-base md:text-lg font-bold">Pay Securely Now</span>
              <div className="bg-white/20 rounded-full p-1">
                <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </>
          )}
        </div>
      </button>
      
      {/* Trust indicators */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-green-500" />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="w-3 h-3 text-blue-500" />
          <span>Bank Grade Security</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Razorpay Protected</span>
        </div>
      </div>
    </div>
  );
};

interface PackageSelectionModalProps {
  productId: string;
}

const PackageSelectionModal = ({ 
  productId,
}: PackageSelectionModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Ref for the payment section to enable scrolling
  const paymentSectionRef = useRef(null);
  const modalContentRef = useRef(null);

  const token = Cookies.get('token');

  // Mock user data - replace with your actual user data
  const mockUser = {
    id: "user123",
    name: "John Doe",
    email: "john@example.com"
  };

  const mockSelectedAddressId = "address123";

  // Fetch packages
  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/public/get-packages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPackages(response.data.packages);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchPackages();
    }
  }, [isModalOpen]);

  // Auto-scroll to payment section when package is selected
  useEffect(() => {
    if (selectedPackage && paymentSectionRef.current && modalContentRef.current) {
      // Add a small delay to ensure the payment section is rendered
      setTimeout(() => {
        const modalContent = modalContentRef.current;
        const paymentSection = paymentSectionRef.current;
        
        if (modalContent && paymentSection) {
          // Calculate the position to scroll to
          const modalScrollTop = modalContent.scrollTop;
          const modalHeight = modalContent.clientHeight;
          const paymentSectionTop = paymentSection.offsetTop;
          const paymentSectionHeight = paymentSection.offsetHeight;
          
          // Calculate the scroll position to center the payment section in view
          const targetScrollTop = paymentSectionTop - (modalHeight / 2) + (paymentSectionHeight / 2);
          
          // Smooth scroll to the payment section
          modalContent.scrollTo({
            top: Math.max(0, targetScrollTop),
            behavior: 'smooth'
          });
        }
      }, 300); // 300ms delay to allow for animation
    }
  }, [selectedPackage]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    // The useEffect will handle the scrolling automatically
  };

  // Enhanced package styling with unique themes
  const getPackageTheme = (packageName, index) => {
    const name = packageName?.toLowerCase() || '';
    
    if (name.includes('gold') || name.includes('premium') || name.includes('pro')) {
      return {
        gradient: 'from-amber-400 via-yellow-500 to-orange-500',
        cardGradient: 'from-amber-50 via-yellow-50 to-orange-50',
        borderColor: 'border-amber-300',
        iconBg: 'from-amber-500 to-orange-600',
        icon: Crown,
        badge: 'Most Popular',
        badgeColor: 'from-amber-500 to-orange-600',
        glowColor: 'shadow-amber-500/25',
        accentColor: 'text-amber-600'
      };
    } else if (name.includes('silver') || name.includes('standard')) {
      return {
        gradient: 'from-slate-400 via-gray-500 to-zinc-600',
        cardGradient: 'from-slate-50 via-gray-50 to-zinc-50',
        borderColor: 'border-slate-300',
        iconBg: 'from-slate-500 to-zinc-600',
        icon: Gem,
        badge: 'Great Value',
        badgeColor: 'from-slate-500 to-zinc-600',
        glowColor: 'shadow-slate-500/25',
        accentColor: 'text-slate-600'
      };
    } else if (name.includes('diamond') || name.includes('enterprise')) {
      return {
        gradient: 'from-violet-400 via-purple-500 to-indigo-600',
        cardGradient: 'from-violet-50 via-purple-50 to-indigo-50',
        borderColor: 'border-violet-300',
        iconBg: 'from-violet-500 to-indigo-600',
        icon: Sparkles,
        badge: 'Premium',
        badgeColor: 'from-violet-500 to-indigo-600',
        glowColor: 'shadow-violet-500/25',
        accentColor: 'text-violet-600'
      };
    } else {
      // Default theme with rotation based on index
      const themes = [
        {
          gradient: 'from-blue-400 via-cyan-500 to-indigo-600',
          cardGradient: 'from-blue-50 via-cyan-50 to-indigo-50',
          borderColor: 'border-blue-300',
          iconBg: 'from-blue-500 to-indigo-600',
          icon: Star,
          badge: 'Popular Choice',
          badgeColor: 'from-blue-500 to-indigo-600',
          glowColor: 'shadow-blue-500/25',
          accentColor: 'text-blue-600'
        },
        {
          gradient: 'from-emerald-400 via-teal-500 to-green-600',
          cardGradient: 'from-emerald-50 via-teal-50 to-green-50',
          borderColor: 'border-emerald-300',
          iconBg: 'from-emerald-500 to-green-600',
          icon: Zap,
          badge: 'Best Seller',
          badgeColor: 'from-emerald-500 to-green-600',
          glowColor: 'shadow-emerald-500/25',
          accentColor: 'text-emerald-600'
        },
        {
          gradient: 'from-pink-400 via-rose-500 to-red-600',
          cardGradient: 'from-pink-50 via-rose-50 to-red-50',
          borderColor: 'border-pink-300',
          iconBg: 'from-pink-500 to-red-600',
          icon: Award,
          badge: 'Recommended',
          badgeColor: 'from-pink-500 to-red-600',
          glowColor: 'shadow-pink-500/25',
          accentColor: 'text-pink-600'
        }
      ];
      return themes[index % themes.length];
    }
  };

  return (
    <div className="w-full">
      {/* Stunning Trigger Button */}
      <div className="w-full max-w-sm mx-auto">
        <button
          onClick={openModal}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
        >
          Pay Now
        </button>
      </div>

      {/* Spectacular Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl max-h-[100vh] overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl animate-in zoom-in-95 duration-500 border border-white/20">
            
            {/* Gorgeous Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-slate-50/90 via-white/90 to-gray-50/90 backdrop-blur-xl border-b border-gray-200/50 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-xl md:shadow-2xl">
                      <Crown className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold sm:font-extrabold md:font-black text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text mb-1 sm:mb-2">
                      Choose Your Perfect Plan
                    </h2>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1 sm:p-2 hover:bg-red-50 rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-200 group border border-gray-200 hover:border-red-200"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-500 group-hover:text-red-500 group-hover:rotate-90 transition-all duration-200" />
                </button>
              </div>
            </div>

            {/* Stunning Modal Content */}
            <div 
              ref={modalContentRef}
              className="overflow-y-auto max-h-[calc(100vh-100px)] bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 scroll-smooth"
            >
              <div className="p-2 sm:p-4 md:p-6 lg:p-8">
                {loading ? (
                  <div className="flex flex-col justify-center items-center py-16 sm:py-24 md:py-32">
                    <div className="relative mb-4 sm:mb-6 md:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 border-blue-200 rounded-full animate-spin"></div>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute inset-0"></div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-4 border-purple-400 border-b-transparent rounded-full animate-spin absolute inset-2 sm:inset-3 md:inset-4"></div>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 mb-2 sm:mb-3 md:mb-4">Loading Amazing Plans...</h3>
                    <div className="flex gap-1 sm:gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {packages.map((pkg, index) => {
                      const theme = getPackageTheme(pkg.name, index);
                      const IconComponent = theme.icon;
                      const isSelected = selectedPackage?._id === pkg._id;
                      const isPopular = index === 1 || pkg.name?.toLowerCase().includes('gold');

                      return (
                        <div
                          key={pkg._id}
                          className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-1 ${
                            isSelected ? 'scale-[1.02] -translate-y-1' : ''
                          }`}
                          onClick={() => handlePackageSelect(pkg)}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {/* Card Container */}
                          <div className={`relative border-2 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 h-full ${
                            isSelected
                              ? `border-blue-400 bg-gradient-to-br ${theme.cardGradient} shadow-lg sm:shadow-xl md:shadow-2xl ring-2 sm:ring-3 md:ring-4 ring-blue-100`
                              : `${theme.borderColor} hover:border-blue-300 bg-white/80 backdrop-blur-sm hover:shadow-md sm:hover:shadow-lg ${theme.glowColor}`
                          }`}>
                            
                            {/* Popular Badge */}
                            {isPopular && (
                              <div className="absolute -top-4 sm:-top-5 md:-top-6 left-1/2 transform -translate-x-1/2 z-20">
                                <div className={`bg-gradient-to-r ${theme.badgeColor} text-white px-3 py-1 sm:px-4 sm:py-1 md:px-6 md:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2 shadow-lg sm:shadow-xl md:shadow-2xl border border-white`}>
                                  <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {theme.badge}
                                  <div className="w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                                </div>
                              </div>
                            )}

                            {/* Selection Indicator */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-6 md:right-6 z-10">
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full p-1 sm:p-2 md:p-3 shadow-lg sm:shadow-xl md:shadow-2xl ring-2 sm:ring-3 md:ring-4 ring-green-100 animate-bounce">
                                  <Check className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                                </div>
                              </div>
                            )}

                            {/* Package Icon */}
                            <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
                              <div className={`relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r ${theme.iconBg} rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-xl md:shadow-2xl`}>
                                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg sm:rounded-xl md:rounded-2xl"></div>
                              </div>
                            </div>

                            {/* Package Header */}
                            <div className="text-center mb-4 sm:mb-6 md:mb-8">
                              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold sm:font-extrabold md:font-black text-gray-900 mb-1 sm:mb-2 md:mb-3">{pkg.name}</h3>
                              {pkg.notes && (
                                <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed px-1 sm:px-2">{pkg.notes}</p>
                              )}
                            </div>

                            {/* Stunning Pricing */}
                            <div className="text-center mb-4 sm:mb-6 md:mb-8">
                              <div className="relative mb-2 sm:mb-3 md:mb-4">
                                <div className="flex items-center justify-center gap-1">
                                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold sm:font-extrabold md:font-black text-gray-900">₹{pkg.price}</span>
                                </div>
                                <p className="text-gray-500 text-sm sm:text-base md:text-lg mt-1 sm:mt-2">Complete Package</p>
                              </div>
                              
                              <div className={`inline-flex items-center gap-1 sm:gap-2 bg-gradient-to-r ${theme.cardGradient} border ${theme.borderColor} px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-bold shadow-md sm:shadow-lg`}>
                                <div className={`w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r ${theme.iconBg} rounded-full animate-pulse`}></div>
                                <span className={theme.accentColor}>Premium Features</span>
                              </div>
                            </div>

                            {/* Enhanced Features */}
                            <div className="space-y-2 sm:space-y-3 md:space-y-4">
                              <h4 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg text-center border-b border-gray-100 pb-2 sm:pb-3 mb-3 sm:mb-4 md:mb-6">
                                ✨ Package Includes
                              </h4>
                              <div className="space-y-2 sm:space-y-3">
                                {pkg.points.map((point, pointIndex) => (
                                  <div 
                                    key={pointIndex} 
                                    className="flex items-start gap-2 sm:gap-3 p-1 sm:p-2 md:p-3 rounded-lg sm:rounded-xl hover:bg-white/60 transition-all duration-200 group"
                                  >
                                    <span className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed font-medium">{point}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className={`absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r ${theme.cardGradient} blur-lg sm:blur-xl -z-10`}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Spectacular Payment Section */}
                {selectedPackage && (
                  <div 
                    ref={paymentSectionRef}
                    className="mt-8 sm:mt-12 md:mt-16 animate-in slide-in-from-bottom-8 duration-700"
                  >
                    <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-lg sm:shadow-xl md:shadow-2xl border border-white/20 relative overflow-hidden">
                      
                      {/* Background decoration */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl sm:rounded-2xl md:rounded-3xl"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                      
                      <div className="max-w-md sm:max-w-lg mx-auto relative z-10">
                        {/* Payment Header */}
                        <div className="text-center mb-6 sm:mb-8 md:mb-10">
                          <div className="relative inline-flex items-center justify-center mb-3 sm:mb-4 md:mb-6">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg sm:shadow-xl md:shadow-2xl">
                              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-md sm:shadow-lg animate-bounce">
                              <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold sm:font-extrabold md:font-black text-gray-900 mb-1 sm:mb-2 md:mb-3">Complete Your Order</h3>
                          <p className="text-gray-600 text-sm sm:text-base md:text-lg">You're one step away from premium features!</p>
                        </div>
                        
                        {/* Order Summary Card */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-md sm:shadow-lg md:shadow-xl border border-white/50 mb-4 sm:mb-6 md:mb-8">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md sm:shadow-lg">
                                <Crown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
                              </div>
                              <div>
                                <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">{selectedPackage.name}</h4>
                                <p className="text-gray-500 text-xs sm:text-sm">Premium Package</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl sm:text-2xl md:text-3xl font-bold sm:font-extrabold md:font-black text-gray-900">₹{selectedPackage.price}</div>
                              <p className="text-gray-500 text-xs sm:text-sm">Total Amount</p>
                            </div>
                          </div>
                        </div>

                        {/* Payment Button */}
                        <PaymentButton
                          currentUser={mockUser}
                          totalAmount={selectedPackage.price}
                          packageId={selectedPackage._id}
                          productId={productId}
                          selectedAddressId={mockSelectedAddressId}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageSelectionModal;