import ScheduleForm from "../components/ScheduleForm";
import ReminderList from "../components/ReminderList";
import { Wand2, BellRing, BarChart3, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white p-8">
      
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-yellow-300 drop-shadow-[0_0_15px_rgba(255,255,0,0.5)]">
          The Alchemist’s Grand Grimoire
        </h2>
        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Harness the arcane to track your elixirs, brews, and remedies.  
          Stay on time, stay well, and let magic handle your reminders ✨
        </p>
        <div className="mt-6 flex justify-center">
          <button className="bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-yellow-400/50 hover:scale-105 transition-all">
            Begin Your Journey
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {[
          { icon: <Wand2 size={36} />, title: "Craft Schedules", text: "Summon your medicine plan with ease." },
          { icon: <BellRing size={36} />, title: "Timely Alerts", text: "Never miss a potion or elixir again." },
          { icon: <BarChart3 size={36} />, title: "Track Progress", text: "Visualize adherence with magical charts." },
          { icon: <Shield size={36} />, title: "Stay Protected", text: "Guard your health with arcane reminders." },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl text-center border border-white/10 hover:border-yellow-400/50 hover:scale-105 transition-all duration-300"
          >
            <div className="text-yellow-300 mb-3 flex justify-center">{f.icon}</div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-blue-100 text-sm">{f.text}</p>
          </div>
        ))}
      </section>

      {/* Schedule Form */}
      <section className="mb-12">
        <h3 className="text-3xl font-semibold mb-4 text-yellow-300 border-l-4 border-yellow-400 pl-3">
          📜 Create Your Potion Schedule
        </h3>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10">
          <ScheduleForm />
        </div>
      </section>

      {/* Reminder List */}
      <section>
        <h3 className="text-3xl font-semibold mb-4 text-yellow-300 border-l-4 border-yellow-400 pl-3">
          💊 Stored Elixirs
        </h3>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10">
          <ReminderList />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-blue-200 opacity-80">
        ✦ © 2025 The Alchemist’s Grimoire ✦ Crafted with magic & React
      </footer>
    </div>
  );
}
