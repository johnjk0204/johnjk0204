const LABELS = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent" };

export default function RatingStars({ value, onChange, readonly = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= value ? "filled" : "empty"}`}
            onClick={() => !readonly && onChange && onChange(star)}
            title={LABELS[star]}
          >
            ★
          </span>
        ))}
      </div>
      {value > 0 && (
        <span className={`badge badge-${value}`}>{LABELS[value]}</span>
      )}
    </div>
  );
}
