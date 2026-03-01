import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CurrentWeatherHero from '../components/CurrentWeatherHero';
import { processForecastData } from '../utils/formatForecast';
import { useWeather } from '../context/WeatherContext';
import { Bookmark, BookmarkCheck } from 'lucide-react';

const CityWeather = () => {
  const { cityName } = useParams(); 
  const { savedCities, addCity, removeCity } = useWeather();
  
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSaved = savedCities.includes(cityName.toLowerCase());

  const toggleSave = () => {
    isSaved ? removeCity(cityName.toLowerCase()) : addCity(cityName.toLowerCase());
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      setError(null); 
      
      try {
        const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
        
        const [currentRes, forecastRes] = await Promise.all([
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`),
          fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`)
        ]);

        if (!currentRes.ok || !forecastRes.ok) {
          throw new Error(`We couldn't find a city named "${cityName}". Please check your spelling.`);
        }

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();
        const cleanForecast = processForecastData(forecastData.list);

        setCurrentWeather(currentData);
        setForecast(cleanForecast);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchWeatherData();
  }, [cityName]); 

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="w-12 h-12 border-t-4 border-b-4 border-cyan-400 rounded-full animate-spin"></div>
        <p className="mt-6 text-lg font-medium text-white animate-pulse">Fetching weather for {cityName}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md p-8 mx-auto mt-20 text-center border bg-red-500/10 border-red-500/50 rounded-3xl backdrop-blur-md">
        <h2 className="mb-2 text-3xl font-bold text-red-400">Oops!</h2>
        <p className="text-lg text-slate-200">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-16 w-full max-w-4xl mx-auto">
      <div className="flex justify-end pt-4">
        <button 
          onClick={toggleSave}
          className="flex items-center gap-2 px-4 py-2 text-white transition-colors border border-white/20 rounded-full bg-slate-900/50 hover:bg-slate-800/80 backdrop-blur-md"
        >
          {isSaved ? <BookmarkCheck className="w-5 h-5 text-cyan-400" /> : <Bookmark className="w-5 h-5" />}
          {isSaved ? 'Saved' : 'Save City'}
        </button>
      </div>

      <CurrentWeatherHero weather={currentWeather} />
      
      <div className="w-full">
        <h3 className="mb-6 text-2xl font-bold tracking-wide text-white drop-shadow-md">5-Day Forecast</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {forecast.map((day) => (
            <div key={day.date} className="flex flex-col items-center justify-center p-4 transition-colors border bg-slate-900/40 backdrop-blur-md border-white/10 rounded-2xl hover:bg-slate-900/60">
              <p className="font-medium text-slate-300">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <img src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.description} className="w-16 h-16 my-2 drop-shadow-md"/>
              <div className="flex gap-3 text-lg font-bold">
                <span className="text-white">{day.tempMax}°</span>
                <span className="text-slate-400">{day.tempMin}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityWeather;