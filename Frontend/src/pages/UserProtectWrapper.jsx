import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(true);
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    if (!token) {
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
        if (!hasJoinedRef.current && userData?._id && socket.connected) {
          const payload = { userId: userData._id, userType: "user" };
          console.log("🚀 Emitting 'user-client-join' with:", payload);
          try {
            console.log("🚀 Emitting 'user-client-join' with:", payload);
            socket.emit("user-client-join", payload);
          } catch (err) {
            console.error("❌ Failed to emit:", err);
          }
          
          hasJoinedRef.current = true;
        }
      };

      if (socket.connected) {
        sendJoin();
      } else {
        socket.once("connect", sendJoin);
      }
    }).catch((err) => {
      console.error("Profile fetch failed:", err);
      localStorage.removeItem("token");
      navigate('/login');
    });
  }, [token]);

  if (isLoading) return <div>Loading...</div>;
  return <>{children}</>;
};

export default UserProtectWrapper;
