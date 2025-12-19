import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState({
    villages: 0,
    projects: 0,
    completed: 0,
    complaints: 0,
  });

  // Load dashboard stats
  const loadStats = async () => {
    const res = await api.get("/dashboard/stats");
    setStats(res.data);
  };

  useEffect(() => {
    loadStats();
  }, []);

  // Pie chart data
  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [stats.completed, stats.projects - stats.completed],
        backgroundColor: ["#16a34a", "#f97316"], // green, orange
      },
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow p-6 rounded text-center">
          <h2 className="text-xl font-semibold">Total Villages</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.villages}</p>
        </div>

        <div className="bg-white shadow p-6 rounded text-center">
          <h2 className="text-xl font-semibold">Total Projects</h2>
          <p className="text-3xl font-bold text-green-600">{stats.projects}</p>
        </div>

        <div className="bg-white shadow p-6 rounded text-center">
          <h2 className="text-xl font-semibold">Completed Projects</h2>
          <p className="text-3xl font-bold text-purple-600">
            {stats.completed}
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded text-center">
          <h2 className="text-xl font-semibold">Pending Complaints</h2>
          <p className="text-3xl font-bold text-red-600">{stats.complaints}</p>
        </div>
      </div>

      {/* PIE CHART */}
      <div className="bg-white p-6 w-96 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Project Status Overview</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
}
