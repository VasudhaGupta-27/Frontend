import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Upload from "../components/Upload";
import { TypeAnimation } from "react-type-animation";
import API from "../utils/api";

export default function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [docs, setDocs] = useState([]);
  const [Pendocs, setPendocs] = useState([]);
  const [Signeddocs, setSigneddocs] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [rejected, setrejected] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token) {
      navigate("/");
    } else {
      setUsername(user.name);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/docs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocs(res.data);
      } catch (err) {
        console.error("Error fetching documents", err);
      }
    };

    fetchDocs();
    const fetchPending = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/docs/pending", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendocs(res.data);
      } catch (err) {
        console.error("Error fetching documents", err);
      }
    };

    fetchPending();
    const fetchSignedDoc = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/docs/signed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSigneddocs(res.data);
      } catch (err) {
        console.error("Error fetching documents", err);
      }
    };

    fetchSignedDoc();
    const fetchRejecDoc = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/docs/rejected", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setrejected(res.data);
        console.log(rejected);
        
      } catch (error) {
        console.error("Error in fetching Docs", error);
      }
    };
    fetchRejecDoc()
  }, []);
  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowLogin(true);
    navigate("/"); // Optionally redirect to landing
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Logout button */}
      {isLoggedIn && (
        <div className="flex justify-end p-4">
          <button
            onClick={handleLogout}
            className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
          >
            Logout
          </button>
        </div>
      )}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => navigate("/my-documents")}
            className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center justify-center min-h-[160px] cursor-pointer transition hover:scale-105"
          >
            <span className="text-4xl mb-2">📄</span>
            <span className="font-semibold text-lg">My Documents</span>
            <span className="text-gray-500 text-sm mt-1">
              {docs.length} uploaded
            </span>
          </div>
          <div
            onClick={() => navigate("/pending-doc")}
            className="bg-amber-100 rounded-xl p-6 shadow flex flex-col items-center justify-center min-h-[160px] cursor-pointer transition hover:scale-105 text-center"
          >
            <span className="text-4xl mb-2">✍️</span>
            <span className="font-semibold text-lg">Pending Signatures</span>
            <span className="text-gray-500 text-sm mt-1">
              {Pendocs.length} pending
            </span>
          </div>
          <div
            onClick={() => navigate("/signed-doc")}
            className="bg-green-100 rounded-xl p-6 shadow flex flex-col items-center justify-center min-h-[160px] cursor-pointer transition hover:scale-105 text-center"
          >
            <span className="text-4xl mb-2">✅</span>
            <span className="font-semibold text-lg">Completed</span>
            <span className="text-gray-500 text-sm mt-1">
              {Signeddocs.length} signed
            </span>
          </div>
          <div
            onClick={() => navigate("/rejected-doc")}
            className="bg-red-100 rounded-xl p-6 shadow flex flex-col items-center justify-center min-h-[160px] cursor-pointer transition hover:scale-105 text-center"
          >
            <span className="text-4xl mb-2">❌</span>
            <span className="font-semibold text-lg">Rejected Signatures</span>
            <span className="text-gray-500 text-sm mt-1">
              {rejected.length} rejected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
