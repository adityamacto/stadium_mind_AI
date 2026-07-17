export default function AIRecommendation({ recommendation }) {
  return (
    <section className="section">
      <div className="section-heading">
        <span>Recommendation</span>
        <h2>AI Recommendation</h2>
      </div>
      <pre>{recommendation || "Everything is operating normally."}</pre>
    </section>
  );
}
