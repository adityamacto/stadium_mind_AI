export default function ZoneHeatmap({ zones = {} }) {
  return <section className="section"><h2>🗺️ Stadium Zones</h2>
    {Object.entries(zones).map(([name, value]) => <div className="zone" key={name}><b>{name}</b><div className="zone-track"><div className="zone-fill" style={{ width: `${value}%`, background: value > 80 ? "#ef4444" : value > 60 ? "#f59e0b" : "#22c55e" }} /></div><span>{value}%</span></div>)}
    {!Object.keys(zones).length && <p>No zone readings available.</p>}
  </section>;
}
