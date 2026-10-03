import { useState, useEffect } from "react";
import api from "../api";
import ExerciseCard from "../components/ExerciseCard";

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");

  // Side effect: fetch data from the API when the page first loads
  useEffect(() => {
    api
      .get("/exercises")
      .then((res) => setExercises(res.data))
      .catch(() => setError("Could not load workouts. Is the server running?"));
  }, []);

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
      <h3 className="mb-3">My Workouts</h3>

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