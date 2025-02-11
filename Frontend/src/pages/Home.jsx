import React from 'react';

const Home = () => {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Logo */}
      <img className="w-16 absolute left-5 top-5" src="/public/logo.png" alt="Manipal Cabs Logo" />

      {/* Background Image */}
      <div className="h-screen w-full">
        <img className="h-full w-full object-cover" src="/public/map-logo.png" alt="map" />
      </div>

      {/* Trip Search Form */}
      <div className="bg-white h-screen absolute top-0 left-0 w-full p-4 shadow-md">
       <div className='h-[30%]'>
       <h4 className="text-2xl font-semibold text-center mb-3">Find a Trip</h4>
        <form className="w-full flex flex-col items-center gap-2">
          <input
            type="text"
            placeholder="Add a pick-up location"
            className="w-11/12 p-3 border border-gray-300 rounded-lg text-center bg-[#eee]"
          />
          <input
            type="text"
            placeholder="Enter your destination"
            className="w-11/12 p-3 border border-gray-300 rounded-lg text-center bg-[#eee]"
          />
        </form>
       </div>
       <div className='h-[70%] bg-red-500'>

       </div>
      </div>
    </div>
  );
};

export default Home;
