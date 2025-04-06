import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PrebookForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { pickup, destination, vehicle } = location.state || {};
  const [scheduledTime, setScheduledTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      // ✅ Pass extra data (vehicle + scheduledTime)
      navigate('/prebook-confirmed', {
        state: {
          ride,
          vehicle: vehicle?.type,
          scheduledTime
        }
      });
    } catch (err) {
      console.error("Prebook error:", err);
      alert("Failed to prebook ride.");
    }
  };

  return (
    <div className="p-6 h-screen bg-white flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Schedule Your Ride</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block font-semibold mb-1">Pickup</label>
          <p className="bg-gray-100 p-3 rounded">{pickup}</p>
        </div>
        <div>
          <label className="block font-semibold mb-1">Destination</label>
          <p className="bg-gray-100 p-3 rounded">{destination}</p>
        </div>
        <div>
          <label className="block font-semibold mb-1">Scheduled Date & Time</label>
          <input
            type="datetime-local"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            required
            className="p-3 border rounded w-full"
          />
        </div>
        <button type="submit" className="bg-green-600 text-white p-3 rounded hover:bg-green-700">
          Confirm Prebooking
        </button>
      </form>
    </div>
  );
};

export default PrebookForm;
