import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SystemStatus from "../components/SystemStatus";
import QuickActions from "../components/QuickActions";
import StatsCard from "../components/StatsCard";
import AIRecommendation from "../components/AIRecommendation";
import IncidentAssistant from "../components/IncidentAssistant";
import FanAssistant from "../components/FanAssistant";
import CrowdChart from "../components/CrowdChart";
import ZoneHeatmap from "../components/ZoneHeatmap";
import AnnouncementGenerator from "../components/AnnouncementGenerator";
import AnalyticsPanel from "../components/AnalyticsPanel";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      const { data: response } = await api.get("/dashboard");
      setData(response);
      setError("");
    } catch {
      setError("Unable to load live dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialTimer = setTimeout(loadDashboard, 0);
    const timer = setInterval(loadDashboard, 5000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, [loadDashboard]);

  if (loading) {
    return (
      <main className="loading">
        <div className="loading-orbit" />
        <p>Loading command center...</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="loading">
        <p>{error}</p>
        <button type="button" onClick={loadDashboard}>Retry</button>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="dashboard">
        <Hero />
        {error && <p className="error-message">{error} Showing the most recent readings.</p>}

        <div className="overview-grid">
          <SystemStatus data={data} />
          <QuickActions />
        </div>

        <div className="cards">
          <StatsCard title="Health" value={`${data.health}%`} tone="green" />
          <StatsCard title="Crowd" value={`${data.crowd}%`} tone="blue" />
          <StatsCard title="Weather" value={data.weather} tone="amber" />
          <StatsCard title="Transport" value={data.transport} tone="violet" />
        </div>

        <div className="operations-grid">
          <CrowdChart />
          <ZoneHeatmap zones={data.zones} />
        </div>

        <div className="ai-grid">
          <AnalyticsPanel />
          <AIRecommendation recommendation={data.recommendation} />
        </div>

        <div className="assistants-grid">
          <IncidentAssistant />
          <FanAssistant />
          <AnnouncementGenerator />
        </div>
      </main>
    </>
  );
}
