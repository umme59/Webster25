import "./App.css";
import "../dist/output.css"; // Tailwind compiled CSS
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import NotificationBell from "./components/NotificationBell";
import LoginSignup from "./pages/LoginPage"; // 👈 Add your login page import

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-900 text-white font-sans">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/10 shadow-md">
          <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-extrabold tracking-wide text-cyan-400">
              Alchemist’s Grimoire
            </h1>

            <div className="flex items-center gap-6">
              {/* Navigation Links */}
              <nav className="flex gap-4">
                <Link to="/" className="hover:text-cyan-300 transition">
                  Home
                </Link>
                <Link to="/dashboard" className="hover:text-cyan-300 transition">
                  Dashboard
                </Link>
              </nav>

              {/* Notification Bell */}
              <NotificationBell />

              {/* Buttons */}
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-cyan-400 text-cyan-400 rounded-xl hover:bg-cyan-400 hover:text-white transition"
                >
                  Login
                </Link>

                
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginSignup />} /> {/* 👈 Login route */}
            {/* Optional: you can create a GetStartedPage.jsx later */}
          </Routes>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-gray-400 border-t border-white/10">
          © 2025 Alchemist’s Grimoire • Crafted with React & Tailwind
        </footer>
      </div>
    </Router>
  );
}
