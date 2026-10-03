import { useState, useEffect } from "react";
import api from "../api";
import StatCard from "../components/StatCard";

export default function Stats() {
  const [stats, setStats] = useState({
    totalMinutes: 0,
    sessions: 0,
    byType: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/exercises/stats/weekly")
      .then((res) => setStats(res.data))
      .catch(() => setError("Could not load stats."));
  }, []);

  return (
    <>
      <h3 className="mb-3">Weekly Stats</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row row-cols-1 row-cols-md-2 g-3">
        <div className="col">
          <StatCard
            value={stats.totalMinutes}
            label="Total Minutes"
            icon="⏱️"
          />
        </div>

        <div className="col">
          <StatCard
            value={stats.sessions}
            label="Sessions"
            icon="🏋️"
          />
        </div>
      </div>
    </>
  );
}