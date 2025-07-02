import React from "react";
import Logo from "../assets/Logo.jpeg";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md py-2 shadow-md flex justify-center items-center transition-colors h-16 border-b border-teal-100">
      <div className="flex items-center gap-3">
       
        <span className="text-2xl font-bold text-teal-600 tracking-tight drop-shadow">
          Sign<span className="text-purple-700 font-extrabold">Secure</span>
        </span>
      </div>
    </nav>
  );
}
