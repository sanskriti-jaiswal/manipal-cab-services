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
        <div className="fixed bottom-0 left-0 w-full bg-white p-6 rounded-t-2xl shadow-lg h-[70vh] flex flex-col justify-between">
            {/* Down Arrow to Close Panel */}
            <h5 
                className='p-1 text-center w-full absolute top-2 cursor-pointer'
                onClick={() => props.setFinishRidePanel(false)}
            >
                <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            </h5>

            {/* Title */}
            <h3 className='text-xl font-semibold text-center mt-6'>Finish this Ride</h3>

            {/* User & Distance Box (Yellow Background) */}
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg shadow-md mt-4'>
                <div className='flex items-center gap-3'>
                    <img 
                        className='h-12 w-12 rounded-full object-cover' 
                        src={props.ride?.user?.profileImage || "https://via.placeholder.com/100"} 
                        alt="User"
                    />
                    <h2 className='text-md font-medium'>{props.ride?.user?.fullname?.firstname}</h2>
                </div>
                <h5 className='text-md font-semibold'>{props.ride?.distance || '4.5 KM'}</h5>
            </div>

            {/* Ride Details */}
            <div className='w-full flex-grow'>
                {/* Pickup */}
                <div className='flex items-center gap-4 p-3 border-b'>
                    <i className="ri-map-pin-user-fill text-lg"></i>
                    <div>
                        <h3 className='text-md font-medium'>Pickup</h3>
                        <p className='text-sm text-gray-600'>{props.ride?.pickup}</p>
                    </div>
                </div>

                {/* Destination */}
                <div className='flex items-center gap-4 p-3 border-b'>
                    <i className="ri-map-pin-2-fill text-lg"></i>
                    <div>
                        <h3 className='text-md font-medium'>Destination</h3>
                        <p className='text-sm text-gray-600'>{props.ride?.destination}</p>
                    </div>
                </div>

                {/* Fare & Payment (Centered) */}
                <div className='flex flex-col items-center gap-1 p-3'>
                    <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                    <p className='text-sm text-gray-600'>Payment: Cash</p>
                </div>
            </div>

            {/* Finish Ride Button (Always Visible) */}
            <div className='w-full mt-2'>
                <button
                    onClick={endRide}
                    className='w-full text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'
                >
                    Finish Ride
                </button>
            </div>
        </div>
    );
};

export default FinishRide;
