import { useState } from "react";
import { saveSchedule } from "../utils/storage";

export default function ScheduleForm() {
  const [form, setForm] = useState({ name: "", dosage: "", time: "", frequency: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSchedule(form);
    setForm({ name: "", dosage: "", time: "", frequency: "" });
    alert("Elixir schedule saved!");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-purple-800 p-4 rounded-xl shadow-lg mb-6">
      <div className="grid grid-cols-2 gap-4">
        {["name", "dosage", "time", "frequency"].map((f) => (
          <input
            key={f}
            type="text"
            placeholder={f}
            value={form[f]}
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            className="p-2 rounded bg-purple-700 text-white placeholder-gray-300"
            required
          />
        ))}
      </div>
      <button type="submit" className="mt-4 bg-yellow-400 text-purple-900 px-4 py-2 rounded font-bold">
        Save Schedule
      </button>
    </form>
  );
}
