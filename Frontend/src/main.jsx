import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContext from "./context/UserContext.jsx";
import CaptainProvider from "./context/CaptainContext.jsx";
import SocketProvider from "./context/SocketContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <CaptainProvider>
          <UserContext>
            <App />
          </UserContext>
        </CaptainProvider>
      </SocketProvider>
    </BrowserRouter>
  </StrictMode>
);
