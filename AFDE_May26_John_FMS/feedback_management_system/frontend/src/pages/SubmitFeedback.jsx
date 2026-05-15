import { useState } from "react";
import { createFeedback } from "../services/api";
import RatingStars from "../components/RatingStars";

const INITIAL = { participant_name: "", program_name: "", rating: 0, comments: "" };

export default function SubmitFeedback() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.participant_name.trim()) e.participant_name = "Name is required";
    if (!form.program_name.trim()) e.program_name = "Program name is required";
    if (!form.rating) e.rating = "Please select a rating";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setAlert(null);
    try {
      await createFeedback(form);
      setAlert({ type: "success", message: "Feedback submitted successfully!" });
      setForm(INITIAL);
      setErrors({});
    } catch (err) {
      setAlert({ type: "error", message: err.response?.data?.detail || "Submission failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{ maxWidth: 640 }}>
      <h1 className="page-title">Submit Feedback</h1>

      {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Participant Name *</label>
            <input
              value={form.participant_name}
              onChange={(e) => setForm({ ...form, participant_name: e.target.value })}
              placeholder="Enter your full name"
            />
            {errors.participant_name && <div className="error-text">{errors.participant_name}</div>}
          </div>

          <div className="form-group">
            <label>Training / Event / Product Name *</label>
            <input
              value={form.program_name}
              onChange={(e) => setForm({ ...form, program_name: e.target.value })}
              placeholder="e.g., React Bootcamp 2026"
            />
            {errors.program_name && <div className="error-text">{errors.program_name}</div>}
          </div>

          <div className="form-group">
            <label>Rating *</label>
            <RatingStars
              value={form.rating}
              onChange={(val) => setForm({ ...form, rating: val })}
            />
            {errors.rating && <div className="error-text">{errors.rating}</div>}
          </div>

          <div className="form-group">
            <label>Comments</label>
            <textarea
              value={form.comments}
              onChange={(e) => setForm({ ...form, comments: e.target.value })}
              placeholder="Share your thoughts and suggestions..."
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
