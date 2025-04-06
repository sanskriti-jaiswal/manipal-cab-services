import React from 'react';

const LocationSearchPanel = ({ suggestions, onSelect, setPanelOpen }) => {
    return (
        <div className="mt-4 relative">
            <h4 className="text-lg font-bold text-black flex justify-end items-center">
                <span 
                    onClick={() => setPanelOpen(false)} 
                    className="text-2xl text-gray-500 cursor-pointer transition-opacity duration-300"
                >
                    <i className="ri-arrow-down-wide-line"></i>
                </span>
            </h4>

            <div className="flex flex-col gap-3 mt-2">
                {suggestions.map((suggestion, index) => (
                    <div 
                        key={index} 
                        onClick={() => onSelect(suggestion.description)} 
                        className="flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300 
                                   bg-gray-100 hover:bg-gray-200"
                    >
                        <i className="ri-map-pin-2-fill text-lg text-red-500"></i>
                        <h4 className="font-medium text-black">
                            {suggestion.description}
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationSearchPanel;
