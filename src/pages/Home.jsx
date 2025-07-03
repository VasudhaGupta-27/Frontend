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
    fetchRejecDoc();
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
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] via-[#f5ede3] to-white">
      <Navbar />
      {/* Logout button */}
      {isLoggedIn && (
        <div className="flex justify-end p-4">
          <button
            onClick={handleLogout}
            className="bg-[#bfa77a] text-white px-4 py-2 rounded hover:bg-[#a68a64] transition font-semibold shadow"
          >
            Logout
          </button>
        </div>
      )}
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold mb-4 text-[#a68a64] drop-shadow">
          Hii
          <span className="text-[#7c6f57]"> {username}</span>{" "}
          <span className="text-[#bfa77a]">
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
      <div className="max-w-4xl mx-auto mt-12 p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#e7dbc7]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => navigate("/my-documents")}
            className="bg-[#f8f5f0] border border-[#e7dbc7] rounded-xl p-6 shadow-lg flex flex-col items-center justify-center min-h-[160px] cursor-pointer transition hover:scale-105 hover:bg-[#f5ede3] text-center backdrop-blur-md"
          >
            <span className="text-4xl mb-2">📄</span>
            <span className="font-semibold text-lg text-[#a68a64]">
              My Documents
            </span>
            <span className="text-[#bfa77a] text-sm mt-1">
              {docs.length} uploaded
            </span>
          </div>
          <div
            onClick={() => navigate("/pending-doc")}
            className="bg-[#f5ede3] border border-[#e7dbc7] rounded-xl p-6 shadow-lg flex flex-col items-center justify-center min-h-[160px] cursor-pointer transition hover:scale-105 hover:bg-[#f8f5f0] text-center backdrop-blur-md"
          >
            <span className="text-4xl mb-2">✍️</span>
            <span className="font-semibold text-lg text-[#bfa77a]">
              Pending Signatures
            </span>
            <span className="text-[#a68a64] text-sm mt-1">
              {Pendocs.length} pending
            </span>
          </div>
          <div
            onClick={() => navigate("/signed-doc")}
            className="bg-[#ede7d2] border border-[#e7dbc7] rounded-xl p-6 shadow-lg flex flex-col items-center justify-center min-h-[160px] cursor-pointer transition hover:scale-105 hover:bg-[#f8f5f0] text-center backdrop-blur-md"
          >
            <span className="text-4xl mb-2">✅</span>
            <span className="font-semibold text-lg text-[#7c6f57]">Completed</span>
            <span className="text-[#bfa77a] text-sm mt-1">
              {Signeddocs.length} signed
            </span>
          </div>
          <div
            onClick={() => navigate("/rejected-doc")}
            className="bg-[#f5e7e3] border border-[#e7dbc7] rounded-xl p-6 shadow-lg flex flex-col items-center justify-center min-h-[160px] cursor-pointer transition hover:scale-105 hover:bg-[#f8f5f0] text-center backdrop-blur-md"
          >
            <span className="text-4xl mb-2">❌</span>
            <span className="font-semibold text-lg text-[#c97a7a]">
              Rejected Signatures
            </span>
            <span className="text-[#a68a64] text-sm mt-1">
              {rejected.length} rejected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
