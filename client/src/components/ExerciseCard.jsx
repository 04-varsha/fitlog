import { Link } from "react-router-dom";

// Child component: receives data and a callback from its parent through props
export default function ExerciseCard({ exercise, onDelete }) {
  const { _id, type, description, duration, date } = exercise;

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <span className="badge bg-primary mb-2">{type}</span>
        <h5 className="card-title">{description}</h5>
        <p className="card-text mb-1">⏱ {duration} min</p>
        <p className="card-text text-muted">📅 {date.slice(0, 10)}</p>
      </div>
      <div className="card-footer d-flex gap-2">
        <Link to={`/edit/${_id}`} className="btn btn-sm btn-outline-primary">
          Edit
        </Link>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(_id)}>
          Delete
        </button>
      </div>
    </div>
  );
}