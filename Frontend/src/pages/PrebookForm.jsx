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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-indigo-600 p-5 text-white">
        <h2 className="text-2xl font-bold">Pre-book Your Ride!</h2>
        <p className="text-indigo-100 text-sm mt-1">No Last-Minute Hassles — Just Rides On Time.</p>
      </div>
      
      {/* Form body */}
      <form onSubmit={handleSubmit} className="p-5 max-w-lg mx-auto">
        {/* Trip details */}
        <div className="mb-6 bg-white p-5 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 border-b border-gray-200 pb-2 w-full">
              <p className="text-xs text-gray-500 font-medium">FROM</p>
              <p className="text-gray-800">{pickup}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 border-b border-gray-200 pb-2 w-full">
              <p className="text-xs text-gray-500 font-medium">TO</p>
              <p className="text-gray-800">{destination}</p>
            </div>
          </div>
        </div>
        
        {/* Date time selector */}
        <div className="mb-6 bg-white p-5 rounded-lg shadow-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pick Date & Time
          </label>
          
          {/* Date picker with better format control */}
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Date (DD-MM-YYYY)</label>
              <input
                type="text"
                placeholder="DD-MM-YYYY"
                onFocus={(e) => e.target.type = "date"}
                onBlur={(e) => {
                  if (!e.target.value) {
                    e.target.type = "text";
                  }
                }}
                value={scheduledTime.split('T')[0] || ''}
                onChange={(e) => {
                  const timeComponent = scheduledTime.includes('T') ? scheduledTime.split('T')[1] : '';
                  setScheduledTime(`${e.target.value}${timeComponent ? 'T' + timeComponent : ''}`);
                }}
                required
                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Time (HH:MM)</label>
              <input
                type="text"
                onFocus={(e) => e.target.type = "time"}
                onBlur={(e) => {
                  if (!e.target.value) {
                    e.target.type = "text";
                  }
                }}
                placeholder="HH:MM"
                value={scheduledTime.split('T')[1] || ''}
                onChange={(e) => {
                  const dateComponent = scheduledTime.includes('T') ? scheduledTime.split('T')[0] : '';
                  setScheduledTime(`${dateComponent || new Date().toISOString().split('T')[0]}T${e.target.value}`);
                }}
                required
                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
        
        {/* Vehicle type if available */}
        {vehicle?.type && (
          <div className="mb-6 bg-white p-5 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 001-1v-3.05a2.5 2.5 0 010-4.9V4a1 1 0 00-1-1H3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-xs text-gray-500 font-medium">VEHICLE TYPE</p>
                <p className="text-indigo-700 font-medium">{vehicle.type.toUpperCase()}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Submit button */}
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white font-medium py-4 px-4 rounded-lg flex items-center justify-center transition-all hover:bg-indigo-700 disabled:opacity-70 shadow-md"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span>Confirm Prebooking</span>
          )}
        </button>
        
        {/* Additional info */}
        <p className="text-xs text-gray-500 text-center mt-4">
          By confirming, you agree to our Terms of Service
        </p>
      </form>
    </div>
  );
};

export default PrebookForm;
