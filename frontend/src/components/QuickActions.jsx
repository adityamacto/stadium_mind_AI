import { useState } from "react";
import api from "../services/api";

const actions = ["Stadium Status", "Predict Risks", "Crowd Strategy", "Transport", "Sustainability"];

export default function QuickActions() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function run(question) {
    setLoading(true);
    setResult("");

    try {
      const { data } = await api.post("/assistant", { question });
      setResult(data.response || "No response is available.");
    } catch {
      setResult("The assistant is temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section action-panel">
      <div className="section-heading">
        <span>Copilot</span>
        <h2>AI Command Center</h2>
      </div>
      <div className="actions">
        {actions.map((label) => (
          <button
            className="action-button"
            disabled={loading}
            key={label}
            onClick={() => run(label === "Stadium Status" ? "Give a complete stadium status report." : `Suggest ${label.toLowerCase()} improvements.`)}
          >
            {label}
          </button>
        ))}
      </div>
      {loading && <p className="muted">Generating response...</p>}
      {result && <pre>{result}</pre>}
    </section>
  );
}
