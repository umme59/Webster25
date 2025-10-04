import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = [
  { day: "Mon", taken: 3, missed: 0 },
  { day: "Tue", taken: 2, missed: 1 },
  { day: "Wed", taken: 3, missed: 0 },
  { day: "Thu", taken: 1, missed: 2 },
  { day: "Fri", taken: 3, missed: 0 },
];

export default function Charts() {
  return (
    <div className="bg-purple-800 p-4 rounded-xl shadow-lg">
      <h3 className="text-xl mb-4 text-yellow-300">Adherence Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="taken" stroke="#FFD700" />
          <Line type="monotone" dataKey="missed" stroke="#FF4D4D" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
