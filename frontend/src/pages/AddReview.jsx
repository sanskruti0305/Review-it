// src/pages/AddReview.js
// ─────────────────────────────────────────────────────────────────
// The "Studio" page ("/add") — a form for writing a new review.
// On success: shows a success state, then uses useNavigate()
// to redirect the user back to the Home feed automatically.
// ─────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReview } from "../utils/api";
import "./AddReview.css";

// Initial blank form state — defined outside component to avoid re-creation
const INITIAL_FORM = {
  title:      "",
  category:   "",
  rating:     0,
  reviewText: "",
  name:       "",
};

function AddReview() {
  // useNavigate gives us a function to programmatically change routes
  const navigate = useNavigate();

  const [form,      setForm]      = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState(false);

  // ── Generic change handler (works for all input types) ────────
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(""); // clear error when user starts typing again
  }

  // ── Form Submission ───────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault(); // prevent default browser page-reload behavior

    // Client-side validation before hitting the server
    if (!form.title.trim())    return setError("Please enter the title.");
    if (!form.category)        return setError("Please select a category.");
    if (!form.rating)          return setError("Please pick a star rating.");
    if (!form.reviewText.trim()) return setError("Review text cannot be empty.");

    setSubmitting(true);
    setError("");

    try {
      // Call our API utility function (POST /api/reviews)
      await createReview({
        ...form,
        rating: Number(form.rating), // convert string to number
      });

      // Show success state in the UI
      setSuccess(true);

      // After 2.2 seconds, navigate to the home feed to see the new review
      setTimeout(() => navigate("/"), 2200);

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Success State ─────────────────────────────────────────────
  if (success) {
    return (
      <div className="studio">
        <div className="studio__card">
          <div className="studio__success">
            <span className="success-icon">✦</span>
            <h2 className="grad-text-book">Review Posted!</h2>
            <p>Taking you to The Reel in a moment…</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Form State ────────────────────────────────────────────────
  return (
    <div className="studio">
      <div className="studio__card">
        <div className="studio__header">
          <p className="studio__eyebrow">The Studio</p>
          <h1>Write a Micro-Review</h1>
          <p>Keep it punchy — 300 characters max.</p>
        </div>

        <form className="studio__form" onSubmit={handleSubmit} noValidate>

          {/* Title */}
          <div className="form-field">
            <label htmlFor="title">Title of Book / Movie</label>
            <input
              id="title"
              className="form-input"
              type="text"
              name="title"
              placeholder="e.g. Dune, Atomic Habits…"
              value={form.title}
              onChange={handleChange}
              maxLength={120}
            />
          </div>

          {/* Category + Your Name side-by-side */}
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="form-select"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">— Choose —</option>
                <option value="Book">📚 Book</option>
                <option value="Movie">🎬 Movie</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                className="form-input"
                type="text"
                name="name"
                placeholder="Anonymous"
                value={form.name}
                onChange={handleChange}
                maxLength={50}
              />
            </div>
          </div>

          {/* Star Rating — CSS-only reverse-flex trick */}
          <div className="form-field">
            <label>Rating</label>
            <div className="star-input">
              {[5, 4, 3, 2, 1].map((star) => (
                <React.Fragment key={star}>
                  <input
                    type="radio"
                    id={`star-${star}`}
                    name="rating"
                    value={star}
                    checked={Number(form.rating) === star}
                    onChange={handleChange}
                  />
                  <label htmlFor={`star-${star}`} title={`${star} star`}>★</label>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="form-field">
            <label htmlFor="reviewText">
              Your Micro-Review
            </label>
            <textarea
              id="reviewText"
              className="form-textarea"
              name="reviewText"
              placeholder="What made it great? What fell flat? Be quick about it…"
              value={form.reviewText}
              onChange={handleChange}
              maxLength={300}
            />
            <span className={`form-counter ${form.reviewText.length > 270 ? "warn" : ""}`}>
              {form.reviewText.length} / 300
            </span>
          </div>

          {/* Error message */}
          {error && <p className="studio__error">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="studio__submit"
            disabled={submitting}
          >
            {submitting ? "Posting…" : "Post Review ✦"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddReview;
