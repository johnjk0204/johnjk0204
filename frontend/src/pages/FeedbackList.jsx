import { useState, useEffect } from "react";
import { getAllFeedback, searchFeedback } from "../services/api";
import FeedbackCard from "../components/FeedbackCard";

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [rating, setRating] = useState("");
  const [program, setProgram] = useState("");

  const loadAll = () => {
    setLoading(true);
    getAllFeedback()
      .then((res) => setFeedbacks(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadAll(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword && !rating && !program) { loadAll(); return; }
    setLoading(true);
    const params = {};
    if (keyword) params.keyword = keyword;
    if (rating) params.rating = rating;
    if (program) params.program = program;
    searchFeedback(params)
      .then((res) => setFeedbacks(res.data))
      .finally(() => setLoading(false));
  };

  const handleReset = () => {
    setKeyword(""); setRating(""); setProgram("");
    loadAll();
  };

  const handleDeleted = (id) => setFeedbacks((prev) => prev.filter((f) => f.feedback_id !== id));

  return (
    <div className="page">
      <h1 className="page-title">All Feedback</h1>

      {/* Search & Filter */}
      <form className="search-bar" onSubmit={handleSearch}>
        <div className="form-group" style={{ margin: 0 }}>
          <label>Keyword Search</label>
          <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Name, program, comments..." />
        </div>
        <div className="form-group" style={{ margin: 0 }}>
          <label>Rating</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">All Ratings</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <div className="form-group" style={{ margin: 0 }}>
          <label>Program</label>
          <input value={program} onChange={(e) => setProgram(e.target.value)} placeholder="Filter by program..." />
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-end" }}>
          <button className="btn btn-primary" type="submit">Search</button>
          <button className="btn btn-secondary" type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>

      {/* Results */}
      {loading ? (
        <div className="loading">Loading feedback...</div>
      ) : feedbacks.length === 0 ? (
        <div className="empty">No feedback records found.</div>
      ) : (
        <>
          <p style={{ color: "#718096", fontSize: "0.9rem", marginBottom: "1rem" }}>
            Showing {feedbacks.length} record{feedbacks.length !== 1 ? "s" : ""}
          </p>
          {feedbacks.map((f) => (
            <FeedbackCard key={f.feedback_id} feedback={f} onDeleted={handleDeleted} />
          ))}
        </>
      )}
    </div>
  );
}
