'use client';

import { useState, useEffect } from 'react';
import { FaShoppingBag, FaTimes, FaStar, FaGift, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';

interface BannerProps {
  autoplay?: boolean;
  interval?: number;
}

export default function Banner({ autoplay = true, interval = 5000 }: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDismissOptions, setShowDismissOptions] = useState(false);
  
  // Initialize isVisible based on localStorage directly
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem('userPreferences');
      if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        if (preferences.bannerDismissed) {
          setIsVisible(false);
        }
      }
    } catch (error) {
      console.error('Failed to load banner preferences:', error);
    }
  }, []);

  const bannerImages = [
    {
      src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      alt: 'Fashion collection',
      title: 'Summer Collection',
      subtitle: 'Get up to 30% off'
    },
    {
      src: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      alt: 'New arrivals',
      title: 'New Season Arrivals',
      subtitle: 'Discover the latest trends'
    },
    {
      src: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
      alt: 'Special offer',
      title: 'Limited Time Offer',
      subtitle: 'Free shipping on orders over $50'
    }
  ];

  // Handle automatic slideshow
  useEffect(() => {
    if (!autoplay || !isVisible) return;
    
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerImages.length);
    }, interval);
    
    return () => clearInterval(slideTimer);
  }, [autoplay, isVisible, interval, bannerImages.length]);

  // Function to handle permanently dismissing the banner
  const handlePermanentDismiss = () => {
    setIsVisible(false);
    try {
      const savedPreferences = localStorage.getItem('userPreferences');
      const preferences = savedPreferences ? JSON.parse(savedPreferences) : {};
      const updatedPreferences = { ...preferences, bannerDismissed: true };
      localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
    } catch (error) {
      console.error('Failed to save banner preferences:', error);
    }
  };

  // Function to handle temporary dismissal
  const handleTemporaryDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative overflow-hidden w-full h-[180px] sm:h-[220px] bg-black">
      {/* Banner Images */}
      {bannerImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 z-10 translate-x-0' 
              : index < currentSlide || (currentSlide === 0 && index === bannerImages.length - 1)
                ? 'opacity-0 -translate-x-full z-0' 
                : 'opacity-0 translate-x-full z-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-center"
            priority={index === 0}
          />
          
          {/* Banner Content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
            <div className="px-8 py-6 text-white animate-fadeInUp">
              <div className="flex items-center justify-center mb-3">
                <FaShoppingBag className="text-3xl mr-3 text-yellow-300 animate-pulse" />
                <FaStar className="text-xl mr-2 text-yellow-300" />
                <FaGift className="text-xl text-yellow-300" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-shadow-lg">
                {image.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-100 font-medium">
                {image.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Close Button */}
      <div className="absolute top-2 right-2 z-30">
        <button
          onClick={() => setShowDismissOptions(!showDismissOptions)}
          className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          aria-label="Close banner options"
        >
          <FaTimes className="text-sm" />
        </button>

        {/* Dismiss Options Dropdown */}
        {showDismissOptions && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-40 min-w-[200px]">
            <button
              onClick={handleTemporaryDismiss}
              className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
            >
              <FaEyeSlash className="mr-3 text-gray-500" />
              <div>
                <div className="font-medium">Hide for now</div>
                <div className="text-xs text-gray-500">Will show again on refresh</div>
              </div>
            </button>
            <button
              onClick={handlePermanentDismiss}
              className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center border-t transition-colors"
            >
              <FaTimes className="mr-3 text-gray-500" />
              <div>
                <div className="font-medium">Do not show again</div>
                <div className="text-xs text-gray-500">Permanently hide this banner</div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showDismissOptions && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowDismissOptions(false)}
        />
      )}
    </div>
  );
}
