import React, { useState } from 'react';

const LocationSearchPanel = ({ setShowVehiclePanel, setSelectedLocation, setPanelOpen }) => {
    const locations = [
        "24B, Near Kapoor's Cafe, Sheryians Coding School, Bhopal",
        "22C, Near Malhotra's Cafe, Sheryians Coding School, Bhopal",
        "20B, Near Singhai's Cafe, Sheryians Coding School, Bhopal",
        "18A, Near Sharma's Cafe, Sheryians Coding School, Bhopal"
    ];

    const [selected, setSelected] = useState(null);

    const handleLocationSelect = (location) => {
        setSelected(location);
        setSelectedLocation(location);
        setTimeout(() => setShowVehiclePanel(true), 300);
    };

    return (
        <div className="mt-4 relative">
            {/* Only Show Back Arrow in the Top Right Corner */}
            <h4 className="text-lg font-bold text-black flex justify-end items-center">
                <span 
                    onClick={() => setPanelOpen(false)} 
                    className="text-2xl text-gray-500 cursor-pointer transition-opacity duration-300"
                >
                    <i className="ri-arrow-down-wide-line"></i>
                </span>
            </h4>

            {/* Select Location Heading */}
            <h4 className="text-lg font-bold text-black text-center mt-2">Select a Location</h4>
            
            <div className="flex flex-col gap-3 mt-2">
                {locations.map((location, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleLocationSelect(location)}
                        className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300 
                            ${selected === location ? "bg-green-200 border border-green-500" : "bg-gray-100 hover:bg-gray-200"}`}
                    >
                        <i className="ri-map-pin-2-fill text-lg text-red-500"></i>
                        <h4 className="font-medium text-black">{location}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationSearchPanel;
