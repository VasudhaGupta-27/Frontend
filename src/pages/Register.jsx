import { useState } from "react";
import API from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

export default function Register({ onRegistered, onShowLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      toast.success("Registered! Please login.");
      setTimeout(() => {
        if (onRegistered) onRegistered();
      }, 1500);
    } catch (err) {
      toast.error(
        (err.response && err.response.data && err.response.data.msg) ||
          "Error registering"
      );
    }
  };

  return (
      <div className="flex flex-col items-center justify-center w-full bg-gradient-to-br from-[#f8f5f0] via-[#f5ede3] to-white min-h-screen">
      <Toaster position="top-center" />
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/90 border border-[#e7dbc7] p-6 md:p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col gap-5"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-extrabold text-[#a68a64] mb-2 text-center drop-shadow">
          Register
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg border border-[#e7dbc7] focus:outline-none focus:ring-2 focus:ring-[#bfa77a] transition bg-[#f8f5f0] placeholder-[#bfa77a]"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg border border-[#e7dbc7] focus:outline-none focus:ring-2 focus:ring-[#a68a64] transition bg-[#f8f5f0] placeholder-[#bfa77a]"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="px-4 py-2 rounded-lg border border-[#e7dbc7] focus:outline-none focus:ring-2 focus:ring-[#bfa77a] transition bg-[#f8f5f0] placeholder-[#bfa77a]"
          required
        />
        <motion.button
          type="submit"
          className="bg-[#bfa77a] text-white w-full mt-2 py-2 rounded-lg font-bold text-lg shadow hover:bg-[#a68a64] transition"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Register
        </motion.button>
        <motion.div>
          <div className="text-[#7c6f57] text-center">
            Already have an account?{" "}
            <span
              className="text-[#a68a64] cursor-pointer font-semibold hover:underline"
              onClick={onShowLogin}
            >
              Login here
            </span>
          </div>
        </motion.div>
      </motion.form>
    </div>
  );
}
