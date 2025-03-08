import React from 'react';

const WaitingForDriver = ({ waitingForDriver, ride }) => {
  return (
    <div className="bg-white p-6 rounded-t-lg shadow-lg w-full">
      {/* Close Button */}
      <h5 
        className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
        onClick={() => waitingForDriver(false)}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Driver Info Section */}
      <div className="flex items-center justify-between">
        <img className="h-16" src={ride?.vehicle?.img || "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"} alt="Vehicle" />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstname || "Driver Name"}</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate || "MP04 AB 1234"}</h4>
          <p className="text-sm text-gray-600">{ride?.vehicle?.name || "Vehicle Name"}</p>
        </div>
      </div>

      {/* Arrival Time Badge */}
      <div className="bg-black text-white px-4 py-2 rounded-lg text-sm absolute left-4 top-36">
        <span>Arrival</span> <br />
        <span className="text-lg font-semibold">{ride?.arrivalTime || "6 min"}</span>
      </div>

      {/* Ride Details */}
      <div className="w-full mt-5">
        {/* Pickup Location */}
        <div className="flex items-center gap-5 p-3 border-b">
          <i className="ri-map-pin-user-fill text-lg text-blue-500"></i>
          <div>
            <h3 className="text-md font-medium">Pickup</h3>
            <p className="text-sm text-gray-600">{ride?.pickup || "Not Selected"}</p>
          </div>
        </div>

        {/* Destination Location */}
        <div className="flex items-center gap-5 p-3 border-b">
          <i className="ri-map-pin-2-fill text-lg text-red-500"></i>
          <div>
            <h3 className="text-md font-medium">Destination</h3>
            <p className="text-sm text-gray-600">{ride?.destination || "Not Selected"}</p>
          </div>
        </div>

        {/* Fare Details */}
        <div className="flex items-center gap-5 p-3">
          <i className="ri-currency-line text-lg text-green-600"></i>
          <div>
            <h3 className="text-md font-medium">₹{ride?.fare || "0"}</h3>
            <p className="text-sm text-gray-600">Payment: Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
