import React from 'react';

const VehiclePanel = ({ setShowVehiclePanel, setConfirmRidePanel, setSelectedVehicle, setVehicleType, fare }) => {
    const vehicles = [
        {
            name: 'Mini',
            type: 'mini',
            seats: 3,
            time: '2 mins away',
            img: 'https://olawebcdn.com/merchandising-images/web/fleet/Mini/Maruthi_suzuki_Ritz.png'
        },
        {
            name: 'Sedan',
            type: 'sedan',
            seats: 4,
            time: '3 mins away',
            img: 'https://olawebcdn.com/merchandising-images/web/KYC_page/ride_category_images/Exec/Exec.png'
        },
        {
            name: 'SUV',
            type: 'suv',
            seats: 8,
            time: '5 mins away',
            img: 'https://www.gmenvolve.ca/content/dam/gmenvolve/na/ca/en/index/fleet/suvs-crossovers/01-images/suv-24trailblazer.jpg?imwidth=1200'
        },
        {
            name: 'Traveller',
            type: 'traveller',
            seats: 15,
            time: '8 mins away',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG9-h3sPshePPZWTxTNoHlvHDBnKzghaYUBw&s'
        }
    ];

    const handleVehicleSelect = (vehicle) => {
        const selectedFare = fare[vehicle.type] || 0;
        setSelectedVehicle({ ...vehicle, price: selectedFare });
        setVehicleType(vehicle.type);
        setShowVehiclePanel(false);
        setConfirmRidePanel(true);
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-lg w-full">
            <h5 className='text-center w-full text-gray-400 text-xl mb-2' onClick={() => setShowVehiclePanel(false)}>
                <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5 text-center">Choose a Vehicle</h3>
            <div className="flex flex-col gap-4">
                {vehicles.map((vehicle, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleVehicleSelect(vehicle)}
                        className="flex items-center justify-between bg-gray-100 p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-200 border-2 border-transparent active:border-black"
                    >
                        <img src={vehicle.img} alt={vehicle.name} className="w-16 h-auto rounded-md" />
                        <div className="flex flex-col ml-4 w-1/2">
                            <h4 className="text-lg font-semibold">{vehicle.name} <span className="ml-2"><i className="ri-user-3-fill"></i> {vehicle.seats}</span></h4>
                            <h5 className="text-gray-600 text-sm">{vehicle.time}</h5>
                            <p className='text-xs text-gray-500'>Reliable & comfortable</p>
                        </div>
                        <h2 className="text-xl font-bold text-black">₹{fare[vehicle.type] || '--'}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehiclePanel;
