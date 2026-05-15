-- Feedback Management System — Database Schema
-- Database: SQLite

CREATE TABLE IF NOT EXISTS feedback (
    feedback_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    participant_name VARCHAR(100) NOT NULL,
    program_name     VARCHAR(200) NOT NULL,
    rating           INTEGER      NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comments         TEXT,
    submitted_at     DATETIME     DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_feedback_rating      ON feedback (rating);
CREATE INDEX IF NOT EXISTS idx_feedback_program     ON feedback (program_name);
CREATE INDEX IF NOT EXISTS idx_feedback_submitted   ON feedback (submitted_at DESC);