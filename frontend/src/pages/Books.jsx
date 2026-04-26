import React from "react";
import useReviews from "../hooks/useReviews";
import ReviewCard from "../components/ReviewCard";
import "../pages/Home.css";

function Books() {
  const { reviews, loading, error } = useReviews({ category: "Book" });

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <p style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.14em",
          textTransform:"uppercase", color:"var(--amber)", marginBottom:8 }}>
          Category
        </p>
        <h1 className="grad-text-book">Books 📚</h1>
        <p>Every micro-review posted for books.</p>
      </div>

      {loading && <div className="spinner" />}

      {error && (
        <div className="state-center">
          <span className="icon">⚠️</span>
          <p>Could not load reviews. Is the backend running?</p>
        </div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div className="state-center">
          <span className="icon">📚</span>
          <p>No book reviews yet. Start reading something!</p>
        </div>
      )}

      {!loading && !error && reviews.length > 0 && (
        <>
          <p style={{ fontSize:"0.78rem", color:"var(--text-dim)", marginBottom:20 }}>
            {reviews.length} book review{reviews.length !== 1 ? "s" : ""}
          </p>
          <div className="feed-grid">
            {reviews.map((r, i) => (
              <ReviewCard key={r._id} review={r} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Books;
