// src/components/ReviewCard.js
// ─────────────────────────────────────────────────────────────────
// Reusable card component. Renders differently for Book vs Movie
// using CSS class names and conditional styling.
// ─────────────────────────────────────────────────────────────────

import React from "react";
import "./ReviewCard.css";

// ── Helper: build 5 star icons ────────────────────────────────────
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

// ── Helper: format relative timestamp ─────────────────────────────
function timeAgo(isoString) {
  const diff = (Date.now() - new Date(isoString)) / 1000;
  if (diff < 60)    return "just now";
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(isoString).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

// ── Main Card Component ────────────────────────────────────────────
function ReviewCard({ review, index = 0 }) {
  const { title, category, rating, reviewText, name, createdAt } = review;
  const type = category === "Book" ? "book" : "movie";

  return (
    <article
      className={`review-card ${type}`}
      style={{ animationDelay: `${index * 0.06}s`, animation: "fadeUp 0.4s ease both" }}
    >
      <div className="card__header">
        <div className="card__meta">
          {/* Category pill badge */}
          <span className={`badge badge-${type}`}>
            {type === "book" ? "📚" : "🎬"} {category}
          </span>
          <h3 className="card__title">{title}</h3>
          <p className="card__author">by {name || "Anonymous"}</p>
        </div>

        {/* Star rating — top right */}
        <StarDisplay rating={rating} type={category} />
      </div>

      {/* The micro-review text */}
      <p className="card__text">{reviewText}</p>

      <div className="card__footer">
        <span className="card__time">⏱ {timeAgo(createdAt)}</span>
        <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
          {"★".repeat(rating)}{"☆".repeat(5 - rating)} {rating}/5
        </span>
      </div>
    </article>
  );
}

export default ReviewCard;
