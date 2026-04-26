// src/pages/Analytics.js
// ─────────────────────────────────────────────────────────────────
// Shows aggregate stats: total reviews, overall avg rating,
// per-category counts and averages, and the 3 most recent reviews.
// Data comes from GET /api/reviews/analytics (MongoDB aggregation).
// ─────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";
import { fetchAnalytics } from "../utils/api";
import ReviewCard from "../components/ReviewCard";
import "./Analytics.css";

function Analytics() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  // Fetch analytics data once when the component mounts
  useEffect(() => {
    async function load() {
      try {
        const result = await fetchAnalytics();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []); // empty dependency array = runs once on mount

  // ── Helper: find stats for a specific category ────────────────
  function getCatStats(category) {
    if (!data?.statsByCategory) return { count: 0, avgRating: 0 };
    const found = data.statsByCategory.find((s) => s._id === category);
    return found || { count: 0, avgRating: 0 };
  }

  // ── Render ────────────────────────────────────────────────────
  if (loading) return <div className="page-wrapper"><div className="spinner" /></div>;

  if (error) {
    return (
      <div className="page-wrapper">
        <div className="state-center">
          <span className="icon">⚠️</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const books  = getCatStats("Book");
  const movies = getCatStats("Movie");

  return (
    <div className="page-wrapper">
      {/* Page heading */}
      <div className="page-hero">
        <p style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.14em",
          textTransform:"uppercase", color:"var(--green)", marginBottom:8 }}>
          Dashboard
        </p>
        <h1>Analytics</h1>
        <p>A snapshot of everything posted on Review-It.</p>
      </div>

      {/* ── Top-level stat cards ── */}
      <div className="analytics__stats">

        <div className="stat-card" style={{ animationDelay: "0s" }}>
          <p className="stat-card__label">Total Reviews</p>
          <p className="stat-card__value grad-text-book">{data.totalReviews}</p>
          <p className="stat-card__sub">across all categories</p>
        </div>

        <div className="stat-card" style={{ animationDelay: "0.07s" }}>
          <p className="stat-card__label">Overall Avg Rating</p>
          <p className="stat-card__value grad-text-movie">
            {data.overallAvgRating}
            <span style={{ fontSize:"1.2rem", marginLeft:6 }}>★</span>
          </p>
          <p className="stat-card__sub">out of 5 stars</p>
        </div>

        <div className="stat-card" style={{ animationDelay: "0.14s" }}>
          <p className="stat-card__label">Books Posted</p>
          <p className="stat-card__value" style={{ color:"var(--amber)" }}>{books.count}</p>
          <p className="stat-card__sub">
            Avg: {books.avgRating ? Number(books.avgRating).toFixed(1) : "—"} ★
          </p>
        </div>

        <div className="stat-card" style={{ animationDelay: "0.21s" }}>
          <p className="stat-card__label">Movies Posted</p>
          <p className="stat-card__value" style={{ color:"var(--cyan)" }}>{movies.count}</p>
          <p className="stat-card__sub">
            Avg: {movies.avgRating ? Number(movies.avgRating).toFixed(1) : "—"} ★
          </p>
        </div>

      </div>

      {/* ── Category Rating Bars ── */}
      <div className="analytics__breakdown">

        <div className="breakdown-card book">
          <span className="breakdown-card__emoji">📚</span>
          <h3 className="grad-text-book">Books</h3>
          <p className="breakdown-card__count">{books.count} reviews</p>
          <div className="rating-bar-wrap">
            <div className="rating-bar-label">
              <span>Average Rating</span>
              <span>{books.avgRating ? Number(books.avgRating).toFixed(2) : "0.00"} / 5</span>
            </div>
            <div className="rating-bar-track">
              {/* Fill width = (avgRating / 5) × 100% */}
              <div
                className="rating-bar-fill book"
                style={{ width: `${(books.avgRating / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="breakdown-card movie">
          <span className="breakdown-card__emoji">🎬</span>
          <h3 className="grad-text-movie">Movies</h3>
          <p className="breakdown-card__count">{movies.count} reviews</p>
          <div className="rating-bar-wrap">
            <div className="rating-bar-label">
              <span>Average Rating</span>
              <span>{movies.avgRating ? Number(movies.avgRating).toFixed(2) : "0.00"} / 5</span>
            </div>
            <div className="rating-bar-track">
              <div
                className="rating-bar-fill movie"
                style={{ width: `${(movies.avgRating / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* ── Recent Reviews Preview ── */}
      {data.recentReviews?.length > 0 && (
        <div className="analytics__recent">
          <h2>Recently Posted</h2>
          <div className="analytics__recent-grid">
            {data.recentReviews.map((r, i) => (
              <ReviewCard key={r._id} review={r} index={i} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Analytics;
