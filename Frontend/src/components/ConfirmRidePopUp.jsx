import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    console.log("🚀 Ride Data in ConfirmRidePopUp:", props.ride); // Debugging log

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("✅ OTP Entered:", otp);
        console.log("🎉 Ride Confirmed, Navigating to CaptainRiding...");
        
        // ✅ Directly navigate to CaptainRiding (No OTP validation)
        navigate('/captain-riding', { replace: true, state: { ride: props.ride } });
    };

    return (
        <div className="bg-white rounded-t-3xl shadow-xl w-full overflow-hidden">
            {/* Subtle handle bar */}
            <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 bg-gray-200 rounded-full"></div>
            </div>
            
            {/* Header */}
            <h3 className="text-xl font-bold text-center text-gray-800 mb-5">
                Confirm this ride to Start
            </h3>

            {/* User & Distance Box */}
            <div className="flex items-center justify-between p-4 bg-amber-300 mx-4 mb-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                    <img 
                        className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm" 
                        src={props.ride?.user?.profileImage || "https://via.placeholder.com/100"} 
                        alt="User"
                    />
                    <h2 className="text-lg font-semibold text-gray-800 capitalize">{props.ride?.user?.fullname?.firstname}</h2>
                </div>
                <h5 className="text-lg font-bold text-gray-800">{props.ride?.distance?.replace("KM KM", "KM")}</h5>
            </div>

            {/* Ride Details */}
            <div className="px-6">
                {/* Pickup */}
                <div className="flex items-start gap-4 py-3.5 border-b border-gray-300">
                    <div className="mt-1 w-6">
                        <i className="ri-map-pin-user-fill text-xl text-black"></i>
                    </div>
                    <div className="text-center w-full">
                        <p className="text-base font-medium text-gray-800">Pickup</p>
                        <p className="text-sm text-gray-500">{props.ride?.pickup}</p>
                    </div>
                </div>

                {/* Destination */}
                <div className="flex items-start gap-4 py-3.5 border-b border-gray-300">
                    <div className="mt-1 w-6">
                        <i className="ri-map-pin-2-fill text-xl text-black"></i>
                    </div>
                    <div className="text-center w-full">
                        <p className="text-base font-medium text-gray-800">Destination</p>
                        <p className="text-sm text-gray-500">{props.ride?.destination}</p>
                    </div>
                </div>

                {/* Fare & Payment */}
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

            {/* OTP Input (Frontend Only) */}
            <form onSubmit={submitHandler} className="px-6 pt-4 pb-8">
                <input 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    type="text" 
                    className="bg-gray-100 px-6 py-4 font-mono text-lg rounded-xl w-full mt-3 text-center shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter OTP"
                />

                <button 
                    type="submit" 
                    className="w-full mt-5 bg-green-500 text-white font-semibold py-3.5 rounded-xl shadow-sm hover:bg-green-600 transition duration-200 text-base"
                >
                    Confirm
                </button>

                <button 
                    type="button" 
                    onClick={() => props.setConfirmRidePopupPanel(false)}
                    className="w-full mt-3 bg-red-500 text-white font-semibold py-3.5 rounded-xl shadow-sm hover:bg-red-600 transition duration-200 text-base"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ConfirmRidePopUp;