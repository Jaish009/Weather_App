import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;
    navigate(`/city/${searchTerm.trim().toLowerCase()}`);
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto group z-20">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a city..."
        className="w-full py-3 pl-12 pr-4 text-white transition-all duration-300 border rounded-full bg-slate-900/50 backdrop-blur-md border-white/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 placeholder:text-slate-400"
      />
      <button 
        type="submit" 
        className="absolute inset-y-0 right-0 px-6 text-sm font-semibold text-white transition-colors bg-cyan-500 rounded-r-full hover:bg-cyan-400"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;