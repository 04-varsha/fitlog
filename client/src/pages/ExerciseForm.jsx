import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { TYPES, toDateStr } from "../utils";

export default function ExerciseForm() {
  const { id } = useParams(); // only present on /edit/:id
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "Running",
    description: "",
    duration: "",
    date: toDateStr(new Date()),
  });

  const [error, setError] = useState("");

  // In edit mode, load the existing workout and fill the form
  useEffect(() => {
    if (!isEdit) return;

    api
      .get(`/exercises/${id}`)
      .then((res) => {
        const e = res.data;

        setForm({
          type: e.type,
          description: e.description,
          duration: e.duration,
          date: e.date.slice(0, 10),
        });
      })
      .catch(() => setError("Could not load this workout."));
  }, [id, isEdit]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.description.trim() || Number(form.duration) < 1) {
      setError(
        "Please fill in all fields (duration must be at least 1 minute)."
      );
      return;
    }

    const payload = {
      ...form,
      duration: Number(form.duration),
    };

    try {
      if (isEdit) {
        await api.put(`/exercises/${id}`, payload);
      } else {
        await api.post("/exercises", payload);
      }

      navigate("/");
    } catch {
      setError("Could not save workout. Please try again.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <h3 className="mb-3">
          {isEdit ? "Edit Workout" : "Add Workout"}
        </h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Type</label>

            <select
              name="type"
              className="form-select"
              value={form.type}
              onChange={handleChange}
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>

            <input
              name="description"
              className="form-control"
              placeholder="e.g. Morning jog in the park"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Duration (minutes)</label>

            <input
              name="duration"
              type="number"
              min="1"
              className="form-control"
              value={form.duration}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date</label>

            <input
              name="date"
              type="date"
              className="form-control"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary me-2">
            {isEdit ? "Update" : "Save"}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}