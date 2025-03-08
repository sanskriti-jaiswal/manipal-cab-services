import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import WaitingForDriver from '../components/WaitingForDriver';
import LookingForDriver from '../components/LookingForDriver';

const Home = () => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const [showVehiclePanel, setShowVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const [lookingForDriver, setLookingForDriver] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [ride, setRide] = useState(null);

    const createRide = () => {
        setConfirmRidePanel(false);
        setLookingForDriver(true);  // Show "Looking for Driver" only

        setTimeout(() => {
            const rideDetails = {
                pickup: selectedLocation,
                destination: destination,
                fare: selectedVehicle?.price || 0,
                vehicle: selectedVehicle,
                captain: {
                    fullname: { firstname: "Sarthak" },
                    vehicle: { plate: "MP04 AB 1234", model: selectedVehicle?.name || "Maruti Suzuki Alto" }
                },
                arrivalTime: "6 min",
            };

            setRide(rideDetails);
            setLookingForDriver(false);
            setWaitingForDriver(true);  // Show "Waiting for Driver" after a delay
        }, 3000);
    };

    return (
        <div className="relative h-screen w-screen bg-white overflow-hidden">
            {/* Logo */}
            <img className="w-16 absolute left-5 top-5" src="/logo.png" alt="Logo" />

            {/* Background Image */}
            <div className={`w-full h-full ${panelOpen || waitingForDriver || lookingForDriver ? 'hidden' : 'block'}`}>
                <img className="h-full w-full object-cover" src="/map-logo.png" alt="Map Logo" />
            </div>

            {/* Form Section */}
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
                            onFocus={() => setPanelOpen(true)} 
                            placeholder="Add a pick-up location" 
                            className="p-3 bg-gray-200 text-lg rounded-md" 
                        />
                        <input 
                            value={destination} 
                            onChange={(e) => setDestination(e.target.value)} 
                            onFocus={() => setPanelOpen(true)} 
                            placeholder="Enter your destination" 
                            className="p-3 bg-gray-200 text-lg rounded-md" 
                        />
                    </form>
                )}

                {/* Show Panels Based on User Interaction */}
                {panelOpen && !showVehiclePanel && !confirmRidePanel && !lookingForDriver && !waitingForDriver && 
                    <LocationSearchPanel 
                        setShowVehiclePanel={setShowVehiclePanel} 
                        setSelectedLocation={setSelectedLocation} 
                        setPanelOpen={setPanelOpen} 
                    />
                }

                {showVehiclePanel && !confirmRidePanel && !lookingForDriver && !waitingForDriver && 
                    <VehiclePanel 
                        setShowVehiclePanel={setShowVehiclePanel} 
                        setConfirmRidePanel={setConfirmRidePanel} 
                        setSelectedVehicle={setSelectedVehicle} 
                    />
                }

                {confirmRidePanel && !lookingForDriver && !waitingForDriver && 
                    <ConfirmRide 
                        setConfirmRidePanel={setConfirmRidePanel} 
                        pickup={selectedLocation} 
                        destination={destination} 
                        selectedVehicle={selectedVehicle} 
                        createRide={createRide} 
                    />
                }

                {lookingForDriver && 
                    <LookingForDriver selectedVehicle={selectedVehicle} />
                }

                {waitingForDriver && 
                    <WaitingForDriver 
                        waitingForDriver={setWaitingForDriver} 
                        ride={ride} 
                    />
                }
            </div>
        </div>
    );
};

export default Home;
