import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BackgroundWrapper = ({ children }) => {
  const [bgImageUrl, setBgImageUrl] = useState('');
  const location = useLocation();

  // Extract city name from URL if on the city route
  const cityName = location.pathname.includes('/city/')
    ? location.pathname.split('/city/')[1]
    : null;

  useEffect(() => {
    if (!cityName) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBgImageUrl('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2000');
      return;
    }

    const fetchCityImage = async () => {
      try {
        const API_KEY = import.meta.env.VITE_UNSPLASH_KEY;
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${cityName}&orientation=landscape&client_id=${API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setBgImageUrl(data.results[0].urls.regular);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchCityImage();
  }, [cityName]);

  return (
    <div
      className="relative min-h-screen bg-center bg-no-repeat bg-cover transition-all duration-700 ease-in-out"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <div className="absolute inset-0 bg-slate-900/60 z-0"></div>
      <div className="relative z-10 p-4 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;