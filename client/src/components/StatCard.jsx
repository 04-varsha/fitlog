export default function StatCard({ value, label, icon }) {
  return (
    <div className="card text-center shadow-sm h-100">
      <div className="card-body">
        <div className="fs-3">{icon}</div>
        <h2 className="mb-0">{value}</h2>
        <p className="text-muted mb-0">{label}</p>
      </div>
    </div>
  );
}