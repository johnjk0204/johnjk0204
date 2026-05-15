# API Documentation — Feedback Management System

Base URL: `http://localhost:8000`  
Interactive Docs: `http://localhost:8000/docs`

---

## Health Check

### GET `/`

Returns API status.

**Response `200`**
```json
{
  "message": "Feedback Management System API is running"
}
```

---

## Feedback

### GET `/feedback/`

Retrieve all feedback entries, ordered by most recent first.

**Query Parameters**

| Parameter | Type    | Default | Description              |
|-----------|---------|---------|--------------------------|
| skip      | integer | 0       | Number of records to skip |
| limit     | integer | 100     | Maximum records to return |

**Response `200`**
```json
[
  {
    "feedback_id": 1,
    "participant_name": "John Doe",
    "program_name": "Python Fundamentals",
    "rating": 5,
    "comments": "Excellent training!",
    "submitted_at": "2026-05-14T10:30:00Z"
  }
]
```

---

### POST `/feedback/`

Submit a new feedback entry.

**Request Body**
```json
{
  "participant_name": "Jane Smith",
  "program_name": "Data Analytics",
  "rating": 4,
  "comments": "Very informative session."
}
```

| Field            | Type    | Required | Constraints            |
|------------------|---------|----------|------------------------|
| participant_name | string  | Yes      | 1–100 characters       |
| program_name     | string  | Yes      | 1–200 characters       |
| rating           | integer | Yes      | 1 to 5 (inclusive)     |
| comments         | string  | No       | Free text              |

**Response `201`**
```json
{
  "feedback_id": 2,
  "participant_name": "Jane Smith",
  "program_name": "Data Analytics",
  "rating": 4,
  "comments": "Very informative session.",
  "submitted_at": "2026-05-15T09:00:00Z"
}
```

---

### GET `/feedback/{feedback_id}`

Retrieve a single feedback entry by ID.

**Path Parameter:** `feedback_id` (integer)

**Response `200`**
```json
{
  "feedback_id": 1,
  "participant_name": "John Doe",
  "program_name": "Python Fundamentals",
  "rating": 5,
  "comments": "Excellent training!",
  "submitted_at": "2026-05-14T10:30:00Z"
}
```

**Response `404`**
```json
{ "detail": "Feedback not found" }
```

---

### PUT `/feedback/{feedback_id}`

Update an existing feedback entry. All fields are optional.

**Path Parameter:** `feedback_id` (integer)

**Request Body** (all fields optional)
```json
{
  "rating": 3,
  "comments": "Updated comment."
}
```

**Response `200`** — returns updated feedback object  
**Response `404`** — `{ "detail": "Feedback not found" }`

---

### DELETE `/feedback/{feedback_id}`

Delete a feedback entry by ID.

**Path Parameter:** `feedback_id` (integer)

**Response `200`**
```json
{ "message": "Feedback deleted successfully" }
```

**Response `404`** — `{ "detail": "Feedback not found" }`

---

## Search

### GET `/search`

Search and filter feedback entries.

**Query Parameters**

| Parameter | Type    | Description                                     |
|-----------|---------|-------------------------------------------------|
| keyword   | string  | Search in name, program, and comments (partial) |
| rating    | integer | Filter by exact rating (1–5)                    |
| program   | string  | Filter by program name (partial match)          |

**Example:** `/search?keyword=python&rating=5`

**Response `200`** — array of matching feedback objects

---

## Stats / Dashboard

### GET `/stats`

Get dashboard statistics.

**Response `200`**
```json
{
  "total_count": 42,
  "average_rating": 4.26,
  "recent": [
    {
      "feedback_id": 42,
      "participant_name": "Alice",
      "program_name": "Cloud Computing",
      "rating": 5,
      "comments": "Outstanding!",
      "submitted_at": "2026-05-15T11:00:00Z"
    }
  ]
}
```

| Field          | Type    | Description                          |
|----------------|---------|--------------------------------------|
| total_count    | integer | Total number of feedback records     |
| average_rating | float   | Mean rating across all records       |
| recent         | array   | Last 5 submitted feedback entries    |

---

## Error Responses

| Status | Description                        |
|--------|------------------------------------|
| 200    | Success                            |
| 201    | Created successfully               |
| 404    | Resource not found                 |
| 422    | Validation error (invalid input)   |