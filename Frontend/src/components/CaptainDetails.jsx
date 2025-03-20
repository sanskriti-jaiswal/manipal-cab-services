import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext'; 

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext);

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm">
            {/* Header with Captain Info and Earnings */}
            <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                    <img 
                        className='h-12 w-12 rounded-full object-cover border-2 border-gray-200' 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" 
                        alt="Profile" 
                    />
                    <div>
                        <h4 className='text-lg font-semibold capitalize text-gray-800'>
                            {captain?.fullname?.firstname + " " + captain?.fullname?.lastname}
                        </h4>
                        <p className='text-xs text-gray-500'>Captain</p>
                    </div>
                </div>
                <div className='text-right'>
                    <h4 className='text-xl font-bold text-gray-800'>₹295.20</h4>
                    <p className='text-xs text-gray-500'>Total Earnings</p>
                </div>
            </div>

            {/* Stats Section */}
            <div className='grid grid-cols-3 gap-4 mt-4'>
                <div className='bg-gray-50 rounded-lg p-4 text-center'>
                    <i className="text-2xl mb-2 text-blue-500 ri-timer-2-line"></i>
                    <h5 className='text-lg font-semibold text-gray-800'>10.2</h5>
                    <p className='text-xs text-gray-500'>Hours Online</p>
                </div>
                <div className='bg-gray-50 rounded-lg p-4 text-center'>
                    <i className="text-2xl mb-2 text-green-500 ri-speed-up-line"></i>
                    <h5 className='text-lg font-semibold text-gray-800'>10.2</h5>
                    <p className='text-xs text-gray-500'>Rides Completed</p>
                </div>
                <div className='bg-gray-50 rounded-lg p-4 text-center'>
                    <i className="text-2xl mb-2 text-yellow-500 ri-booklet-line"></i>
                    <h5 className='text-lg font-semibold text-gray-800'>4.8</h5>
                    <p className='text-xs text-gray-500'>Rating</p>
                </div>
            </div>
            
            {/* Recent Activity Section */}
            <div className='mt-6'>
                <h4 className='text-sm font-medium text-gray-500 mb-3'>RECENT ACTIVITY</h4>
                <div className='bg-gray-50 rounded-lg p-3 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <div className='h-8 w-8 rounded-full bg-green-100 flex items-center justify-center'>
                            <i className="text-green-500 ri-checkbox-circle-line"></i>
                        </div>
                        <div>
                            <p className='text-sm font-medium text-gray-800'>Ride Completed</p>
                            <p className='text-xs text-gray-500'>Today, 10:30 AM</p>
                        </div>
                    </div>
                    <p className='text-sm font-semibold text-green-500'>+₹120.00</p>
                </div>
            </div>
        </div>
    );
};

export default CaptainDetails;