import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">Feedback Management System</NavLink>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink>
        <NavLink to="/submit" className={({ isActive }) => isActive ? "active" : ""}>Submit Feedback</NavLink>
        <NavLink to="/feedback" className={({ isActive }) => isActive ? "active" : ""}>All Feedback</NavLink>
      </div>
    </nav>
  );
}
