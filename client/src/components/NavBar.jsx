import { NavLink } from "react-router-dom";

export default function NavBar() {
  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active fw-bold" : "");

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">🏋️ FitLog</span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <div className="navbar-nav ms-auto">
            <NavLink to="/" end className={linkClass}>
              Workouts
            </NavLink>

            <NavLink to="/add" className={linkClass}>
              Add Workout
            </NavLink>

            <NavLink to="/stats" className={linkClass}>
              Weekly Stats
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}