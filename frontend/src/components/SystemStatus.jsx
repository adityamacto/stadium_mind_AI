export default function SystemStatus({ data }) {
  const items = [
    ["🟢 Stadium Health", data?.health >= 90 ? "Healthy" : "Attention needed"],
    ["🟡 Crowd Risk", data?.crowd > 80 ? "High" : "Moderate"],
    ["🟢 Medical Teams", "Ready"], ["🟢 Security", "Operational"],
    ["🟢 Weather", data?.weather || "Stable"], ["🟢 AI Services", "Online"],
  ];
  return <section className="section"><h2>🛰️ Live Command Center</h2>{items.map(([label, value]) => <div className="status-row" key={label}><span>{label}</span><b>{value}</b></div>)}</section>;
}
