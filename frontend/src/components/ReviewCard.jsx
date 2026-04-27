import React, { useState } from "react";
import { updateReview, deleteReview } from "../utils/api";
import "./ReviewCard.css";


function StarDisplay({ rating, type }) {
  return (
    <div className="card__stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={
            i <= rating
              ? type === "Book" ? "star-on-book" : "star-on-movie"
              : "star-off"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}


function timeAgo(isoString) {
  const diff = (Date.now() - new Date(isoString)) / 1000;
  if (diff < 60)    return "just now";
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(isoString).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}


function ReviewCard({ review, index = 0, onRefresh }) {
  const { _id, title, category, rating, reviewText, name, createdAt } = review;
  const type = category === "Book" ? "book" : "movie";

 
  const [isEditing,   setIsEditing]   = useState(false);  // toggle edit form
  const [isDeleting,  setIsDeleting]  = useState(false);  // show confirm dialog
  const [isSaving,    setIsSaving]    = useState(false);  // saving spinner
  const [error,       setError]       = useState("");

  // Edit form fields — pre-filled with current values
  const [editForm, setEditForm] = useState({
    title,
    category,
    rating,
    reviewText,
    name: name || "",
  });

 
  function handleChange(e) {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  }

  
  async function handleSave() {
    if (!editForm.title.trim())      return setError("Title is required.");
    if (!editForm.category)          return setError("Category is required.");
    if (!editForm.rating)            return setError("Rating is required.");
    if (!editForm.reviewText.trim()) return setError("Review text is required.");

    setIsSaving(true);
    setError("");
    try {
      await updateReview(_id, { ...editForm, rating: Number(editForm.rating) });
      setIsEditing(false);
      onRefresh(); // re-fetch the feed so updated card shows
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  
  async function handleDelete() {
    setIsSaving(true);
    try {
      await deleteReview(_id);
      onRefresh(); // re-fetch the feed so deleted card disappears
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
    }
  }

 
  if (isEditing) {
    return (
      <article className={`review-card ${type} editing`}
        style={{ animationDelay: `${index * 0.06}s`, animation: "fadeUp 0.4s ease both" }}>

        <div className="card__edit-form">
          <p className="card__edit-title">Edit Review</p>

          {/* Title */}
          <label className="edit-label">Title</label>
          <input
            className="edit-input"
            name="title"
            value={editForm.title}
            onChange={handleChange}
            maxLength={120}
          />

          {/* Category + Rating row */}
          <div className="edit-row">
            <div>
              <label className="edit-label">Category</label>
              <select className="edit-input" name="category" value={editForm.category} onChange={handleChange}>
                <option value="Book">📚 Book</option>
                <option value="Movie">🎬 Movie</option>
              </select>
            </div>
            <div>
              <label className="edit-label">Rating</label>
              <select className="edit-input" name="rating" value={editForm.rating} onChange={handleChange}>
                <option value="1">1 ★</option>
                <option value="2">2 ★★</option>
                <option value="3">3 ★★★</option>
                <option value="4">4 ★★★★</option>
                <option value="5">5 ★★★★★</option>
              </select>
            </div>
          </div>

          {/* Review Text */}
          <label className="edit-label">Review Text</label>
          <textarea
            className="edit-textarea"
            name="reviewText"
            value={editForm.reviewText}
            onChange={handleChange}
            maxLength={300}
          />
          <span className="edit-counter">{editForm.reviewText.length} / 300</span>

          {/* Name */}
          <label className="edit-label">Your Name</label>
          <input
            className="edit-input"
            name="name"
            value={editForm.name}
            onChange={handleChange}
            maxLength={50}
          />

          {/* Error */}
          {error && <p className="edit-error">{error}</p>}

          {/* Buttons */}
          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving…" : "Save Changes"}
            </button>
            <button className="btn-cancel" onClick={() => { setIsEditing(false); setError(""); }}>
              Cancel
            </button>
          </div>
        </div>
      </article>
    );
  }

  
  if (isDeleting) {
    return (
      <article className={`review-card ${type}`}
        style={{ animationDelay: `${index * 0.06}s`, animation: "fadeUp 0.4s ease both" }}>
        <div className="card__delete-confirm">
          <p className="delete-question">🗑️ Delete this review?</p>
          <p className="delete-sub">"{title}" — this cannot be undone.</p>
          {error && <p className="edit-error">{error}</p>}
          <div className="edit-actions">
            <button className="btn-delete-confirm" onClick={handleDelete} disabled={isSaving}>
              {isSaving ? "Deleting…" : "Yes, Delete"}
            </button>
            <button className="btn-cancel" onClick={() => setIsDeleting(false)}>
              Cancel
            </button>
          </div>
        </div>
      </article>
    );
  }

  
  return (
    <article
      className={`review-card ${type}`}
      style={{ animationDelay: `${index * 0.06}s`, animation: "fadeUp 0.4s ease both" }}
    >
      <div className="card__header">
        <div className="card__meta">
          <span className={`badge badge-${type}`}>
            {type === "book" ? "📚" : "🎬"} {category}
          </span>
          <h3 className="card__title">{title}</h3>
          <p className="card__author">by {name || "Anonymous"}</p>
        </div>
        <StarDisplay rating={rating} type={category} />
      </div>

      <p className="card__text">{reviewText}</p>

      <div className="card__footer">
        <span className="card__time">⏱ {timeAgo(createdAt)}</span>

        {/* Edit and Delete buttons */}
        <div className="card__actions">
          <button
            className="btn-edit"
            onClick={() => setIsEditing(true)}
            title="Edit this review"
          >
            ✏️ Edit
          </button>
          <button
            className="btn-delete"
            onClick={() => setIsDeleting(true)}
            title="Delete this review"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default ReviewCard;