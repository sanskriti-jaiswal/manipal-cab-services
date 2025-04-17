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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-semibold">No Ride Information</h3>
          <p className="mt-1 text-gray-500">Please select a ride to share before accessing this page.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 rounded-md text-sm font-medium bg-black text-white hover:bg-gray-800"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isValidPhoneNumber = (phone) => /^\d{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidPhoneNumber(contactInfo)) {
      setPhoneError("Please enter a valid 10-digit mobile number");
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
        contactInfo: `+91${contactInfo}`,
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString('en-IN', { month: 'short' });
      const year = date.getFullYear();
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;
      return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black pt-10 pb-10">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="py-6 px-6">
            <h2 className="text-2xl font-bold text-center mb-2">Share Your Ride</h2>
            <p className="text-center text-sm text-gray-600 mb-4">Pool your cab with others heading your way</p>

            {/* Ride Info */}
            <div className="mb-6 text-center space-y-2">
              <div className="text-xs text-gray-600">PICKUP LOCATION</div>
              <div className="text-sm font-medium">{rideInfo.pickup}</div>
              <div className="text-xs text-gray-600">DESTINATION</div>
              <div className="text-sm font-medium">{rideInfo.destination}</div>
              <div className="text-xs text-gray-600">SCHEDULED TIME</div>
              <div className="text-sm font-medium">{formatDate(rideInfo.scheduledTime)}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-1">Phone Number <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-gray-500">+91</span>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        setContactInfo(value);
                        setPhoneError('');
                      }
                    }}
                    className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="9876543210"
                  />
                </div>
                {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
                <p className="mt-1 text-xs text-gray-500">This number will be visible to other riders.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Note (Optional)</label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="E.g. Leaving around 6PM, 2 seats available"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-md bg-black text-white font-medium hover:bg-gray-800 transition"
                >
                  {loading ? 'Processing...' : 'Share Ride for Pooling'}
                </button>
              </div>
            </form>

            <div className="pt-4 pb-2 text-xs text-center text-gray-500">
              By sharing your ride, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabPoolingForm;
