import { useState } from "react";
import api from "../services/api";

export default function FanAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    const value = question.trim();
    if (!value) {
      setAnswer("Please enter a question.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/fan", { question: value });
      setAnswer(data.response || "No answer is available.");
    } catch {
      setAnswer("The fan assistant is temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section assistant-card">
      <div className="section-heading">
        <span>Guest Ops</span>
        <h2>AI Fan Assistant</h2>
      </div>
      <label className="sr-only" htmlFor="fan-question">Ask the fan assistant a question</label>
      <textarea id="fan-question" rows="4" placeholder="Ask about routes, accessibility, transport, facilities, or safety..." value={question} onChange={(event) => setQuestion(event.target.value)} />
      <button type="button" onClick={ask} disabled={loading}>{loading ? "Asking..." : "Ask AI"}</button>
      {answer && <pre aria-live="polite">{answer}</pre>}
    </section>
  );
}
