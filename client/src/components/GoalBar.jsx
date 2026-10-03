export default function GoalBar({ current, goal, onGoalChange }) {
  const percent =
    goal > 0 ? Math.min(100, Math.round((current / goal) * 100)) : 0;

  const reached = goal > 0 && current >= goal;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
          <h5 className="mb-0">🎯 Weekly Goal</h5>

          <div className="input-group input-group-sm w-auto">
            <input
              type="number"
              min="1"
              className="form-control"
              value={goal}
              onChange={(e) => onGoalChange(Number(e.target.value))}
            />
            <span className="input-group-text">min</span>
          </div>
        </div>

        <div className="progress" style={{ height: "24px" }}>
          <div
            className={"progress-bar " + (reached ? "bg-success" : "bg-primary")}
            style={{ width: `${percent}%` }}
          >
            {percent}%
          </div>
        </div>

        <p className="mt-2 mb-0">
          {current} / {goal} min {reached && "🎉 Goal reached!"}
        </p>
      </div>
    </div>
  );
}