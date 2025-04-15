import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [cabAgency, setCabAgency] = useState('');
  const [error, setError] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(15);
  const [phone, setPhone] = useState('');

  const vehicleCapacityLimits = {
    'Mini': 3,
    'Sedan': 4,
    'SUV': 8,
    'Traveller': 15
  };

  useEffect(() => {
    if (vehicleType) {
      const newMaxCapacity = vehicleCapacityLimits[vehicleType];
      setMaxCapacity(newMaxCapacity);
      if (vehicleCapacity > newMaxCapacity) {
        setVehicleCapacity(newMaxCapacity.toString());
      }
    }
  }, [vehicleType]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
      },
      email: email.trim(),
      phone: phone.trim(), // ✅ ADD THIS
      password,
      cabAgency,
      vehicle: {
        color: vehicleColor.trim(),
        plate: vehiclePlate.trim(),
        capacity: Number(vehicleCapacity),
        vehicleType,
      },
    };
    

    console.log("🚀 Sending captain data:", JSON.stringify(captainData, null, 2));

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      console.error("❌ Signup error:", error.response?.data || error);
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="/logo.png" alt="logo" />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name?</h3>
          <div className='flex gap-4 mb-7'>
            <input required className='bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-lg' type="text" placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input required className='bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-lg' type="text" placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's our Captain's email?</h3>
          <input required value={email} onChange={(e) => setEmail(e.target.value)} className='bg-gray-200 mb-7 rounded-lg px-4 py-2 border w-full text-lg' type="email" placeholder='email@example.com' />

          <h3 className='text-lg font-medium mb-2'>Phone Number</h3>
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='bg-gray-200 mb-7 rounded-lg px-4 py-2 border w-full text-lg'
            type="tel"
            placeholder='e.g. 9876543210'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input className='bg-gray-200 mb-7 rounded-lg px-4 py-2 border w-full text-lg' value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder='password' />

          <h3 className='text-lg font-medium mb-2'>Cab Agency Name</h3>
          <select
            required
            className='bg-gray-200 mb-7 rounded-lg px-4 py-2 border w-full text-lg'
            value={cabAgency}
            onChange={(e) => setCabAgency(e.target.value)}
          >
            <option value="" disabled>Select your cab agency</option>
            <option value="Shree Ram Travels">Shree Ram Travels</option>
            <option value="Hare Travells">Hare Travells</option>
            <option value="Kavya Cab Services">Kavya Cab Services</option>
          </select>

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input required className='bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-lg' type="text" placeholder='Vehicle Color' value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} />
            <input required className='bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-lg' type="text" placeholder='Vehicle Plate' value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} />
          </div>

          <div className='flex gap-4 mb-7'>
            <select
              required
              className='bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-lg'
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              disabled={!vehicleType}
            >
              <option value="" disabled>Vehicle Capacity</option>
              {vehicleType && [...Array(vehicleCapacityLimits[vehicleType])].map((_, index) => (
                <option key={index + 1} value={index + 1}>{index + 1}</option>
              ))}
            </select>
            <select
              required
              className='bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-lg'
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="Mini">Mini</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Traveller">Traveller</option>
            </select>
          </div>

          {vehicleType && (
            <p className="text-sm text-gray-600 mb-4">
              Maximum capacity for {vehicleType}: {vehicleCapacityLimits[vehicleType]} passengers
            </p>
          )}

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button type="submit" className='bg-black text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'>
            Create Captain Account
          </button>
        </form>

        <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <p className='text-xs mt-6 text-gray-500'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span>.</p>
      </div>
    </div>
  );
};

export default CaptainSignup;
