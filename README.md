# Feedback Management System (FMS)

A full-stack web application for collecting, managing, and analyzing participant feedback for training programs.

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18, React Router, Axios     |
| Backend   | Python 3, FastAPI, Uvicorn        |
| Database  | SQLite (via SQLAlchemy ORM)       |
| Styling   | CSS                               |

---

## Project Structure

```
feedback_management_system/
├── backend/
│   ├── main.py            # FastAPI app entry point
│   ├── models.py          # SQLAlchemy ORM models
│   ├── schemas.py         # Pydantic request/response schemas
│   ├── crud.py            # Database operations
│   ├── database.py        # DB connection and session
│   └── routers/
│       └── feedback.py    # Feedback CRUD routes
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.jsx
│       ├── services/
│       │   └── api.js     # Axios API client
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── FeedbackCard.jsx
│       │   └── RatingStars.jsx
│       └── pages/
│           ├── Dashboard.jsx
│           ├── FeedbackList.jsx
│           ├── FeedbackDetail.jsx
│           └── SubmitFeedback.jsx
├── database/
│   ├── schema.sql         # Database schema
│   └── seed.sql           # Sample data
└── docs/
    └── API.md             # Full API documentation
```

---

## Features

- Submit feedback with participant name, program name, rating (1-5), and comments
- View all submitted feedback with sorting
- View individual feedback detail
- Edit or delete existing feedback
- Search feedback by keyword, rating, or program name
- Dashboard with total count, average rating, and recent entries

---

## Prerequisites

- Python 3.10+
- Node.js 16+ and npm

---

## Setup & Running

### Backend

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```

Backend runs at: `http://localhost:8000`  
Interactive API docs: `http://localhost:8000/docs`

### Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## API Overview

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/`                   | Health check                 |
| GET    | `/feedback/`          | List all feedback            |
| POST   | `/feedback/`          | Submit new feedback          |
| GET    | `/feedback/{id}`      | Get feedback by ID           |
| PUT    | `/feedback/{id}`      | Update feedback              |
| DELETE | `/feedback/{id}`      | Delete feedback              |
| GET    | `/search`             | Search/filter feedback       |
| GET    | `/stats`              | Get dashboard statistics     |

Full API documentation: [docs/API.md](docs/API.md)

---

## Database Schema

```sql
CREATE TABLE feedback (
    feedback_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    participant_name VARCHAR(100) NOT NULL,
    program_name     VARCHAR(200) NOT NULL,
    rating           INTEGER      NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comments         TEXT,
    submitted_at     DATETIME     DEFAULT CURRENT_TIMESTAMP
);
```

Schema and seed scripts: [database/](database/)

---

## Screenshots

See [docs/screenshots/](docs/screenshots/) for application screenshots.

---

## License

This project was developed as part of the AFDE May 2026 training program.