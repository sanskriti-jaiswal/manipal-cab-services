// ConfirmRide.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmRide = ({ 
    setConfirmRidePanel, 
    pickup, 
    destination, 
    selectedVehicle, 
    createRide 
}) => {
    const navigate = useNavigate();

    const handlePrebookClick = () => {
        navigate('/prebook', {
            state: {
                pickup,
                destination,
                vehicle: selectedVehicle
            }
        });
    };

    return (
        <div className="bg-white p-6 rounded-t-lg shadow-lg w-full transition-all duration-300">
            {/* Close Button */}
            <div className="flex justify-end mb-2">
                <span
                    className="cursor-pointer"
                    onClick={() => setConfirmRidePanel(false)}
                >
                    <i className="text-2xl text-gray-400 ri-arrow-down-wide-line"></i>
                </span>
            </div>

            <h3 className="text-2xl font-semibold mb-5 text-center">Confirm your Ride</h3>

            <div className="flex justify-center">
                <img className="h-24" src={selectedVehicle?.img} alt={selectedVehicle?.name} />
            </div>

            <div className="w-full mt-5">
                {/* Pickup */}
                <div className="flex items-center gap-5 p-3 border-b">
                    <i className="ri-map-pin-user-fill text-lg text-blue-500"></i>
                    <div>
                        <h3 className="text-md font-medium">Pickup</h3>
                        <p className="text-sm text-gray-600">{pickup || "Not Selected"}</p>
                    </div>
                </div>

                {/* Destination */}
                <div className="flex items-center gap-5 p-3 border-b">
                    <i className="ri-map-pin-2-fill text-lg text-red-500"></i>
                    <div className="text-center w-full">
                        <h3 className="text-md font-medium">Destination</h3>
                        <p className="text-sm text-gray-600">{destination || "Not Selected"}</p>
                    </div>
                </div>

                {/* Fare */}
                <div className="flex items-center gap-5 p-3">
                    <i className="ri-currency-line text-lg text-green-600"></i>
                    <div className="text-center w-full">
                        <h3 className="text-md font-medium">₹{selectedVehicle?.price || "0"}</h3>
                        <p className="text-sm text-gray-600">Payment: Cash</p>
                    </div>
                </div>
            </div>

            <button 
                onClick={createRide} 
                className="w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg transition-all duration-300 hover:bg-green-700 shadow-md"
            >
                Confirm Ride
            </button>

            <button 
                onClick={handlePrebookClick}
                className="w-full mt-3 bg-blue-600 text-white font-semibold p-3 rounded-lg transition-all duration-300 hover:bg-blue-700 shadow-md"
            >
                Prebook Cab
            </button>
        </div>
    );
};

export default ConfirmRide;
