export default function AIRecommendation({ recommendation }) {
  return <section className="section"><h2>🤖 AI Recommendation</h2><pre>{recommendation || "Everything is operating normally."}</pre></section>;
}
