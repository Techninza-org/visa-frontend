"use client";

import React, { useState, useEffect } from 'react';
import { X, Check, Star } from 'lucide-react';
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
    <div className="w-full">
      <button
        onClick={handleRazorpayPayment}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            Processing...
          </>
        ) : (
          "Complete Payment"
        )}
      </button>
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  // const calculateSavings = (originalPrice, offerPrice) => {
  //   return originalPrice - offerPrice;
  // };

  // const calculateDiscountPercentage = (originalPrice, offerPrice) => {
  //   return Math.round(((originalPrice - offerPrice) / originalPrice) * 100);
  // };

  return (
    <div className="w-full">
      {/* Trigger Button */}
      <div className="w-full max-w-sm mx-auto">
        <button
          onClick={openModal}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
        >
         Pay Now
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200 px-8 py-6 flex justify-between items-center rounded-t-3xl">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">Choose Your Package</h2>
                <p className="text-gray-600">Select the perfect plan for your needs</p>
              </div>
              <button
                onClick={closeModal}
                className="p-3 hover:bg-gray-200 rounded-full transition-colors group"
              >
                <X className="w-6 h-6 text-gray-500 group-hover:text-gray-700" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
              <div className="p-8">
                {loading ? (
                  <div className="flex flex-col justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading packages...</p>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {packages.map((pkg, index) => (
                      <div
                        key={pkg._id}
                        className={`relative border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                          selectedPackage?._id === pkg._id
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl ring-4 ring-blue-100'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-lg bg-white'
                        }`}
                        onClick={() => handlePackageSelect(pkg)}
                        style={{
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        {/* Popular Badge */}
                        {pkg.name === 'Gold Plan' && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                              <Star className="w-4 h-4 fill-current" />
                              Most Popular
                            </div>
                          </div>
                        )}

                        {/* Selection Indicator */}
                        {selectedPackage?._id === pkg._id && (
                          <div className="absolute top-6 right-6 z-10">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full p-2 shadow-lg">
                              <Check className="w-5 h-5" />
                            </div>
                          </div>
                        )}

                        {/* Package Header */}
                        <div className="mb-8 pt-4">
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">{pkg.name}</h3>
                          {pkg.notes && (
                            <p className="text-gray-600 text-base leading-relaxed">{pkg.notes}</p>
                          )}
                        </div>

                        {/* Pricing */}
                        <div className="mb-8">
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-4xl font-bold text-gray-900">₹{pkg.price}</span>
                            <span className="text-gray-600 text-lg">/package</span>
                          </div>
                          
                          {/* Uncomment if you want to show discount pricing
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                              {calculateDiscountPercentage(pkg.price, pkg.offerPrice)}% OFF
                            </span>
                            <span className="text-sm text-gray-600">
                              Save ₹{calculateSavings(pkg.price, pkg.offerPrice)}
                            </span>
                          </div>
                          */}
                        </div>

                        {/* Features */}
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900 text-lg mb-4">What's included:</h4>
                          {pkg.points.map((point, index) => (
                            <div key={index} className="flex items-start gap-4">
                              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-full p-1.5 mt-1 flex-shrink-0">
                                <Check className="w-4 h-4 text-green-600" />
                              </div>
                              <span className="text-gray-700 text-base leading-relaxed">{point}</span>
                            </div>
                          ))}
                        </div>

                        {/* Selection Overlay */}
                        {selectedPackage?._id === pkg._id && (
                          <div className="absolute inset-0 border border-blue-500 rounded-2xl pointer-events-none"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Payment Section */}
                {selectedPackage && (
                  <div className="mt-12 border-t border-gray-200 pt-8">
                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8 shadow-inner">
                      <div className="max-w-md mx-auto">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-2xl font-bold text-gray-900">Order Summary</h3>
                        </div>
                        
                        <div className="space-y-4 mb-8">
                          <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <div>
                              <span className="text-gray-900 font-medium text-lg">{selectedPackage.name}</span>
                              <p className="text-gray-600 text-sm">Selected package</p>
                            </div>
                            <span className="font-bold text-xl text-gray-900">₹{selectedPackage.price}</span>
                          </div>
                          
                          {/* Uncomment if you want to show discount
                          <div className="flex justify-between text-green-600 font-medium">
                            <span>Package Discount</span>
                            <span>-₹{calculateSavings(selectedPackage.price, selectedPackage.offerPrice)}</span>
                          </div>
                          */}
                          
                          <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center">
                            <span className="text-xl font-bold text-gray-900">Total Amount</span>
                            <span className="text-3xl font-bold text-blue-600">₹{selectedPackage.price}</span>
                          </div>
                        </div>

                        <PaymentButton
                          currentUser={mockUser}
                          totalAmount={selectedPackage.price}
                          packageId={selectedPackage._id}
                          productId={productId}
                          selectedAddressId={mockSelectedAddressId}
                        />
                        
                        <p className="text-center text-gray-500 text-sm mt-4">
                          Secure payment powered by Razorpay
                        </p>
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