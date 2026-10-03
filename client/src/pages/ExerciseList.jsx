import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import ExerciseCard from "../components/ExerciseCard";
import { TYPES } from "../utils";

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    api
      .get("/exercises", { params: type ? { type } : {} })
      .then((res) => {
        setExercises(res.data);
        setError("");
      })
      .catch(() =>
        setError("Could not load workouts. Is the server running?")
      )
      .finally(() => setLoading(false));
  }, [type]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this workout?")) return;

    try {
      await api.delete(`/exercises/${id}`);
      setExercises((prev) => prev.filter((ex) => ex._id !== id));
    } catch {
      setError("Delete failed. Please try again.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <h3 className="mb-0">My Workouts</h3>

        <select
          className="form-select w-auto"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All types</option>

          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border" role="status"></div>
        </div>
      )}

      {!loading && !error && exercises.length === 0 && (
        <div className="alert alert-secondary">
          No workouts found. <Link to="/add">Add your first workout</Link>.
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {exercises.map((ex) => (
          <div className="col" key={ex._id}>
            <ExerciseCard
              exercise={ex}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </>
  );
}