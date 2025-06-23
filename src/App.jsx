import React from "react";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home"; // <-- Import Home
import MyDocuments from "./pages/MyDocuments";
import PDFPreview from "./pages/PDFPreview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} /> {/* Add this line */}
        <Route path="/my-documents" element={<MyDocuments />} />
        <Route path="/preview/:id" element={<PDFPreview />} />
      </Routes>
    </Router>
  );
}

export default App;
