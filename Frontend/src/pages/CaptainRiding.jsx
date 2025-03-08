import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {
    const location = useLocation();
    const rideData = location.state?.ride;

    // ✅ State to control the finish ride pop-up
    const [finishRidePanel, setFinishRidePanel] = useState(false);

    console.log("🚀 Ride Data in CaptainRiding:", rideData);

    return (
        <div className='h-screen relative flex flex-col justify-end'>
            {/* Navbar */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen bg-white shadow-md z-10'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
                <Link to='/captain-home' className='h-10 w-10 bg-gray-200 flex items-center justify-center rounded-full shadow-lg'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* Map Section */}
            <div className="h-[75vh] pt-16">
                <img 
                    className="h-full w-full object-cover" 
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" 
                    alt="Live Tracking" 
                />
            </div>

            {/* Ride Status Panel - Styled Exactly Like the Reference */}
            <div className='h-1/5 bg-yellow-400 w-full flex flex-col items-center justify-center relative shadow-lg'>
                
                

                {/* Horizontal Layout for Distance & Complete Ride Button */}
                <div className="flex items-center justify-between w-full px-6 mt-5">
                    <h4 className='text-xl font-semibold'>{rideData?.distance || '4 KM away'}</h4>
                    <button 
                        className='bg-green-600 text-white font-semibold p-3 px-8 rounded-lg'
                        onClick={() => setFinishRidePanel(true)} // ✅ Open Finish Ride Panel
                    >
                        Complete Ride
                    </button>
                </div>
            </div>

            {/* ✅ Finish Ride Pop-Up */}
            {finishRidePanel && (
                <div className="fixed w-full bottom-0 bg-white px-3 py-10 pt-12 shadow-lg z-30">
                    <FinishRide 
                        ride={rideData} 
                        setFinishRidePanel={setFinishRidePanel} 
                    />
                </div>
            )}
        </div>
    );
};

export default CaptainRiding;
