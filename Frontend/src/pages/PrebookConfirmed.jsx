import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PrebookConfirmed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ride = location.state?.ride;
  const fallbackVehicle = location.state?.vehicle;
  const fallbackScheduledTime = location.state?.scheduledTime;

  if (!ride) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600 text-xl">
        No ride info found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header with Logo */}
      <div className="w-full pt-10 pb-6 px-4 text-center">
        <div className="mb-4 flex justify-center">
          <div className="p-3 bg-white rounded-full shadow-md">
            <img src="/logo.png" alt="App Logo" className="h-16 w-16 object-contain" />
          </div>
        </div>

        {/* Ride Confirmation Text */}
        <div className="bg-white rounded-xl shadow-md py-4 px-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-black mb-1">Ride Confirmation</h2>
          <p className="text-gray-700 text-sm mb-1">Thank you for choosing Manipal Cab Services.</p>
          <p className="text-gray-700 text-sm">Your ride has been successfully pre-booked.</p>
        </div>
      </div>

      {/* Ride Details */}
      <div className="w-full px-4 py-6 flex-grow">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="pt-4">
            {/* Pickup */}
            <div className="relative pl-8 pr-4 py-3">
              <div className="absolute left-0 top-0 h-full w-8 flex justify-center">
                <div className="h-full w-0.5 bg-gray-200"></div>
              </div>
              <div className="absolute left-0 top-4 w-8 flex justify-center">
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center z-10">
                  <svg className="h-3.5 w-3.5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pickup</p>
                <p className="font-medium text-gray-900">{ride.pickup}</p>
              </div>
            </div>

            {/* Destination */}
            <div className="relative pl-8 pr-4 py-3">
              <div className="absolute left-0 top-0 h-full w-8 flex justify-center">
                <div className="h-full w-0.5 bg-gray-200"></div>
              </div>
              <div className="absolute left-0 top-4 w-8 flex justify-center">
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center z-10">
                  <svg className="h-3.5 w-3.5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Destination</p>
                <p className="font-medium text-gray-900">{ride.destination}</p>
              </div>
            </div>

            {/* Vehicle + Time */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50">
              <div className="bg-white rounded-lg shadow-sm p-3 text-center border border-gray-200">
                <div className="flex justify-center mb-2">
                  <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M5 9h14l-1 7h-12z" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-gray-500 mb-1">Vehicle</p>
                <p className="font-semibold text-gray-800">{ride.vehicleType || fallbackVehicle}</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-3 text-center border border-gray-200">
                <div className="flex justify-center mb-2">
                  <svg className="h-5 w-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-gray-500 mb-1">Scheduled Time</p>
                <p className="font-semibold text-gray-800">{ride.scheduledTime || fallbackScheduledTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ride Pooling CTA */}
        <div className="max-w-md mx-auto mt-6">
          <div className="bg-gray-800 rounded-lg shadow-md p-4 text-white mb-4">
            <div className="flex items-center">
              <div className="rounded-full bg-white/20 p-2 mr-3">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Share your ride with others</h3>
                <p className="text-xs text-gray-300">Travel together and enjoy a comfortable journey</p>
              </div>
            </div>
          </div>

          <button
            className="w-full py-3.5 bg-black text-white rounded-lg font-medium flex items-center justify-center space-x-2 shadow-md hover:bg-gray-900 transition"
            onClick={() =>
              navigate('/cab-pooling', {
                state: {
                  rideInfo: {
                    ...ride,
                    scheduledTime: ride.scheduledTime || fallbackScheduledTime,
                    vehicleType: ride.vehicleType || fallbackVehicle,
                  },
                },
              })
            }
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Go for Cab Pooling</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrebookConfirmed;
