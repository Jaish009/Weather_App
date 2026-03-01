import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center text-white mt-32">
      <h1 className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
        Your Next Destination
      </h1>
      <p className="text-xl text-slate-200 drop-shadow-md max-w-lg">
        Search for a city above to get current conditions, a 5-day forecast, and save it to your travel list.
      </p>
    </div>
  );
};

export default Home;