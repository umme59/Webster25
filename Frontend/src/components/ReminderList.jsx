import { getSchedules, deleteSchedule } from "../utils/storage";

export default function ReminderList() {
  const schedules = getSchedules();

  return (
    <div className="bg-purple-800 p-4 rounded-xl shadow-lg">
      <h3 className="text-xl mb-2 font-semibold">Saved Elixirs</h3>
      {schedules.length === 0 ? (
        <p>No elixirs yet!</p>
      ) : (
        <ul>
          {schedules.map((item, i) => (
            <li key={i} className="flex justify-between bg-purple-700 p-2 rounded mb-2">
              <div>
                <strong>{item.name}</strong> — {item.dosage}, {item.time}, {item.frequency}
              </div>
              <button
                className="text-red-400 hover:text-red-200"
                onClick={() => { deleteSchedule(i); window.location.reload(); }}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
