import { useNavigate } from "react-router-dom";
import RatingStars from "./RatingStars";
import { deleteFeedback } from "../services/api";

export default function FeedbackCard({ feedback, onDeleted }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Delete this feedback entry?")) return;
    try {
      await deleteFeedback(feedback.feedback_id);
      onDeleted && onDeleted(feedback.feedback_id);
    } catch {
      alert("Failed to delete feedback.");
    }
  };

  return (
    <div className="feedback-card">
      <div className="feedback-card-info">
        <h4>{feedback.participant_name}</h4>
        <div className="program">{feedback.program_name}</div>
        <RatingStars value={feedback.rating} readonly />
        {feedback.comments && (
          <div className="comment">"{feedback.comments.slice(0, 100)}{feedback.comments.length > 100 ? "…" : ""}"</div>
        )}
        <div className="date">{new Date(feedback.submitted_at).toLocaleString()}</div>
      </div>
      <div className="feedback-card-actions">
        <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/feedback/${feedback.feedback_id}`)}>View</button>
        <button className="btn btn-primary btn-sm" onClick={() => navigate(`/feedback/${feedback.feedback_id}/edit`)}>Edit</button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
