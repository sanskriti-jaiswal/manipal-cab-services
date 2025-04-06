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

    setFilteredCabs(matches);
  };

  return (
    <div className="p-6 bg-white min-h-screen max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">🚕 Available Cab Pools</h2>

      {/* Filter Section */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Pickup"
          value={pickupFilter}
          onChange={(e) => setPickupFilter(e.target.value)}
          className="p-3 border rounded bg-gray-50"
        />
        <input
          type="text"
          placeholder="Destination"
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
          className="p-3 border rounded bg-gray-50"
        />
        <input
          type="datetime-local"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="p-3 border rounded bg-gray-50"
        />
      </div>

      <button
        onClick={applyFilters}
        className="mb-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
      >
        🔍 Filter Cab Pools
      </button>

      {loading ? (
        <p className="text-center text-gray-500">Loading pooled cabs...</p>
      ) : filteredCabs.length === 0 ? (
        <p className="text-center text-gray-400">No matching pooled cabs found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredCabs.map((cab, index) => (
            <div key={index} className="border p-4 rounded shadow-sm bg-gray-50">
              <p><strong>Pickup:</strong> {cab.pickup}</p>
              <p><strong>Destination:</strong> {cab.destination}</p>
              <p>
                <strong>Date & Time:</strong>{" "}
                {cab.scheduledTime
                  ? new Date(cab.scheduledTime).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })
                  : 'N/A'}
              </p>
              <p><strong>Contact:</strong> {cab.contactInfo}</p>
              {cab.note && cab.note.trim() !== "" && (
                <p><strong>Note:</strong> {cab.note}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CabPooling;
