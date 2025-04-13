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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Ride Information</h3>
            <p className="mt-1 text-gray-500">Please select a ride to share before accessing this page.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isValidPhoneNumber = (phone) => {
    // Just check if input has exactly 10 digits
    return /^\d{10}$/.test(phone);
  };

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
        contactInfo: `+91${contactInfo}`, // Add +91 prefix to the phone number
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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      
      const day = date.getDate();
      const month = date.toLocaleString('en-IN', { month: 'long' });
      const year = date.getFullYear();
      
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      
      return `${day} ${month} ${year} at ${hours}:${minutes} ${ampm}`;
    } catch (e) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 pt-0 pb-10">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-indigo-600 py-7 px-5 text-white">
            <h2 className="text-2xl font-bold text-center mb-1.5">Cab-Pooling, Share your ride</h2>
            <p className="text-center text-indigo-100 text-base font-medium mb-1">Why ride alone? Pool with purpose</p>
            <p className="text-center text-indigo-100 text-sm">Connect with others heading your way</p>
          </div>

          <div className="p-6">
            <div className="relative pl-9 mb-8">
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-indigo-200"></div>
              
              <div className="mb-6 relative">
                <div className="absolute left-[-20px] top-1 w-3.5 h-3.5 rounded-full bg-indigo-500"></div>
                <div>
                  <p className="text-xs font-medium text-indigo-600 uppercase">PICKUP</p>
                  <p className="text-gray-800 text-base">{rideInfo.pickup}</p>
                </div>
              </div>
              
              <div className="mb-6 relative">
                <div className="absolute left-[-20px] top-1 w-3.5 h-3.5 rounded-full bg-indigo-600"></div>
                <div>
                  <p className="text-xs font-medium text-indigo-600 uppercase">DESTINATION</p>
                  <p className="text-gray-800 text-base">{rideInfo.destination}</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-[-20px] top-1 w-3.5 h-3.5 rounded-full bg-indigo-400 flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium text-indigo-600 uppercase">SCHEDULED TIME</p>
                  <p className="text-gray-800 text-base">{formatDate(rideInfo.scheduledTime)}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Your Contact Info <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-gray-500 font-medium">+91</span>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => {
                      // Only allow numbers and limit to 10 digits
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        setContactInfo(value);
                        setPhoneError('');
                      }
                    }}
                    className={`block w-full pl-12 pr-4 py-2.5 border ${
                      phoneError ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="9876543210"
                  />
                </div>
                {phoneError && (
                  <p className="mt-1 text-sm text-red-600">
                    {phoneError}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Your phone number will be shared with other riders for coordination
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="shadow-sm block w-full px-4 py-2.5 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="E.g. 'Leaving around 6PM, 2 seats available'"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Any preferences or additional information?
                </p>
              </div>

              <div className="pt-2.5">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium"
                >
                  {loading ? 'Processing...' : 'Share Ride for Pooling'}
                </button>
              </div>
            </form>
          </div>

          <div className="px-5 py-2.5 bg-gray-50 text-xs text-center text-gray-500">
            By sharing this ride, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabPoolingForm;