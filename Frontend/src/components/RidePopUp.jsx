import React from 'react';

const RidePopUp = (props) => {
    // Using provided location for destination and Manipal University for pickup
    const pickup = "Manipal University, Jaipur";
    const destination = "Jaipur Junction, Station Road, Gopalbari, Jaipur, Rajasthan";
    
    return (
        <div className="bg-white rounded-t-3xl shadow-xl w-full overflow-hidden">
            {/* Subtle handle bar */}
            <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 bg-gray-200 rounded-full"></div>
            </div>
            
            {/* Header - Cleaner typography */}
            <h3 className="text-xl font-bold text-center text-gray-800 mb-5">
                New Ride Available!
            </h3>

            {/* User & Distance Box - More refined yellow */}
            <div className="flex items-center justify-between p-4 bg-amber-300 mx-4 mb-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                    <img 
                        className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm" 
                        src={props.ride?.user?.profileImage || "https://via.placeholder.com/100"} 
                        alt="User"
                    />
                    <h2 className="text-lg font-semibold text-gray-800 capitalize">{props.ride?.user?.fullname?.firstname}</h2>
                </div>
                <h5 className="text-lg font-bold text-gray-800">{props.ride?.distance}</h5>
            </div>

            {/* Ride Details - Center aligned content with more visible dividers */}
            <div className="px-6">
                {/* Pickup */}
                <div className="flex items-start gap-4 py-3.5 border-b border-gray-300">
                    <div className="mt-1 w-6">
                        <i className="ri-map-pin-user-fill text-xl text-black"></i>
                    </div>
                    <div className="text-center w-full">
                        <p className="text-base font-medium text-gray-800">Pickup</p>
                        <p className="text-sm text-gray-500">{pickup}</p>
                    </div>
                </div>

                {/* Destination */}
                <div className="flex items-start gap-4 py-3.5 border-b border-gray-300">
                    <div className="mt-1 w-6">
                        <i className="ri-map-pin-2-fill text-xl text-black"></i>
                    </div>
                    <div className="text-center w-full">
                        <p className="text-base font-medium text-gray-800">Destination</p>
                        <p className="text-sm text-gray-500">{destination}</p>
                    </div>
                </div>

                {/* Fare & Payment - Center aligned */}
                <div className="flex items-start gap-4 py-3.5">
                    <div className="mt-1 w-6">
                        <i className="ri-currency-line text-xl text-black"></i>
                    </div>
                    <div className="text-center w-full">
                        <p className="text-base font-bold text-gray-800">₹{props.ride?.fare}</p>
                        <p className="text-sm text-gray-500">Cash</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons - Modern style with proper spacing */}
            <div className="px-6 pt-6 pb-8">
                <button 
                    onClick={props.confirmRide}
                    className="w-full bg-green-500 text-white font-semibold py-3.5 rounded-xl shadow-sm hover:bg-green-600 transition duration-200 mb-3 text-base"
                >
                    Accept
                </button>

                <button 
                    onClick={() => props.setRidePopupPanel(false)}
                    className="w-full bg-gray-100 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-200 transition duration-200 text-base"
                >
                    Ignore
                </button>
            </div>
        </div>
    );
};

export default RidePopUp;