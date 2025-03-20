import React from 'react';
import { useNavigate } from 'react-router-dom';

const FinishRide = (props) => {
    const navigate = useNavigate();

    async function endRide() {
        console.log("🚀 Ending ride for ID:", props.ride?._id);

        // ✅ Simulating API Call (Remove this if API is already working)
        setTimeout(() => {
            console.log("✅ Ride Ended! Redirecting...");
            navigate('/captain-home'); // Navigate to Captain Home
        }, 1000);
    }

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white p-6 rounded-t-3xl shadow-xl h-[70vh] flex flex-col justify-between">
            {/* Subtle handle bar */}
            <div className="flex justify-center pt-3 pb-2 absolute top-0 left-0 right-0">
                <div className="w-10 h-1 bg-gray-200 rounded-full"></div>
            </div>

            {/* Title */}
            <h3 className='text-xl font-bold text-center mt-6'>Finish this Ride</h3>

            {/* User & Distance Box (Yellow Background) */}
            <div className='flex items-center justify-between p-4 bg-amber-300 rounded-xl shadow-sm mt-4'>
                <div className='flex items-center gap-3'>
                    <img 
                        className='h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm' 
                        src={props.ride?.user?.profileImage || "https://via.placeholder.com/100"} 
                        alt="User"
                    />
                    <h2 className='text-lg font-semibold text-gray-800'>{props.ride?.user?.fullname?.firstname}</h2>
                </div>
                <h5 className='text-lg font-bold text-gray-800'>{props.ride?.distance || '4.5 KM'}</h5>
            </div>

            {/* Ride Details */}
            <div className='w-full flex-grow px-2 mt-4'>
                {/* Pickup */}
                <div className='flex items-start gap-4 py-3.5 border-b border-gray-300'>
                    <div className="mt-1 w-6">
                        <i className="ri-map-pin-user-fill text-xl text-black"></i>
                    </div>
                    <div className="text-center w-full">
                        <p className="text-base font-medium text-gray-800">Pickup</p>
                        <p className="text-sm text-gray-500">{props.ride?.pickup}</p>
                    </div>
                </div>

                {/* Destination */}
                <div className='flex items-start gap-4 py-3.5 border-b border-gray-300'>
                    <div className="mt-1 w-6">
                        <i className="ri-map-pin-2-fill text-xl text-black"></i>
                    </div>
                    <div className="text-center w-full">
                        <p className="text-base font-medium text-gray-800">Destination</p>
                        <p className="text-sm text-gray-500">{props.ride?.destination}</p>
                    </div>
                </div>

                {/* Fare & Payment (Centered with icon) */}
                <div className='flex items-start gap-4 py-3.5'>
                    <div className="mt-1 w-6">
                        <i className="ri-currency-line text-xl text-black"></i>
                    </div>
                    <div className="text-center w-full">
                        <p className="text-base font-bold text-gray-800">₹{props.ride?.fare}</p>
                        <p className="text-sm text-gray-500">Cash</p>
                    </div>
                </div>
            </div>

            {/* Finish Ride Button (Always Visible) */}
            <div className='w-full mt-2'>
                <button
                    onClick={endRide}
                    className='w-full bg-green-500 text-white font-semibold py-3.5 rounded-xl shadow-sm hover:bg-green-600 transition duration-200 text-base'
                >
                    Finish Ride
                </button>
            </div>
        </div>
    );
};

export default FinishRide;