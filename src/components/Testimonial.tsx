import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  nationality: string;
  nationalityFlag: string;
  destinationCountry: string;
  destinationFlag: string;
  testimonial: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Cécile Moreau",
    nationality: "French",
    nationalityFlag: "🇫🇷",
    destinationCountry: "Belgium",
    destinationFlag: "🇧🇪",
    testimonial: "An absolutely transformative experience! The cultural immersion was beyond my expectations and I felt welcomed from day one."
  },
  {
    name: "Tracy Mason",
    nationality: "American",
    nationalityFlag: "🇺🇸",
    destinationCountry: "Germany",
    destinationFlag: "🇩🇪",
    testimonial: "The support system was incredible throughout my journey. Every detail was carefully planned and executed perfectly."
  },
  {
    name: "Adrian Hudson",
    nationality: "American",
    nationalityFlag: "🇺🇸",
    destinationCountry: "Sweden",
    destinationFlag: "🇸🇪",
    testimonial: "A life-changing opportunity that opened doors I never knew existed. The experience exceeded all my expectations."
  },
  {
    name: "오예준",
    nationality: "South Korean",
    nationalityFlag: "🇰🇷",
    destinationCountry: "Netherlands",
    destinationFlag: "🇳🇱",
    testimonial: "Outstanding program with excellent guidance. The cultural exchange was enriching and professionally rewarding."
  },
  {
    name: "Leslie Shaw",
    nationality: "American",
    nationalityFlag: "🇺🇸",
    destinationCountry: "Canada",
    destinationFlag: "🇨🇦",
    testimonial: "Professional growth beyond imagination. The networking opportunities and cultural insights were invaluable."
  },
  {
    name: "前田 洋介",
    nationality: "Japanese",
    nationalityFlag: "🇯🇵",
    destinationCountry: "Portugal",
    destinationFlag: "🇵🇹",
    testimonial: "Exceptional experience with world-class support. Every aspect was thoughtfully organized and professionally managed."
  },
  {
    name: "आरुष गुप्ता",
    nationality: "Indian",
    nationalityFlag: "🇮🇳",
    destinationCountry: "Italy",
    destinationFlag: "🇮🇹",
    testimonial: "Incredible journey of personal and professional development. The cultural immersion was truly authentic."
  },
  {
    name: "Teresa de Fabra",
    nationality: "Spanish",
    nationalityFlag: "🇪🇸",
    destinationCountry: "Portugal",
    destinationFlag: "🇵🇹",
    testimonial: "Amazing opportunity that broadened my horizons significantly. The support team was exceptional throughout."
  },
  {
    name: "Jacek Miotke",
    nationality: "Polish",
    nationalityFlag: "🇵🇱",
    destinationCountry: "Switzerland",
    destinationFlag: "🇨🇭",
    testimonial: "The precision and quality of Swiss work culture has elevated my professional standards. This experience shaped my entire career trajectory."
  },
  {
    name: "梁荣",
    nationality: "Chinese",
    nationalityFlag: "🇨🇳",
    destinationCountry: "Portugal",
    destinationFlag: "🇵🇹",
    testimonial: "The warm Portuguese hospitality made my transition seamless. I've gained valuable international perspective and lifelong connections."
  },
  {
    name: "Brigid Courtenay",
    nationality: "Irish",
    nationalityFlag: "🇮🇪",
    destinationCountry: "Belgium",
    destinationFlag: "🇧🇪",
    testimonial: "Brussels opened up a world of European opportunities. The multicultural environment has enriched both my personal and professional life."
  },
  {
    name: "Thomas Olsen",
    nationality: "American",
    nationalityFlag: "🇺🇸",
    destinationCountry: "France",
    destinationFlag: "🇫🇷",
    testimonial: "Living in France has been a dream come true. The cultural richness and professional opportunities exceeded all my expectations."
  },
  {
    name: "Joséphine-Antoinette Prévost",
    nationality: "French",
    nationalityFlag: "🇫🇷",
    destinationCountry: "South Korea",
    destinationFlag: "🇰🇷",
    testimonial: "Korea's innovative technology sector provided incredible learning opportunities. The work ethic and dedication here are truly inspiring."
  },
  {
    name: "Cauã Porto",
    nationality: "Brazilian",
    nationalityFlag: "🇧🇷",
    destinationCountry: "Switzerland",
    destinationFlag: "🇨🇭",
    testimonial: "Swiss precision meets Brazilian creativity - the perfect combination for career growth. The quality of life here is unmatched."
  },
  {
    name: "Amanda Neehan",
    nationality: "Irish",
    nationalityFlag: "🇮🇪",
    destinationCountry: "Dubai",
    destinationFlag: "🇦🇪",
    testimonial: "Dubai's dynamic business environment has accelerated my career beyond imagination. The international exposure is invaluable."
  },
  {
    name: "Dr. Cathal Keeney",
    nationality: "Irish",
    nationalityFlag: "🇮🇪",
    destinationCountry: "Sweden",
    destinationFlag: "🇸🇪",
    testimonial: "Sweden's focus on work-life balance and innovation has transformed my approach to both career and life. Truly revolutionary."
  },
  {
    name: "pan Wojciech Celuch",
    nationality: "Polish",
    nationalityFlag: "🇵🇱",
    destinationCountry: "Belgium",
    destinationFlag: "🇧🇪",
    testimonial: "Belgium's central location in Europe has opened countless opportunities. The professional network I've built here is incredible."
  },
  {
    name: "福田 治",
    nationality: "Japanese",
    nationalityFlag: "🇯🇵",
    destinationCountry: "Sweden",
    destinationFlag: "🇸🇪",
    testimonial: "Swedish innovation culture combined with my Japanese background has created unique opportunities. The collaborative environment is exceptional."
  },
  {
    name: "пані Соломія Щербань",
    nationality: "Ukrainian",
    nationalityFlag: "🇺🇦",
    destinationCountry: "France",
    destinationFlag: "🇫🇷",
    testimonial: "France has provided not just career opportunities but a new perspective on life. The cultural depth and professional growth are remarkable."
  },
  {
    name: "Leandro Batista-Carvalho",
    nationality: "Portuguese",
    nationalityFlag: "🇵🇹",
    destinationCountry: "Australia",
    destinationFlag: "🇦🇺",
    testimonial: "Australia's laid-back culture with serious professional standards has been the perfect environment for my growth. Absolutely love it here."
  },
  {
    name: "傅建华",
    nationality: "Chinese",
    nationalityFlag: "🇨🇳",
    destinationCountry: "Portugal",
    destinationFlag: "🇵🇹",
    testimonial: "Portugal's strategic location and growing tech scene have provided amazing opportunities. The work-life balance is incredible."
  },
  {
    name: "김윤서",
    nationality: "South Korean",
    nationalityFlag: "🇰🇷",
    destinationCountry: "Japan",
    destinationFlag: "🇯🇵",
    testimonial: "Working in Japan has deepened my understanding of Asian business culture. The attention to detail and quality is inspiring."
  },
  {
    name: "Célina Jacques",
    nationality: "French",
    nationalityFlag: "🇫🇷",
    destinationCountry: "Portugal",
    destinationFlag: "🇵🇹",
    testimonial: "Portugal's emerging startup ecosystem has been perfect for my entrepreneurial ambitions. The support network here is fantastic."
  },
  {
    name: "Dorle auch Schlauchin",
    nationality: "German",
    nationalityFlag: "🇩🇪",
    destinationCountry: "New Zealand",
    destinationFlag: "🇳🇿",
    testimonial: "New Zealand's innovative approach to business and incredible natural beauty make it the perfect place for both career and life."
  },
  {
    name: "सिंह, आनन्द",
    nationality: "Indian",
    nationalityFlag: "🇮🇳",
    destinationCountry: "Italy",
    destinationFlag: "🇮🇹",
    testimonial: "Italy's rich culture and growing tech sector have provided the perfect blend of tradition and innovation for my career development."
  }
];

