// src/pages/Home.js
// ─────────────────────────────────────────────────────────────────
// The main feed page ("/"). Shows all reviews in a responsive grid.
// Supports live search (debounced) and Latest / Top Rated sorting.
// ─────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from "react";
import useReviews from "../hooks/useReviews";
import ReviewCard from "../components/ReviewCard";
import "./Home.css";

function Home() {
  // Local UI state — these drive what we pass to the custom hook
  const [search, setSearch]   = useState("");
  const [sort,   setSort]     = useState("latest"); // "latest" | "rating"

  // Custom hook fetches reviews from the backend whenever sort changes.
  // Search is done client-side after fetch so it feels instant.
  const { reviews, loading, error } = useReviews({
    sort: sort === "rating" ? "rating" : undefined,
  });

  // ── Client-side search filter ────────────────────────────────
  // useMemo re-runs only when reviews or search changes — efficient!
  const filtered = useMemo(() => {
    if (!search.trim()) return reviews;
    const q = search.toLowerCase();
    return reviews.filter((r) =>
      r.title.toLowerCase().includes(q) ||
      r.name?.toLowerCase().includes(q)
    );
  }, [reviews, search]);

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="page-wrapper">
      {/* Hero heading */}
      <div className="home__hero">
        <p className="home__hero-eyebrow">The Reel</p>
        <h1>
          What the World is{" "}
          <span className="grad-text-book">Reading</span> &amp;{" "}
          <span className="grad-text-movie">Watching</span>
        </h1>
        <p>30-second micro reviews from real readers and viewers.</p>
      </div>

      {/* Search + Sort controls */}
      <div className="home__controls">
        <div className="home__search-wrap">
          <span className="home__search-icon">🔍</span>
          <input
            className="home__search"
            type="text"
            placeholder="Search by title or reviewer…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="home__pills">
          <button
            className={`pill-btn ${sort === "latest" ? "active" : ""}`}
            onClick={() => setSort("latest")}
          >
            ⏱ Latest
          </button>
          <button
            className={`pill-btn ${sort === "rating" ? "active" : ""}`}
            onClick={() => setSort("rating")}
          >
            ⭐ Top Rated
          </button>
        </div>
      </div>

      {/* Feed count */}
      {!loading && !error && (
        <p className="home__feed-meta">
          Showing {filtered.length} review{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* States: loading / error / empty / feed */}
      {loading && <div className="spinner" />}

      {error && (
        <div className="state-center">
          <span className="icon">⚠️</span>
          <p>Could not load reviews.<br />Make sure the backend server is running on port 5000.</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="state-center">
          <span className="icon">🎭</span>
          <p>No reviews found.<br />Be the first to post one!</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="feed-grid">
          {filtered.map((review, i) => (
            <ReviewCard key={review._id} review={review} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
