import React, { useEffect, useContext } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const UserLogout = () => {
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        localStorage.removeItem('token');
        setUser(null);
        navigate('/login', { replace: true }); // ✅ replace to remove logout from history
      } catch (err) {
        console.error("Logout failed:", err);
        navigate('/login', { replace: true });
      }
    };

    logout();
  }, [navigate, setUser]);

  return (
    <div className="text-gray-600 h-screen flex items-center justify-center">
      Logging out...
    </div>
  );
};

export default UserLogout;
