import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStats } from "../services/api";
import RatingStars from "../components/RatingStars";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>

      <div className="stat-grid">
        <div className="stat-card">
          <h3>{stats?.total_count ?? 0}</h3>
          <p>Total Feedback Entries</p>
        </div>
        <div className="stat-card" style={{ borderTopColor: "#38a169" }}>
          <h3 style={{ color: "#38a169" }}>{stats?.average_rating?.toFixed(1) ?? "—"}</h3>
          <p>Average Rating (out of 5)</p>
        </div>
        <div className="stat-card" style={{ borderTopColor: "#ed8936" }}>
          <h3 style={{ color: "#ed8936" }}>
            {stats?.recent?.length ?? 0}
          </h3>
          <p>Recent Submissions</p>
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Recent Feedback</h2>
          <button className="btn btn-primary btn-sm" onClick={() => navigate("/feedback")}>View All</button>
        </div>

        {!stats?.recent?.length ? (
          <div className="empty">No feedback submitted yet.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Participant</th>
                  <th>Program</th>
                  <th>Rating</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {stats.recent.map((f) => (
                  <tr key={f.feedback_id}>
                    <td>{f.feedback_id}</td>
                    <td>{f.participant_name}</td>
                    <td>{f.program_name}</td>
                    <td><RatingStars value={f.rating} readonly /></td>
                    <td>{new Date(f.submitted_at).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/feedback/${f.feedback_id}`)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
