const toneLabels = {
  green: "Stable",
  blue: "Live",
  amber: "External",
  violet: "Flow",
};

export default function StatsCard({ title, value, tone = "blue" }) {
  return (
    <article className={`stat-card stat-card-${tone}`}>
      <div className="stat-card-header">
        <p>{title}</p>
        <span>{toneLabels[tone] || "Live"}</span>
      </div>
      <h3>{value}</h3>
    </article>
  );
}
