import React from 'react';
import { Droplets, Wind, MapPin } from 'lucide-react'; 

const CurrentWeatherHero = ({ weather }) => {
  if (!weather) return null; 

  return (
    <div className="w-full max-w-md p-8 mx-auto mt-12 text-white border border-white/20 rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl">
      <div className="flex items-center justify-center gap-2 mb-4">
        <MapPin className="w-6 h-6 text-cyan-400" />
        <h2 className="text-3xl font-bold tracking-wider uppercase">
          {weather.name}, {weather.sys.country}
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
          alt={weather.weather[0].description}
          className="w-32 h-32 drop-shadow-lg"
        />
        <h1 className="text-7xl font-extrabold tracking-tighter">
          {Math.round(weather.main.temp)}°
        </h1>
        <p className="mt-2 text-xl font-medium capitalize text-slate-200">
          {weather.weather[0].description}
        </p>
      </div>

      <div className="flex justify-between px-6 pt-6 border-t border-white/20">
        <div className="flex flex-col items-center gap-1">
          <Droplets className="w-5 h-5 text-cyan-300" />
          <span className="text-sm font-semibold text-slate-200">Humidity</span>
          <span className="text-lg font-bold">{weather.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Wind className="w-5 h-5 text-cyan-300" />
          <span className="text-sm font-semibold text-slate-200">Wind</span>
          <span className="text-lg font-bold">{Math.round(weather.wind.speed)} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherHero;