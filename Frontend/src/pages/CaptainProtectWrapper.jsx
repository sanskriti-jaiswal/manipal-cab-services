import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                console.log("API Response:", response.data);
                
                if (response.data && response.data.captain) {
                    setCaptain(response.data.captain);
                    setIsLoading(false);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (err) {
                console.error("API Error:", err.response?.data || err.message);
                localStorage.removeItem('token');
                navigate('/captain-login');
            }
        };

        fetchProfile();
    }, [token, navigate, setCaptain]);

    if (isLoading) {
        return <div className="flex h-screen w-screen items-center justify-center">Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;