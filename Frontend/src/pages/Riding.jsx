import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Added useLocation
import { useNavigate } from 'react-router-dom';

const Riding = () => {
    const location = useLocation();
    const { ride } = location.state || {}; // Retrieve ride data
    const navigate = useNavigate();

    return (
        <div className='h-screen bg-white'>
            {/* Home Button */}
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>

            {/* Map Placeholder */}
            <div className='h-1/2 bg-gray-200 flex items-center justify-center'>
                <p className='text-gray-600 text-lg'>Live Tracking Disabled</p>
            </div>

            {/* Ride Information */}
            <div className='h-1/2 p-5 bg-white shadow-lg rounded-t-lg'>
                <div className='flex items-center justify-between'>
                    <img className='h-16' src={ride?.vehicleImage || "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"} alt="Vehicle" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain?.fullname?.firstname || "Driver Name"}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate || "MP04 AB 1234"}</h4>
                        <p className='text-sm text-gray-600'>{ride?.captain?.vehicle?.model || "Maruti Suzuki Alto"}</p>
                    </div>
                </div>

                {/* Ride Details */}
                <div className='w-full mt-5'>
                    {/* Destination */}
                    <div className='flex items-center gap-5 p-3 border-b'>
                        <i className="text-lg ri-map-pin-2-fill text-red-500"></i>
                        <div>
                            <h3 className='text-md font-medium'>Destination</h3>
                            <p className='text-sm text-gray-600'>{ride?.destination || "Not Selected"}</p>
                        </div>
                    </div>

                    {/* Fare Details */}
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line text-green-600"></i>
                        <div>
                            <h3 className='text-md font-medium'>₹{ride?.fare || "0"}</h3>
                            <p className='text-sm text-gray-600'>Payment: Cash</p>
                        </div>
                    </div>
                </div>

                {/* Payment Button */}
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg transition-all duration-300 hover:bg-green-700'>
                    Make a Payment
                </button>
            </div>
        </div>
    );
};

export default Riding;
