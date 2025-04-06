import React from "react";
import { Routes, Route } from "react-router-dom";

// Core Pages
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import CaptainHome from "./pages/CaptainHome"; // ✅ THIS WAS MISSING

// Protect Wrappers
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";

// Logout Pages
import UserLogout from "./pages/UserLogout";
import CaptainLogout from "./pages/CaptainLogout";

// Prebooking + Cab Pooling Pages
import PrebookForm from "./pages/PrebookForm";
import PrebookConfirmed from "./pages/PrebookConfirmed";
import CabPoolingForm from "./pages/CabPoolingForm";
import CabPooling from "./pages/CabPooling";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Landing & Auth */}
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />

        {/* User Routes */}
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route path="/riding" element={<Riding />} />

        {/* Captain Routes */}
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
        <Route path="/captain-riding" element={<CaptainRiding />} />

        {/* Prebook + Pooling Routes */}
        <Route
          path="/prebook"
          element={
            <UserProtectWrapper>
              <PrebookForm />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/prebook-confirmed"
          element={
            <UserProtectWrapper>
              <PrebookConfirmed />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/cab-pooling"
          element={
            <UserProtectWrapper>
              <CabPoolingForm />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/all-pooled-cabs"
          element={
            <UserProtectWrapper>
              <CabPooling />
            </UserProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
