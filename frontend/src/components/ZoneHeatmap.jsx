export default function ZoneHeatmap({ zones = {} }) {
  return (
    <section className="section heatmap-panel">
      <div className="section-heading">
        <span>Venue</span>
        <h2>Stadium Zones</h2>
      </div>
      {Object.entries(zones).map(([name, value]) => (
        <div className="zone" key={name}>
          <div className="zone-label">
            <b>{name}</b>
            <span>{value}%</span>
          </div>
          <div className="zone-track">
            <div className="zone-fill" style={{ width: `${value}%`, background: value > 80 ? "#fb7185" : value > 60 ? "#fbbf24" : "#34d399" }} />
          </div>
        </div>
      ))}
      {!Object.keys(zones).length && <p>No zone readings available.</p>}
    </section>
  );
}
