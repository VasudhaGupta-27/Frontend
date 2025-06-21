import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-100">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-12 p-8 bg-white/80 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-amber-600 mb-4">Dashboard</h1>
        <p className="text-lg text-gray-700 mb-8">
          Welcome to your SignetFlow dashboard! Here you can manage your documents, view signatures, and more.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-4xl mb-2">📄</span>
            <span className="font-semibold text-lg">My Documents</span>
            <span className="text-gray-500 text-sm mt-1">0 uploaded</span>
          </div>
          <div className="bg-amber-100 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-4xl mb-2">✍️</span>
            <span className="font-semibold text-lg">Pending Signatures</span>
            <span className="text-gray-500 text-sm mt-1">0 pending</span>
          </div>
          <div className="bg-green-100 rounded-xl p-6 shadow flex flex-col items-center">
            <span className="text-4xl mb-2">✅</span>
            <span className="font-semibold text-lg">Completed</span>
            <span className="text-gray-500 text-sm mt-1">0 signed</span>
          </div>
        </div>
      </div>
    </div>
  );
}