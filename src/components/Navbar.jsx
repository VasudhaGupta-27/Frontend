import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.jpeg";

export default function Navbar() {
  return (
    <nav className="bg-white py-2 shadow-md flex justify-center items-center transition-colors">
      <img className=" w-35" src={Logo} alt="" srcset="" />
    </nav>
  );
}
