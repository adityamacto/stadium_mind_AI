import { useState } from "react";
import api from "../services/api";
export default function IncidentAssistant() {
  const [incident, setIncident] = useState(""); const [answer, setAnswer] = useState(""); const [loading, setLoading] = useState(false);
  async function analyze() { const value = incident.trim(); if (!value) return setAnswer("Please describe the incident."); setLoading(true); try { const { data } = await api.post("/incident", { incident: value }); setAnswer(data.analysis || "No analysis is available."); } catch { setAnswer("Incident analysis is temporarily unavailable. For urgent incidents, contact on-site emergency teams immediately."); } finally { setLoading(false); } }
  return <section className="section"><h2>🚨 Incident AI</h2><textarea rows="5" placeholder="Example: Fan collapsed near Gate 3" value={incident} onChange={(event) => setIncident(event.target.value)} /><button onClick={analyze} disabled={loading}>{loading ? "Analyzing..." : "Analyze Incident"}</button>{answer && <pre>{answer}</pre>}</section>;
}
