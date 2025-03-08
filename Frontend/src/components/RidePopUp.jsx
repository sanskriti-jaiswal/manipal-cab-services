import React from 'react';

const RidePopUp = ({ ride, setRidePopupPanel, confirmRide }) => {
    return (
        <div className="bg-white p-6 rounded-t-lg shadow-lg w-full">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">🚖 New Ride Available!</h3>

            <div className="flex items-center justify-between p-3 bg-yellow-300 rounded-lg shadow-md">
                <div className="flex items-center gap-3">
                    <img className="h-12 w-12 rounded-full object-cover" src={ride?.user?.profileImage} alt="User" />
                    <h2 className="text-lg font-medium capitalize">{ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}</h2>
                </div>
                <h5 className="text-lg font-semibold">{ride?.distance} KM</h5>
            </div>

            {/* Ride Details */}
            <div className="w-full mt-5">
                <div className="flex items-center gap-5 p-3 border-b">
                    <i className="ri-map-pin-user-fill text-lg text-blue-500"></i>
                    <div>
                        <h3 className="text-md font-medium">Pickup</h3>
                        <p className="text-sm text-gray-600">{ride?.pickup || "Not Available"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-3 border-b">
                    <i className="ri-map-pin-2-fill text-lg text-red-500"></i>
                    <div>
                        <h3 className="text-md font-medium">Destination</h3>
                        <p className="text-sm text-gray-600">{ride?.destination || "Not Available"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-3">
                    <i className="ri-currency-line text-lg text-green-600"></i>
                    <div>
                        <h3 className="text-md font-medium">₹{ride?.fare || "0.00"}</h3>
                        <p className="text-sm text-gray-600">Payment: Cash</p>
                    </div>
                </div>
            </div>

            <button 
                onClick={() => confirmRide()} 
                className="w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg"
            >
                ✅ Accept Ride
            </button>
        </div>
    );
};

export default RidePopUp;
