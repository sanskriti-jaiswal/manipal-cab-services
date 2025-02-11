import React, { useState, useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserDataContext } from "../context/UserContext";  // Import the context

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(""); // State for error handling

  const navigate = useNavigate(); 
  const { setUser } = useContext(UserDataContext);  // Use context here

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Validate inputs
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required!");
      return;
    }

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);  // Set the user data in context
        localStorage.setItem("token", data.token); // Store token in local storage
        navigate('/home'); // Navigate to home page
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Signup failed. Please try again.");
    }

    // Reset form fields
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className='w-20 mb-3 ' src="/logo.png" alt="manipal logo" />
        <h3 className="text-lg font-medium mb-2">What's your name?</h3>
        
        {/* ✅ Wrap inside a form */}
        <form onSubmit={submitHandler}>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-200 mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-gray-200 mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="password"
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>} {/* Display error message if any */}

          <button
            type="submit" // ✅ Make sure it's a submit button
            className="bg-black text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg"
          >
            Create account
          </button>
        </form>

        <p className="text-center">
          Already have an account? <Link to="/login" className="text-blue-600">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
