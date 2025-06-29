// src/pages/LandingPage.jsx

import { motion } from "framer-motion";
import Register from "./Register";
import Login from "./Login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  // Handler to show login after successful registration
  const handleRegistered = () => setShowLogin(true);

  // Handler to show login when user clicks "Login here"
  const handleShowLogin = () => setShowLogin(true);

  // Handler to show register when user clicks "Create new account"
  const handleShowRegister = () => setShowLogin(false);


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-amber-100 overflow-y-hidden">
     
      <div className="flex flex-col md:flex-row w-full justify-center gap-2 flex-1">
        <div className="left w-full md:w-[60%] flex flex-col items-center justify-center px-4 py-8">
          <motion.h1
            className="flex flex-wrap md:flex-nowrap gap-1 justify-center text-4xl md:text-6xl font-extrabold text-center mb-4 md:whitespace-nowrap"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-amber-500">Welcome to</span>
            <span className="text-[#343434]">SignetFlow</span>
          </motion.h1>
          <motion.h2
            className="text-lg md:text-2xl text-gray-600 mb-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Sign. Seal. Deliver.
          </motion.h2>
        </div>
        <div className="right w-full md:w-[40%] flex mb-4 items-center justify-center px-4 py-8">
          {!showLogin ? (
            <Register
              onRegistered={handleRegistered}
              onShowLogin={handleShowLogin}
            />
          ) : (
            <Login onShowRegister={handleShowRegister} />
          )}
        </div>
      </div>
    </div>
  );
}
