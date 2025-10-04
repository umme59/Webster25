import { useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const [count, setCount] = useState(2); // example: 2 pending reminders
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Bell button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-purple-600 transition"
      >
        <Bell size={24} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {count}
          </span>
        )}
      </button>

      {/* Dropdown notifications */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-purple-800 rounded-xl shadow-lg border border-purple-600 z-10">
          <ul className="divide-y divide-purple-600">
            <li className="p-3 hover:bg-purple-700 cursor-pointer">
              💊 Time to take *Elixir of Vitality*
            </li>
            <li className="p-3 hover:bg-purple-700 cursor-pointer">
              💊 Time to take *Potion of Healing*
            </li>
          </ul>
          <button
            className="w-full text-center p-2 bg-purple-700 hover:bg-purple-600 rounded-b-xl text-yellow-300"
            onClick={() => { setCount(0); setOpen(false); }}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
