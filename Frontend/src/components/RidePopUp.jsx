import React from 'react';

const RidePopUp = (props) => {
    return (
        <div className="bg-white p-6 rounded-t-2xl shadow-lg w-full">
            {/* Header */}
            <h3 className="text-lg font-semibold text-center text-gray-900">
                 New Ride Available!
            </h3>

            {/* User & Distance Box (Yellow Background) */}
            <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg shadow-md mt-4">
                <div className="flex items-center gap-3">
                    <img 
                        className="h-12 w-12 rounded-full object-cover" 
                        src={props.ride?.user?.profileImage || "https://via.placeholder.com/100"} 
                        alt="User"
                    />
                    <h2 className="text-md font-semibold capitalize">{props.ride?.user?.fullname?.firstname}</h2>
                </div>
                <h5 className="text-md font-bold">{props.ride?.distance}</h5>
            </div>

            {/* Ride Details */}
            <div className="w-full mt-5">
                {/* Pickup */}
                <div className="flex items-center gap-4 p-4 border-b">
                    <i className="ri-map-pin-user-fill text-lg text-black"></i>
                    <div>
                        <p className="text-md font-semibold">Pickup</p>
                        <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
                    </div>
                </div>

                {/* Destination */}
                <div className="flex items-center gap-4 p-4 border-b">
                    <i className="ri-map-pin-2-fill text-lg text-black"></i>
                    <div>
                        <p className="text-md font-semibold">Destination</p>
                        <p className="text-sm text-gray-600">{props.ride?.destination}</p>
                    </div>
                </div>

                {/* Fare & Payment (Centered) */}
                <div className="flex flex-col items-center gap-2 p-4">
                    <div className="flex items-center gap-2">
                        <i className="ri-currency-line text-lg text-black"></i>
                        <h3 className="text-md font-semibold">₹{props.ride?.fare}</h3>
                    </div>
                    <p className="text-sm text-gray-600">Payment: Cash</p>
                </div>
            </div>

            {/* Accept & Ignore Buttons */}
            <div className="mt-5 w-full">
                <button 
                    onClick={props.confirmRide}  // ✅ FIXED: Correct function usage
                    className="w-full bg-green-600 text-white font-semibold p-3 rounded-lg"
                >
                    Accept
                </button>

                <button 
                    onClick={() => props.setRidePopupPanel(false)}
                    className="w-full mt-2 bg-gray-300 text-gray-700 font-semibold p-3 rounded-lg"
                >
                    Ignore
                </button>
            </div>
        </div>
    );
};

export default RidePopUp;
