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
        <div className="bg-white p-6 rounded-t-2xl shadow-lg w-full">
            {/* Header */}
            <h3 className="text-lg font-semibold text-center text-gray-900">
                Confirm this ride to Start
            </h3>

            {/* User & Distance Box */}
            <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg shadow-md mt-4">
                <div className="flex items-center gap-3">
                    <img 
                        className="h-12 w-12 rounded-full object-cover" 
                        src={props.ride?.user?.profileImage || "https://via.placeholder.com/100"} 
                        alt="User"
                    />
                    <h2 className="text-md font-semibold capitalize">{props.ride?.user?.fullname?.firstname}</h2>
                </div>
                <h5 className="text-md font-bold">{props.ride?.distance.replace("KM KM", "KM")}</h5>
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

                {/* Fare & Payment */}
                <div className="flex flex-col items-center gap-2 p-4">
                    <div className="flex items-center gap-2">
                        <i className="ri-currency-line text-lg text-black"></i>
                        <h3 className="text-md font-semibold">₹{props.ride?.fare}</h3>
                    </div>
                    <p className="text-sm text-gray-600">Payment: Cash</p>
                </div>
            </div>

            {/* OTP Input (Frontend Only) */}
            <form onSubmit={submitHandler}>
                <input 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    type="text" 
                    className="bg-gray-200 px-6 py-4 font-mono text-lg rounded-lg w-full mt-3 text-center"
                    placeholder="Enter OTP"
                />

                <button 
                    type="submit" 
                    className="w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
                >
                    Confirm
                </button>

                <button 
                    type="button" 
                    onClick={() => props.setConfirmRidePopupPanel(false)}
                    className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ConfirmRidePopUp;
