import { useState } from "react";
import api from "../services/api";

export default function AnnouncementGenerator() {
  const [event, setEvent] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    const value = event.trim();
    if (!value) {
      setAnswer("Please describe the event.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/announcement", { event: value });
      setAnswer(data.announcement || "No announcement is available.");
    } catch {
      setAnswer("The announcement service is temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section assistant-card">
      <div className="section-heading">
        <span>Comms</span>
        <h2>AI Announcement Generator</h2>
      </div>
      <textarea rows="5" placeholder="Heavy crowd near Gate 2..." value={event} onChange={(event) => setEvent(event.target.value)} />
      <button onClick={generate} disabled={loading}>{loading ? "Generating..." : "Generate"}</button>
      {answer && <pre>{answer}</pre>}
    </section>
  );
}
