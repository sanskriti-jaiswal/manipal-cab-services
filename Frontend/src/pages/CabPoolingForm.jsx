import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CabPoolingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rideInfo = location.state?.rideInfo;

  const [contactInfo, setContactInfo] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  if (!rideInfo) {
    return <div className="p-6 text-center">No ride info found.</div>;
  }

  const isValidPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\s+/g, '');
    const regex = /^(?:\+91|91)?[6-9]\d{9}$/;
    return regex.test(cleaned);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidPhoneNumber(contactInfo)) {
      setPhoneError("Please enter a valid Indian phone number (e.g. +91 9876543210)");
      setLoading(false);
      return;
    } else {
      setPhoneError('');
    }

    try {
      const payload = {
        rideId: rideInfo._id,
        user: rideInfo.user?._id,
        pickup: rideInfo.pickup,
        destination: rideInfo.destination,
        scheduledTime: rideInfo.scheduledTime,
        contactInfo,
        note
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/pooling/share`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        navigate('/all-pooled-cabs');
      }
    } catch (err) {
      alert('Failed to share ride for pooling.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-white h-screen flex flex-col justify-center">
      <h2 className="text-2xl font-bold text-center mb-6">Cab Pooling - Share Your Ride</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block font-semibold mb-1">Pickup</label>
          <p className="bg-gray-100 p-3 rounded">{rideInfo.pickup}</p>
        </div>

        <div>
          <label className="block font-semibold mb-1">Destination</label>
          <p className="bg-gray-100 p-3 rounded">{rideInfo.destination}</p>
        </div>

        <div>
          <label className="block font-semibold mb-1">Date & Time</label>
          <p className="bg-gray-100 p-3 rounded">
            {rideInfo.scheduledTime
              ? new Date(rideInfo.scheduledTime).toLocaleString('en-IN', {
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

        <div>
          <label className="block font-semibold mb-1">Your Contact Info (Phone/WhatsApp)</label>
          <input
            type="text"
            required
            value={contactInfo}
            onChange={(e) => {
              setContactInfo(e.target.value);
              setPhoneError(''); // Clear error as user types
            }}
            className="p-3 border rounded w-full"
            placeholder="e.g. +91 9876543210"
          />
          {phoneError && <p className="text-red-600 mt-1 text-sm">{phoneError}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-1">Optional Note (e.g. preferred time, capacity)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="p-3 border rounded w-full"
            rows={3}
            placeholder="Leaving around 6PM, 2 seats left..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white p-3 rounded hover:bg-green-700"
        >
          {loading ? 'Sharing...' : 'Share Ride for Pooling'}
        </button>
      </form>
    </div>
  );
};

export default CabPoolingForm;
