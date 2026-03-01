import React, { createContext, useState, useEffect, useContext } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [savedCities, setSavedCities] = useState(() => {
    const localData = localStorage.getItem('savedCities');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
  }, [savedCities]);

  const addCity = (cityName) => {
    if (!savedCities.includes(cityName)) {
      setSavedCities([...savedCities, cityName]);
    }
  };

  const removeCity = (cityName) => {
    setSavedCities(savedCities.filter(city => city !== cityName));
  };

  return (
    <WeatherContext.Provider value={{ savedCities, addCity, removeCity }}>
      {children}
    </WeatherContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWeather = () => useContext(WeatherContext);