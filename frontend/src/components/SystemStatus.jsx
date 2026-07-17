export default function SystemStatus({ data }) {
  const items = [
    ["Stadium Health", data?.health >= 90 ? "Healthy" : "Attention needed", data?.health >= 90 ? "good" : "warn"],
    ["Crowd Risk", data?.crowd > 80 ? "High" : "Moderate", data?.crowd > 80 ? "danger" : "warn"],
    ["Medical Teams", "Ready", "good"],
    ["Security", "Operational", "good"],
    ["Weather", data?.weather || "Stable", "good"],
    ["AI Services", "Online", "good"],
  ];

  return (
    <section className="section status-panel">
      <div className="section-heading">
        <span>Operations</span>
        <h2>Live Command Center</h2>
      </div>
      {items.map(([label, value, tone]) => (
        <div className="status-row" key={label}>
          <span><i className={`status-dot ${tone}`} />{label}</span>
          <b>{value}</b>
        </div>
      ))}
    </section>
  );
}
