import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(true);
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    if (!token) {
      console.warn("❌ No token found, redirecting to login...");
      navigate('/login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      const userData = res.data;
      setUser(userData);
      setIsLoading(false);

      if (!socket) {
        console.warn("⚠️ Socket not initialized");
        return;
      }

      const sendJoin = () => {
        const payload = {
          userId: userData._id,
          userType: "user"
        };

        if (!hasJoinedRef.current && socket.connected && payload.userId) {
          console.log("📤 Sending payload:", payload);
          socket.emit("user-client-join", payload); // 🚀 Ensure sending object
          hasJoinedRef.current = true;
        }
      };

      if (socket.connected) {
        sendJoin();
      } else {
        socket.once("connect", sendJoin);
      }
    }).catch((err) => {
      console.error("❌ Failed to fetch profile:", err);
      localStorage.removeItem("token");
      navigate('/login');
    });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return <>{children}</>;
};

export default UserProtectWrapper;
