import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Upload from "../components/Upload";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token) {
      navigate("/");
    } else {
      setUsername(user.name);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold mb-4 text-amber-600">
          {" "}
          Hii
          <span className="text-gray-700"> {username}</span>{" "}
          <span className="text-amber-600">
            <TypeAnimation
              sequence={[
                ", upload your file below...",
                2000,
                ", ready to sign documents?",
                2000,
                ", let’s manage your paperwork!",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ display: "inline-block" }}
            />
          </span>
        </h1>
      </div>
      <div>
        <Upload />
      </div>

      <div className="max-w-4xl mx-auto mt-12 p-8 bg-white/80 rounded-2xl shadow-2xl">
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
