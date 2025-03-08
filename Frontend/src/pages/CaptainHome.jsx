import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const ridePopupPanelRef = useRef(null);
    const [ride, setRide] = useState(null);

    const { captain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!captain || !captain._id) {
            navigate('/captain-login');
            return;
        }

        // Simulate receiving a new ride request (Mock Example)
        const timer = setTimeout(() => {
            setRide({
                user: { fullname: { firstname: "John", lastname: "Doe" }, profileImage: "https://i.pravatar.cc/100" },
                pickup: "20B, Near Singhai's Cafe, Bhopal",
                destination: "24B, Near Kapoor's Cafe, Bhopal",
                fare: "295.20",
                distance: "4.5 KM"
            });
            setRidePopupPanel(true);
        }, 5000);
        
        return () => clearTimeout(timer);
    }, [captain, navigate]);

    const confirmRide = () => {
        console.log("Ride Confirmed:", ride);
        setRidePopupPanel(false);
    };

    useGSAP(() => {
        if (ridePopupPanelRef.current) {
            gsap.to(ridePopupPanelRef.current, {
                transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)',
                duration: 0.3
            });
        }
    }, [ridePopupPanel]);

    return (
        <div className="h-screen">
            {/* Navbar */}
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen bg-white shadow-md z-10">
                <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
                <Link to="/captain-logout" className="h-10 w-10 bg-gray-200 flex items-center justify-center rounded-full shadow">
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* Map Section */}
            <div className="h-3/5 pt-16">
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Live Tracking" />
            </div>

            {/* Captain Details */}
            <div className="h-2/5 p-6">
                <CaptainDetails />
            </div>

            {/* Ride PopUp */}
            {ride && (
                <div ref={ridePopupPanelRef} className="fixed w-full bottom-0 translate-y-full bg-white px-3 py-10 pt-12 shadow-lg z-20">
                    <RidePopUp 
                        ride={ride} 
                        setRidePopupPanel={setRidePopupPanel} 
                        confirmRide={confirmRide} 
                    />
                </div>
            )}
        </div>
    );
};

export default CaptainHome;