import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import api from "../services/api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function CrowdChart() {
  const [trend, setTrend] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = () => api.get("/analytics")
      .then(({ data }) => {
        if (active) {
          setTrend(Array.isArray(data.trend) ? data.trend : []);
          setError("");
        }
      })
      .catch(() => active && setError("Crowd trend is temporarily unavailable."));

    load();
    const timer = setInterval(load, 5000);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  const data = {
    labels: trend.map((_, index) => `T${index + 1}`),
    datasets: [
      {
        label: "Crowd Density",
        data: trend,
        tension: 0.42,
        borderColor: "#2dd4bf",
        backgroundColor: "rgba(45, 212, 191, .18)",
        pointBackgroundColor: "#f8fafc",
        pointBorderColor: "#2dd4bf",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: "#cbd5e1" } } },
    scales: {
      x: { grid: { color: "rgba(148, 163, 184, .12)" }, ticks: { color: "#94a3b8" } },
      y: { grid: { color: "rgba(148, 163, 184, .12)" }, ticks: { color: "#94a3b8" } },
    },
  };

  return (
    <section className="section chart-panel">
      <div className="section-heading">
        <span>Analytics</span>
        <h2>Crowd Trend</h2>
      </div>
      {error ? <p className="error-message">{error}</p> : <div className="chart-shell"><Line data={data} options={options} /></div>}
    </section>
  );
}
