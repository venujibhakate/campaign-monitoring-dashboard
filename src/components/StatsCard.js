export default function StatsCard({ label, value }) {
  return (
    <div className="card">
      <p style={{ color: "#6b7280", fontSize: "14px" }}>{label}</p>
      <h3 style={{ margin: 0 }}>{value}</h3>
    </div>
  );
}
