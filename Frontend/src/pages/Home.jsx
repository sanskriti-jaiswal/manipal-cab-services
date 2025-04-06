import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';

import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import WaitingForDriver from '../components/WaitingForDriver';
import LookingForDriver from '../components/LookingForDriver';

import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [showVehiclePanel, setShowVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [ride, setRide] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingFare, setLoadingFare] = useState(false);

  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;
    const handleRideUpdate = (data) => {
      console.log("📦 Ride update received:", data);
    };
    socket.on("rideUpdate", handleRideUpdate);
    return () => {
      socket.off("rideUpdate", handleRideUpdate);
    };
  }, [socket]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: showVehiclePanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.4,
      ease: 'power2.out'
    });
  }, [showVehiclePanel]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.4,
      ease: 'power2.out'
    });
  }, [confirmRidePanel]);

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query || query.trim().length < 2) {
        setLocationSuggestions([]);
        return;
      }
      setLoadingSuggestions(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: query },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setLocationSuggestions(response.data || []);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setLocationSuggestions([]);
      }
      setLoadingSuggestions(false);
    }, 200),
    []
  );

  useEffect(() => {
    const query = focusedField === 'pickup' ? pickup : destination;
    fetchSuggestions(query);
  }, [pickup, destination, focusedField, fetchSuggestions]);

  const handleSuggestionSelect = (suggestion) => {
    if (focusedField === 'pickup') {
      setPickup(suggestion);
      setSelectedLocation(suggestion);
      setFocusedField('destination');
    } else {
      setDestination(suggestion);
    }
    setLocationSuggestions([]);
    setPanelOpen(false);
  };

  const createRide = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setFare((prev) => ({ ...prev, [vehicleType]: response.data.fare }));
      setConfirmRidePanel(false);
      setLookingForDriver(true);

      setTimeout(() => {
        setRide({
          pickup,
          destination,
          fare: response.data.fare,
          vehicle: { name: vehicleType },
          captain: {
            fullname: { firstname: "Sarthak" },
            vehicle: {
              plate: "MP04 AB 1234",
              model: vehicleType
            }
          },
          arrivalTime: "6 min",
        });
        setLookingForDriver(false);
        setWaitingForDriver(true);
      }, 3000);
    } catch (err) {
      console.error('Error creating ride:', err);
      alert('Failed to create ride.');
    }
  };

  const findTrip = async () => {
    if (!pickup || !destination) {
      alert('Please enter both pickup and destination.');
      return;
    }

    setPanelOpen(false);
    setLocationSuggestions([]);
    setLoadingFare(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setFare(response.data);
      setShowVehiclePanel(true);
    } catch (err) {
      console.error('Error fetching fare:', err);
      alert('Failed to fetch fare. Please try again.');
      setFare({});
    }

    setLoadingFare(false);
  };

  return (
    <div className="relative h-screen w-screen bg-white overflow-hidden">
      <img className="w-16 absolute left-5 top-5" src="/logo.png" alt="Logo" />

      {/* 💜 Pool Cab Button */}
      <button
        onClick={() => navigate('/all-pooled-cabs')}
        className="absolute top-5 right-5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg z-20"
      >
        Pool Cab
      </button>

      <div className={`w-full h-full ${panelOpen || waitingForDriver || lookingForDriver ? 'hidden' : 'block'}`}>
        <img className="h-full w-full object-cover" src="/map-logo.png" alt="Map" />
      </div>

      <div className={`absolute w-screen bg-white p-6 rounded-t-lg shadow-md transition-all duration-500 
        ${panelOpen || waitingForDriver || lookingForDriver ? 'top-0' : 'bottom-0'}`}>

        {!waitingForDriver && !lookingForDriver && (
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <h4 className="text-xl font-bold text-black flex justify-between items-center">
              Find a Trip
              <span
                onClick={() => setPanelOpen(false)}
                className="text-2xl text-gray-500 cursor-pointer transition-opacity duration-300"
              >
                <i className="ri-arrow-down-wide-line"></i>
              </span>
            </h4>

            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              onFocus={() => {
                setFocusedField('pickup');
                setPanelOpen(true);
              }}
              placeholder="Add a pick-up location"
              className="p-3 bg-gray-200 text-lg rounded-md"
            />

            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => {
                setFocusedField('destination');
                setPanelOpen(true);
              }}
              placeholder="Enter your destination"
              className="p-3 bg-gray-200 text-lg rounded-md"
            />

            {loadingFare ? (
              <button
                disabled
                className="bg-gray-400 text-white py-2 px-4 mt-3 rounded-lg w-full cursor-not-allowed"
              >
                Loading...
              </button>
            ) : (
              <button
                onClick={findTrip}
                className="bg-black text-white py-2 px-4 mt-3 rounded-lg w-full transition-transform hover:scale-105"
              >
                Find Trip
              </button>
            )}
          </form>
        )}

        {panelOpen && locationSuggestions.length > 0 && !showVehiclePanel && !confirmRidePanel && !lookingForDriver && !waitingForDriver && (
          <LocationSearchPanel
            suggestions={locationSuggestions}
            onSelect={handleSuggestionSelect}
            setPanelOpen={setPanelOpen}
          />
        )}
      </div>

      <div ref={vehiclePanelRef} className="fixed bottom-0 w-full z-10 translate-y-full bg-white px-3 py-10 pt-12">
        <VehiclePanel
          setShowVehiclePanel={setShowVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
          setSelectedVehicle={setSelectedVehicle}
          setVehicleType={setVehicleType}
          fare={fare}
        />
      </div>

      <div ref={confirmRidePanelRef} className="fixed bottom-0 w-full z-10 translate-y-full bg-white px-3 py-6 pt-12">
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          pickup={selectedLocation}
          destination={destination}
          selectedVehicle={selectedVehicle}
          createRide={createRide}
        />
      </div>

      {lookingForDriver && <LookingForDriver selectedVehicle={selectedVehicle} />}
      {waitingForDriver && (
        <WaitingForDriver
          waitingForDriver={setWaitingForDriver}
          ride={ride}
        />
      )}
    </div>
  );
};

export default Home;
