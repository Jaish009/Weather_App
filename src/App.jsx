import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherContext';

import BackgroundWrapper from './components/BackgroundWrapper';
import SearchBar from './components/SearchBar';

import Home from './pages/Home';
import CityWeather from './pages/CityWeather';
import SavedDestinations from './pages/SavedDestinations';

function App() {
  return (
    <WeatherProvider>
      <Router>
        <BackgroundWrapper>
          <header className="flex flex-col items-center justify-between gap-6 w-full max-w-6xl mx-auto md:flex-row pb-8 border-b border-white/10">
            <Link to="/" className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              Aero<span className="text-cyan-400">Weather</span>
            </Link>
            
            <div className="flex-grow w-full md:w-auto md:max-w-md">
              <SearchBar />
            </div>

            <Link 
              to="/saved" 
              className="font-semibold text-slate-200 hover:text-cyan-400 transition-colors drop-shadow-md"
            >
              Saved Cities
            </Link>
          </header>

          <main className="flex-grow flex flex-col items-center w-full max-w-6xl mx-auto pt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/city/:cityName" element={<CityWeather />} />
              <Route path="/saved" element={<SavedDestinations />} />
            </Routes>
          </main>
        </BackgroundWrapper>
      </Router>
    </WeatherProvider>
  );
}

export default App;