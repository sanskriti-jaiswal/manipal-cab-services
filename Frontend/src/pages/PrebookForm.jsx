import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrebookForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { pickup, destination, vehicle } = location.state || {};
  const [scheduledTime, setScheduledTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType: vehicle?.type,
        scheduledTime
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const ride = response.data;

      navigate('/prebook-confirmed', {
        state: {
          ride,
          vehicle: vehicle?.type,
          scheduledTime
        }
      });
    } catch (err) {
      console.error("Prebook error:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Header */}
      <div className="bg-black text-white py-6 px-4 text-center">
        <h2 className="text-2xl font-bold">Pre-book Your Ride!</h2>
        <p className="text-sm mt-1 text-gray-300">No Last-Minute Hassles — Just Rides On Time.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 max-w-lg mx-auto">
        {/* Trip Info */}
        <div className="mb-6 bg-white p-5 rounded-xl shadow-sm">
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">FROM</p>
            <p className="text-sm font-medium text-gray-900">{pickup}</p>
          </div>
          <hr />
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-1">TO</p>
            <p className="text-sm font-medium text-gray-900">{destination}</p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="mb-6 bg-white p-5 rounded-xl shadow-sm">
          <p className="text-sm font-semibold mb-3">Pick Date & Time</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Date (DD-MM-YYYY)</label>
              <input
                type="text"
                placeholder="DD-MM-YYYY"
                onFocus={(e) => e.target.type = "date"}
                onBlur={(e) => !e.target.value && (e.target.type = "text")}
                value={scheduledTime.split('T')[0] || ''}
                onChange={(e) => {
                  const timeComponent = scheduledTime.includes('T') ? scheduledTime.split('T')[1] : '';
                  setScheduledTime(`${e.target.value}${timeComponent ? 'T' + timeComponent : ''}`);
                }}
                required
                className="block w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Time (HH:MM)</label>
              <input
                type="text"
                placeholder="HH:MM"
                onFocus={(e) => e.target.type = "time"}
                onBlur={(e) => !e.target.value && (e.target.type = "text")}
                value={scheduledTime.split('T')[1] || ''}
                onChange={(e) => {
                  const dateComponent = scheduledTime.includes('T') ? scheduledTime.split('T')[0] : '';
                  setScheduledTime(`${dateComponent || new Date().toISOString().split('T')[0]}T${e.target.value}`);
                }}
                required
                className="block w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Type */}
        {vehicle?.type && (
          <div className="mb-6 bg-white p-5 rounded-xl shadow-sm flex items-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 001-1v-3.05a2.5 2.5 0 010-4.9V4a1 1 0 00-1-1H3z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">VEHICLE TYPE</p>
              <p className="text-sm font-semibold text-gray-800">{vehicle.type.toUpperCase()}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-60 shadow-md"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Confirm Prebooking"
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          By confirming, you agree to our Terms of Service
        </p>
      </form>
    </div>
  );
};

export default PrebookForm;
