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
    <div className="p-6 h-screen bg-white flex flex-col justify-center items-center text-center">
      <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 Your Ride Has Been Prebooked!</h2>
      <div className="bg-gray-100 p-6 rounded shadow-md text-left max-w-md w-full mb-6">
        <p><strong>Pickup:</strong> {ride.pickup}</p>
        <p><strong>Destination:</strong> {ride.destination}</p>
        <p><strong>Vehicle:</strong> {ride.vehicleType || fallbackVehicle || 'N/A'}</p>
        <p>
          <strong>Scheduled Time:</strong>{" "}
          {ride.scheduledTime || fallbackScheduledTime
            ? new Date(ride.scheduledTime || fallbackScheduledTime).toLocaleString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })
            : 'N/A'}
        </p>
      </div>
      <button
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
        onClick={() => navigate('/cab-pooling', {
          state: {
            rideInfo: {
              ...ride,
              scheduledTime: ride.scheduledTime || fallbackScheduledTime,
              vehicleType: ride.vehicleType || fallbackVehicle
            }
          }
        })}
      >
        Go for Cab Pooling
      </button>
    </div>
  );
};

export default PrebookConfirmed;
