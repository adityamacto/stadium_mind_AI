import { useEffect, useState } from "react";
import api from "../services/api";

export default function AnalyticsPanel() {
  const [message, setMessage] = useState("Loading prediction...");

  useEffect(() => {
    let active = true;
    api.get("/analytics")
      .then(({ data }) => active && setMessage(data.prediction || "No prediction is available."))
      .catch(() => active && setMessage("Analytics are temporarily unavailable."));

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="section">
      <div className="section-heading">
        <span>Forecast</span>
        <h2>AI Prediction</h2>
      </div>
      <pre>{message}</pre>
    </section>
  );
}
