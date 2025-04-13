import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CabPooling = () => {
  const [pooledCabs, setPooledCabs] = useState([]);
  const [filteredCabs, setFilteredCabs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pickupFilter, setPickupFilter] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');

  useEffect(() => {
    const fetchPooledCabs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/pooling/all`);
        setPooledCabs(response.data || []);
        setFilteredCabs(response.data || []);
      } catch (error) {
        console.error("Failed to fetch pooled cabs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPooledCabs();
  }, []);

  const scoreMatch = (cab) => {
    let score = 0;

    if (
      pickupFilter &&
      cab.pickup.toLowerCase().includes(pickupFilter.toLowerCase())
    ) score += 3;

    if (
      destinationFilter &&
      cab.destination.toLowerCase().includes(destinationFilter.toLowerCase())
    ) score += 3;

    if (timeFilter && cab.scheduledTime) {
      const rideTime = new Date(cab.scheduledTime).getTime();
      const filterTime = new Date(timeFilter).getTime();
      const diff = Math.abs(rideTime - filterTime);
      if (diff < 60 * 60 * 1000) score += 3; // within 1 hour
      else if (diff < 2 * 60 * 60 * 1000) score += 2; // within 2 hours
      else if (diff < 3 * 60 * 60 * 1000) score += 1; // within 3 hours
    }

    return score;
  };

  const applyFilters = () => {
    const matches = pooledCabs
      .map((cab) => ({ ...cab, matchScore: scoreMatch(cab) }))
      .filter((cab) => cab.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    setFilteredCabs(matches.length > 0 ? matches : pooledCabs);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-0"> {/* Changed py-8 to py-0 */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 p-5 text-white">
            <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
              Available Cab Pools
            </h2>
            <p className="text-center text-indigo-100 text-sm mt-1">Share the ride. Save time, money, and miles</p>
          </div>
          
          {/* Filter Section */}
          <div className="p-5 bg-white">
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Pickup Location</label>
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  value={pickupFilter}
                  onChange={(e) => setPickupFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Destination</label>
                <input
                  type="text"
                  placeholder="Enter destination"
                  value={destinationFilter}
                  onChange={(e) => setDestinationFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Date & Time</label>
                <input
                  type="text"
                  placeholder="DD-MM-YYYY"
                  onFocus={(e) => e.target.type = "datetime-local"}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <button
              onClick={applyFilters}
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              Filter Cab Pools
            </button>
          </div>

          {/* Results Section */}
          <div className="p-5 bg-gray-50">
            {loading ? (
              <div className="py-8 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : filteredCabs.length === 0 ? (
              <div className="text-center py-8">
                No matching cab pools found.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCabs.map((cab, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    {/* Numbered Title */}
                    <div className="flex items-center gap-2 p-4 bg-blue-100">
                      <h3 className="text-lg font-bold text-gray-800">Cab Pool {index + 1}</h3> {/* Dynamic numbering */}
                    </div>

                    {/* Card Content */}
                    <div className="p-4">
                      <p><span className="font-medium">Pickup:</span> {cab.pickup}</p>
                      <p><span className="font-medium">Destination:</span> {cab.destination}</p>
                      <p><span className="font-medium">Date & Time:</span> {formatDate(cab.scheduledTime)}</p>
                      <p><span className="font-medium">Contact:</span> {cab.contactInfo}</p>
                      {cab.note && (
                        <p><span className="font-medium">Note:</span> {cab.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 text-xs text-center text-gray-500">
            Find the perfect cab pool for your journey.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabPooling;
