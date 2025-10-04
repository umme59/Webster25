import { getSchedules } from "../utils/storage";

export default function Dashboard() {
  const data = getSchedules();
  return (
    <div className="bg-purple-800 p-4 rounded-xl shadow-lg mb-6">
      <h3 className="text-2xl font-semibold mb-2 text-yellow-300">Wellness Dashboard</h3>
      <p>Upcoming doses: {data.length}</p>
      <p>Missed doses: 0 (demo)</p>
    </div>
  );
}
