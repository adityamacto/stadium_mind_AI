export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="hero-badge">STADIUMMIND</div>
        <h1>StadiumMind AI</h1>
        <h2>AI Command Center for Smart Stadium Operations</h2>
        <p>
          A GenAI operations copilot for FIFA World Cup 2026 venues. Help
          organizers, volunteers, and fans navigate safely with crowd insight,
          accessibility guidance, transport intelligence, multilingual support,
          and real-time decisions.
        </p>
        <div className="hero-metrics" aria-label="Live platform metrics">
          <span><strong>24/7</strong> monitoring</span>
          <span><strong>5s</strong> refresh</span>
          <span><strong>AI</strong> assisted</span>
        </div>
      </div>
      <div className="hero-visual" aria-label="Stadium operations overview">
        <div className="stadium-ring">
          <span className="pulse-dot dot-a" />
          <span className="pulse-dot dot-b" />
          <span className="pulse-dot dot-c" />
          <div className="field-line" />
        </div>
        <strong>LIVE OPERATIONS</strong>
        <small>Safety / Crowd / Transport</small>
      </div>
    </section>
  );
}
