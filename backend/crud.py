from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
from models import Feedback
from schemas import FeedbackCreate, FeedbackUpdate


def get_all_feedback(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Feedback).order_by(Feedback.submitted_at.desc()).offset(skip).limit(limit).all()


def get_feedback_by_id(db: Session, feedback_id: int):
    return db.query(Feedback).filter(Feedback.feedback_id == feedback_id).first()


def create_feedback(db: Session, feedback: FeedbackCreate):
    db_feedback = Feedback(**feedback.model_dump())
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback


def update_feedback(db: Session, feedback_id: int, feedback: FeedbackUpdate):
    db_feedback = get_feedback_by_id(db, feedback_id)
    if not db_feedback:
        return None
    for key, value in feedback.model_dump(exclude_unset=True).items():
        setattr(db_feedback, key, value)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback


def delete_feedback(db: Session, feedback_id: int):
    db_feedback = get_feedback_by_id(db, feedback_id)
    if not db_feedback:
        return None
    db.delete(db_feedback)
    db.commit()
    return db_feedback


def search_feedback(
    db: Session,
    keyword: Optional[str] = None,
    rating: Optional[int] = None,
    program: Optional[str] = None,
):
    query = db.query(Feedback)
    if keyword:
        query = query.filter(
            or_(
                Feedback.participant_name.ilike(f"%{keyword}%"),
                Feedback.comments.ilike(f"%{keyword}%"),
                Feedback.program_name.ilike(f"%{keyword}%"),
            )
        )
    if rating:
        query = query.filter(Feedback.rating == rating)
    if program:
        query = query.filter(Feedback.program_name.ilike(f"%{program}%"))
    return query.order_by(Feedback.submitted_at.desc()).all()


def get_stats(db: Session):
    all_feedback = db.query(Feedback).all()
    total = len(all_feedback)
    avg_rating = round(sum(f.rating for f in all_feedback) / total, 2) if total > 0 else 0.0
    recent = sorted(all_feedback, key=lambda x: x.submitted_at, reverse=True)[:5]
    return {"total_count": total, "average_rating": avg_rating, "recent": recent}
