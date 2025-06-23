# 🚀 SignetFlow – Frontend

SignetFlow is a secure, modern, and easy-to-use digital document signing application built using the MERN stack. This repository contains the **React.js + Tailwind CSS** frontend for the DocuMark platform.

---

## 🖥️ Tech Stack

- ⚛️ React.js (CRA)
- 💨 Tailwind CSS
- 🌐 Axios (API Calls)
- 🧭 React Router
- 🔐 JWT Auth (via backend)

---

## 📸 Features

- ✅ Responsive landing page
- ✅ User registration and login
- ✅ JWT token storage in localStorage
- ✅ Form validations
- ✅ Route protection (coming soon)

---

## 🚀 Getting Started

### 1. Clone the repo

bash
git clone https://github.com/signetflow/frontend.git
cd frontend


2. Install dependencies
npm install

3. Start the app
npm start

Frontend will be available at: http://localhost:3000

🔌 Backend Integration
Make sure the backend is running on http://localhost:5000, or update the baseURL in:
src/utils/api.js

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});


📁 Folder Structure
src/
├── assets/         # images, logos
├── components/     # reusable UI components
├── pages/          # route-level components (Login, Register, LandingPage)
├── utils/          # Axios config
├── App.js
└── index.js
📜 License
This project is licensed under the MIT License.

👨‍💻 Author
Made with 💙 by the Jay Thakor

Let me know if you want a similar one for the **backend**, or a version with screenshots
