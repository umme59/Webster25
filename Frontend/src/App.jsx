import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import NotificationBell from "./components/NotificationBell";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 text-white">
        
        {/* Header */}
        <header className="p-4 flex justify-between items-center bg-purple-700 shadow-lg">
          <h1 className="text-2xl font-bold text-blue-600" >Alchemist’s Grimoire</h1>
          
          <div className="flex items-center gap-6">
            {/* Navigation */}
            <nav>
              <Link to="/" className="mx-2 hover:text-yellow-300">Home</Link>
              <Link to="/dashboard" className="mx-2 hover:text-yellow-300">Dashboard</Link>
            </nav>

            {/* Notification Bell */}
            <NotificationBell />
          </div>
        </header>

        {/* Routes */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
