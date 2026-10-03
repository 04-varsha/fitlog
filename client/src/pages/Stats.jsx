import { useState, useEffect } from "react";
import api from "../api";
import StatCard from "../components/StatCard";
import GoalBar from "../components/GoalBar";
import { calcStreaks } from "../utils";

export default function Stats() {
  const [stats, setStats] = useState({
    totalMinutes: 0,
    sessions: 0,
    byType: [],
  });

  const [streaks, setStreaks] = useState({
    current: 0,
    best: 0,
  });

  const [goal, setGoal] = useState(
    () => Number(localStorage.getItem("fitlog-goal")) || 150
  );

  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/exercises/stats/weekly"),
      api.get("/exercises"),
    ])
      .then(([statsRes, listRes]) => {
        setStats(statsRes.data);

        setStreaks(
          calcStreaks(
            listRes.data.map((e) => e.date.slice(0, 10))
          )
        );
      })
      .catch(() => setError("Could not load stats."));
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog-goal", goal);
  }, [goal]);

  return (
    <>
      <h3 className="mb-3">
        Weekly Stats{" "}
        <small className="text-muted fs-6">
          (last 7 days)
        </small>
      </h3>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <GoalBar
        current={stats.totalMinutes}
        goal={goal}
        onGoalChange={setGoal}
      />

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <StatCard
            icon="⏱"
            value={stats.totalMinutes}
            label="Minutes this week"
          />
        </div>

        <div className="col-6 col-md-3">
          <StatCard
            icon="💪"
            value={stats.sessions}
            label="Workouts this week"
          />
        </div>

        <div className="col-6 col-md-3">
          <StatCard
            icon="🔥"
            value={streaks.current}
            label="Current streak (days)"
          />
        </div>

        <div className="col-6 col-md-3">
          <StatCard
            icon="🏆"
            value={streaks.best}
            label="Best streak (days)"
          />
        </div>
      </div>

      <h5>Minutes by type</h5>

      {stats.byType.length === 0 ? (
        <p className="text-muted">
          No workouts in the last 7 days.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Sessions</th>
                <th>Total minutes</th>
              </tr>
            </thead>

            <tbody>
              {stats.byType.map((row) => (
                <tr key={row.type}>
                  <td>{row.type}</td>
                  <td>{row.sessions}</td>
                  <td>{row.totalMinutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}