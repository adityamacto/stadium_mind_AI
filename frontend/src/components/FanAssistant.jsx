import { useState } from "react";
import api from "../services/api";
export default function FanAssistant() {
  const [question, setQuestion] = useState(""); const [answer, setAnswer] = useState(""); const [loading, setLoading] = useState(false);
  async function ask() { const value = question.trim(); if (!value) return setAnswer("Please enter a question."); setLoading(true); try { const { data } = await api.post("/fan", { question: value }); setAnswer(data.response || "No answer is available."); } catch { setAnswer("The fan assistant is temporarily unavailable."); } finally { setLoading(false); } }
  return <section className="section"><h2>🧭 AI Fan Assistant</h2><textarea rows="4" placeholder="Ask anything about the stadium..." value={question} onChange={(event) => setQuestion(event.target.value)} /><button onClick={ask} disabled={loading}>{loading ? "Asking..." : "Ask AI"}</button>{answer && <pre>{answer}</pre>}</section>;
}
