import React, { useRef, useState, useEffect, useContext } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
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
                _id: "ride123",  // Mock ID
                user: { fullname: { firstname: "John", lastname: "Doe" }, profileImage: "https://i.pravatar.cc/100" },
                pickup: "Manipal University, Jaipur",
                destination: "Jaipur Junction, Station Road, Gopalbari, Jaipur, Rajasthan",
                fare: "295.20",
                distance: "4.5 KM"
            });
            setRidePopupPanel(true);
        }, 5000);
        
        return () => clearTimeout(timer);
    }, [captain, navigate]);

    const acceptRide = () => {
        console.log("Ride Accepted:", ride);
        setConfirmRidePopupPanel(true);
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
            {/* Navbar - Minimal Height */}
            <div className="fixed p-2 top-0 flex items-center justify-between w-full bg-white shadow-md z-10">
                <img className="w-10" src="logo.png" alt="Manipal Cabs Logo" />
                <Link to="/captain-logout" className="h-7 w-7 bg-gray-200 flex items-center justify-center rounded-full shadow">
                    <i className="text-base font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* Map Section - Reduced Height */}
            <div className="h-2/5 pt-10">
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Live Tracking" />
            </div>

            {/* Captain Details - Compact Layout */}
            <div className="h-3/5 p-2">
                <CaptainDetails />
            </div>

            {/* Ride PopUp - Centered, No Scroll */}
            {ride && ridePopupPanel && (
                <div 
                    ref={ridePopupPanelRef} 
                    className="fixed left-0 right-0 bottom-0 max-w-md mx-auto translate-y-full bg-white z-20"
                >
                    <RidePopUp 
                        ride={ride} 
                        setRidePopupPanel={setRidePopupPanel} 
                        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                        confirmRide={acceptRide}  
                    />
                </div>
            )}

            {/* Confirm Ride PopUp - Centered, No Scroll */}
            {confirmRidePopupPanel && (
                <div 
                    className="fixed left-0 right-0 bottom-0 max-w-md mx-auto bg-white z-30"
                >
                    <ConfirmRidePopUp 
                        ride={ride} 
                        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                        setRidePopupPanel={setRidePopupPanel}
                    />
                </div>
            )}
        </div>
    );
};

export default CaptainHome;