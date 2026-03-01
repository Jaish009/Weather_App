import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Link } from 'react-router-dom';

const SavedDestinations = () => {
  const { savedCities } = useWeather();

  return (
    <div className="max-w-4xl mx-auto mt-12 w-full text-white">
      <h2 className="text-3xl font-bold mb-8 drop-shadow-md">Your Saved Cities</h2>
      {savedCities.length === 0 ? (
        <p className="text-slate-300 text-lg">You haven't saved any cities yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savedCities.map(city => (
            <Link 
              key={city} 
              to={`/city/${city}`}
              className="p-6 capitalize text-xl font-bold text-center transition-all border bg-slate-900/40 backdrop-blur-md border-white/20 rounded-2xl hover:bg-slate-900/60 hover:border-cyan-400"
            >
              {city}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedDestinations;