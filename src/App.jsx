import React from "react";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home"; // <-- Import Home
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
