import { useState, useEffect } from "react";
import api from "../api";
import ExerciseCard from "../components/ExerciseCard";
import { TYPES } from "../utils";

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [type, setType] = useState(""); // "" means all types
  const [error, setError] = useState("");

  // Runs on first load AND every time the selected type changes
  useEffect(() => {
    api
      .get("/exercises", { params: type ? { type } : {} })
      .then((res) => {
        setExercises(res.data);
        setError("");
      })
      .catch(() =>
        setError("Could not load workouts. Is the server running?")
      );
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

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {exercises.map((ex) => (
          <div className="col" key={ex._id}>
            <ExerciseCard exercise={ex} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </>
  );
}