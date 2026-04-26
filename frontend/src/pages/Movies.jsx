import React from "react";
import useReviews from "../hooks/useReviews";
import ReviewCard from "../components/ReviewCard";
import "../pages/Home.css"; // reuse the feed-grid layout

function Movies() {
  // Pass category:"Movie" so the backend only returns movie reviews
  const { reviews, loading, error } = useReviews({ category: "Movie" });

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <p style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.14em",
          textTransform:"uppercase", color:"var(--cyan)", marginBottom:8 }}>
          Category
        </p>
        <h1 className="grad-text-movie">Movies 🎬</h1>
        <p>Every micro-review posted for films.</p>
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
          <span className="icon">🎬</span>
          <p>No movie reviews yet. Go watch something!</p>
        </div>
      )}

      {!loading && !error && reviews.length > 0 && (
        <>
          <p style={{ fontSize:"0.78rem", color:"var(--text-dim)", marginBottom:20 }}>
            {reviews.length} movie review{reviews.length !== 1 ? "s" : ""}
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

export default Movies;