const TestimonialComponent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 150);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 150);
  };

  const goToTestimonial = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 150);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          What Our Global Community Says
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">
          Stories from professionals who transformed their careers internationally
        </p>
      </div>

      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        
        {/* Content */}
        <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            
            {/* Stars */}
            <div className="flex justify-center mb-4 sm:mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Testimonial text */}
            <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 text-center leading-relaxed mb-6 sm:mb-8 font-medium">
              "{current.testimonial}"
            </blockquote>

            {/* User info */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {current.name}
                </h3>
                <div className="flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base text-gray-600">
                  <span className="text-xl sm:text-2xl">{current.nationalityFlag}</span>
                  <span className="font-medium">{current.nationality}</span>
                  <span className="text-gray-400">→</span>
                  <span className="text-xl sm:text-2xl">{current.destinationFlag}</span>
                  <span className="font-medium">{current.destinationCountry}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevTestimonial}
                className="p-2 sm:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
                disabled={isAnimating}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-gray-800" />
              </button>

              {/* Dots indicator - only show on larger screens */}
              <div className="hidden sm:flex space-x-2">
                {testimonials.slice(0, 8).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? 'bg-blue-600 scale-110'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    disabled={isAnimating}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
                {testimonials.length > 8 && (
                  <span className="text-xs text-gray-500 self-center">+{testimonials.length - 8} more</span>
                )}
              </div>

              {/* Mobile indicator - show current/total */}
              <div className="sm:hidden text-sm text-gray-500">
                {currentIndex + 1} / {testimonials.length}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 sm:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
                disabled={isAnimating}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-gray-800" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Add a mobile-friendly swipe gesture area */}
      <div 
        className="sm:hidden w-full h-16 relative -mt-8"
        onTouchStart={(e) => {
          const touchX = e.touches[0].clientX;
          const handleTouchEnd = (e: TouchEvent) => {
            const diffX = e.changedTouches[0].clientX - touchX;
            if (Math.abs(diffX) > 50) {
              diffX > 0 ? prevTestimonial() : nextTestimonial();
            }
            document.removeEventListener('touchend', handleTouchEnd);
          };
          document.addEventListener('touchend', handleTouchEnd);
        }}
      />
    </div>
  );
};

export default TestimonialComponent;
