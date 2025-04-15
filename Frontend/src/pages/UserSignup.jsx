import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebase";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          console.log("Recaptcha verified:", response);
        },
        "expired-callback": () => {
          console.warn("Recaptcha expired");
        },
      });
    }
  };

  const handleSendOtp = async () => {
    setError("");

    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const fullPhone = "+91" + phone.trim();

      const confirmation = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setConfirmationResult(confirmation);
      setStep(2);
    } catch (err) {
      console.error("OTP error:", err);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtpAndRegister = async () => {
    if (!otp || !confirmationResult) {
      setError("Please enter the OTP sent to your phone.");
      return;
    }

    try {
      await confirmationResult.confirm(otp);

      const newUser = {
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
        email: email.trim(),
        phone: phone.trim(),
        password
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (err) {
      console.error("Verification/Register error:", err);
      const msg = err.response?.data?.message || "Invalid OTP or registration failed.";
      setError(msg);
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-20 mb-3" src="/logo.png" alt="manipal logo" />

        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}>
            <h3 className="text-lg font-medium mb-2">What's your name?</h3>
            <div className="flex gap-4 mb-7">
              <input required className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-lg" type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              <input required className="bg-gray-200 w-1/2 rounded-lg px-4 py-2 border text-lg" type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>

            <h3 className="text-lg font-medium mb-2">What's your email?</h3>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 mb-7 rounded-lg px-4 py-2 border w-full text-lg" type="email" placeholder="email@example.com" />

            <h3 className="text-lg font-medium mb-2">Phone Number</h3>
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-gray-200 mb-7 rounded-lg px-4 py-2 border w-full text-lg" type="text" placeholder="9876543210" />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input required className="bg-gray-200 mb-7 rounded-lg px-4 py-2 border w-full text-lg" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <button type="submit" className="bg-black text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg">
              Send OTP
            </button>

            {/* Only once */}
            <div id="recaptcha-container"></div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtpAndRegister(); }}>
            <h3 className="text-lg font-medium mb-2">Enter OTP sent to +91 {phone}</h3>
            <input required value={otp} onChange={(e) => setOtp(e.target.value)} className="bg-gray-200 mb-5 rounded-lg px-4 py-2 border w-full text-lg" type="text" placeholder="Enter OTP" />

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <button type="submit" className="bg-green-600 text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg">
              Verify OTP & Register
            </button>
          </form>
        )}

        <p className="text-center">
          Already have an account? <Link to="/login" className="text-blue-600">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
