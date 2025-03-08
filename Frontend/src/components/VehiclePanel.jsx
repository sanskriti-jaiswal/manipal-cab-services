import React from 'react';

const VehiclePanel = ({ setShowVehiclePanel, setConfirmRidePanel, setSelectedVehicle }) => {
    const vehicles = [
        { name: 'Mini', seats: 3, price: 500, time: '2 mins away', img: 'https://olawebcdn.com/merchandising-images/web/fleet/Mini/Maruthi_suzuki_Ritz.png' },
        { name: 'Sedan', seats: 4, price: 800, time: '3 mins away', img: 'https://olawebcdn.com/merchandising-images/web/KYC_page/ride_category_images/Exec/Exec.png' },
        { name: 'SUV', seats: 8, price: 1200, time: '5 mins away', img: 'https://www.gmenvolve.ca/content/dam/gmenvolve/na/ca/en/index/fleet/suvs-crossovers/01-images/suv-24trailblazer.jpg?imwidth=1200' },
        { name: 'Traveller', seats: 15, price: 2000, time: '8 mins away', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG9-h3sPshePPZWTxTNoHlvHDBnKzghaYUBw&s' }
    ];

    const handleVehicleSelect = (vehicle) => {
        setSelectedVehicle(vehicle); // Set selected vehicle
        setShowVehiclePanel(false);  // Hide vehicle panel
        setConfirmRidePanel(true);   // Show confirm ride panel
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-lg w-full">
            <h3 className="text-2xl font-semibold mb-5 text-center">Choose a Vehicle</h3>
            <div className="flex flex-col gap-4">
                {vehicles.map((vehicle, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleVehicleSelect(vehicle)}
                        className="flex items-center justify-between bg-gray-100 p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-200"
                    >
                        <img src={vehicle.img} alt={vehicle.name} className="w-16 h-auto" />
                        <div className="flex flex-col">
                            <h4 className="text-lg font-semibold">{vehicle.name} <span className="ml-2"><i className="ri-user-3-fill"></i> {vehicle.seats}</span></h4>
                            <h5 className="text-gray-600">{vehicle.time}</h5>
                        </div>
                        <h2 className="text-xl font-bold text-black">₹{vehicle.price}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehiclePanel;
