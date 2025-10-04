import Dashboard from "../components/Dashboard";
import Charts from "../components/Charts";

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Dashboard />
      <Charts />
    </div>
  );
}
