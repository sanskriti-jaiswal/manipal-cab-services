import React from 'react';

const LookingForDriver = ({ selectedVehicle }) => {
    return (
        <div className="bg-white p-6 rounded-t-lg shadow-lg w-full flex flex-col items-center justify-center transition-all duration-300 h-screen">
            <div className="flex justify-center items-center mt-5">
                <i className="ri-loader-4-line animate-spin text-4xl text-gray-500"></i>
                <p className="ml-3 text-lg font-medium text-gray-700">Finding Driver...</p>
            </div>

            <h3 className="text-xl font-semibold mt-5 text-center">Looking for a Driver</h3>

            <img 
                className="h-24 mt-4"
                src={selectedVehicle?.img} 
                alt={selectedVehicle?.name || "Vehicle"}
            />

            <p className="text-gray-500 mt-3 text-center">
                This may take a few moments...
            </p>
        </div>
    );
};

export default LookingForDriver;
