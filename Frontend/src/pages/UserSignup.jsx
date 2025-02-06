import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Registering user:", { firstName, lastName, email, password });
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <h3 className="text-lg w-1/2 font-medium mb-2">What's your name?</h3>
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

        <button className="bg-black text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg">Create account</button>
      </div>
      <div>
        <p className="text-center">Already have an account? <Link to="/login" className="text-blue-600">Login here</Link></p>
      </div>
    </div>
  );
};

export default UserSignup;