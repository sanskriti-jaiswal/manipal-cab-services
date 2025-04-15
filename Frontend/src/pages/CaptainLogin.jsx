import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const [identifier, setIdentifier] = useState(""); // ✅ changed from email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        { identifier, password } // ✅ updated
      );

      if (response.status === 200) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captain-home");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <img className="w-20 mb-3" src="/logo.png" alt="logo" />

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">Email or Phone Number</h3>
          <input
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg"
            type="text"
            placeholder="email@example.com or 9876543210"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg"
            type="password"
            placeholder="password"
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button type="submit" className="bg-[#111] text-white font-semibold rounded-lg px-4 py-2 w-full text-lg">
            Login
          </button>
        </form>

        <p className="text-center">
          Don't have an account? <a href="/captain-signup" className="text-blue-600">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default CaptainLogin;  
