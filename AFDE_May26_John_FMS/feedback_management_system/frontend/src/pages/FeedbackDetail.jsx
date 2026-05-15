import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFeedbackById, updateFeedback, deleteFeedback } from "../services/api";
import RatingStars from "../components/RatingStars";

export default function FeedbackDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = window.location.pathname.endsWith("/edit");

  const [feedback, setFeedback] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    getFeedbackById(id)
      .then((res) => {
        setFeedback(res.data);
        setForm({
          participant_name: res.data.participant_name,
          program_name: res.data.program_name,
          rating: res.data.rating,
          comments: res.data.comments || "",
        });
      })
      .catch(() => setFeedback(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateFeedback(id, form);
      setAlert({ type: "success", message: "Feedback updated successfully!" });
      setTimeout(() => navigate(`/feedback/${id}`), 1000);
    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.detail || "Update failed." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this feedback?")) return;
    await deleteFeedback(id);
    navigate("/feedback");
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!feedback) return <div className="empty">Feedback not found.</div>;

  return (
    <div className="page" style={{ maxWidth: 700 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 className="page-title" style={{ margin: 0 }}>
          {isEdit ? "Edit Feedback" : "Feedback Details"}
        </h1>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {!isEdit && (
            <button className="btn btn-primary btn-sm" onClick={() => navigate(`/feedback/${id}/edit`)}>Edit</button>
          )}
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate("/feedback")}>Back</button>
        </div>
      </div>

      {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}

      <div className="card">
        {isEdit ? (
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Participant Name *</label>
              <input value={form.participant_name} onChange={(e) => setForm({ ...form, participant_name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Program / Event Name *</label>
              <input value={form.program_name} onChange={(e) => setForm({ ...form, program_name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Rating *</label>
              <RatingStars value={form.rating} onChange={(val) => setForm({ ...form, rating: val })} />
            </div>
            <div className="form-group">
              <label>Comments</label>
              <textarea value={form.comments} onChange={(e) => setForm({ ...form, comments: e.target.value })} />
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="btn btn-success" type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
              <button className="btn btn-secondary" type="button" onClick={() => navigate(`/feedback/${id}`)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="detail-grid">
            <div className="detail-item">
              <label>Feedback ID</label>
              <p>#{feedback.feedback_id}</p>
            </div>
            <div className="detail-item">
              <label>Submitted At</label>
              <p>{new Date(feedback.submitted_at).toLocaleString()}</p>
            </div>
            <div className="detail-item">
              <label>Participant Name</label>
              <p>{feedback.participant_name}</p>
            </div>
            <div className="detail-item">
              <label>Program / Event</label>
              <p>{feedback.program_name}</p>
            </div>
            <div className="detail-item">
              <label>Rating</label>
              <RatingStars value={feedback.rating} readonly />
            </div>
            <div className="detail-item" style={{ gridColumn: "1 / -1" }}>
              <label>Comments</label>
              <p>{feedback.comments || "No comments provided."}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
