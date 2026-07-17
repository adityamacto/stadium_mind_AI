import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import api from "../services/api";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function CrowdChart() {
  const [trend, setTrend] = useState([]); const [error, setError] = useState("");
  useEffect(() => { let active = true; const load = () => api.get("/analytics").then(({ data }) => { if (active) { setTrend(Array.isArray(data.trend) ? data.trend : []); setError(""); } }).catch(() => active && setError("Crowd trend is temporarily unavailable.")); load(); const timer = setInterval(load, 5000); return () => { active = false; clearInterval(timer); }; }, []);
  const data = { labels: trend.map((_, index) => `T${index + 1}`), datasets: [{ label: "Crowd Density", data: trend, tension: 0.4, borderColor: "#38bdf8", backgroundColor: "#38bdf8" }] };
  return <section className="section"><h2>📈 Crowd Trend</h2>{error ? <p className="error-message">{error}</p> : <Line data={data} options={{ responsive: true, maintainAspectRatio: true }} />}</section>;
}
