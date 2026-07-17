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
      <label className="sr-only" htmlFor="announcement-event">Describe the event for the announcement</label>
      <textarea id="announcement-event" rows="5" placeholder="Heavy crowd near Gate 2..." value={event} onChange={(event) => setEvent(event.target.value)} />
      <button type="button" onClick={generate} disabled={loading}>{loading ? "Generating..." : "Generate"}</button>
      {answer && <pre aria-live="polite">{answer}</pre>}
    </section>
  );
}
