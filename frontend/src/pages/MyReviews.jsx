import React, { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import "./MyReviews.css";

function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyReviews = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://review-it-backend.onrender.com/api/reviews/myreviews",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await response.json();

      if (!json.success) {
        throw new Error(
          json.message || "Failed to fetch your reviews"
        );
      }

      setReviews(json.data);
      setError("");
    } catch (err) {
      setError(
        err.message || "Could not load your reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--green)",
            marginBottom: 8,
          }}
        >
          Personal Space
        </p>

        <h1>My Reviews</h1>

        <p>
          Only your posted reviews appear here.
          Edit and delete from this page only.
        </p>
      </div>

      {loading && <div className="spinner" />}

      {error && (
        <div className="state-center">
          <span className="icon">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div className="state-center">
          <span className="icon">✦</span>
          <p>
            You have not posted any reviews yet.
          </p>
        </div>
      )}

      {!loading && !error && reviews.length > 0 && (
        <>
          <p className="home__feed-meta">
            You posted {reviews.length} review
            {reviews.length !== 1 ? "s" : ""}
          </p>

          <div className="feed-grid">
            {reviews.map((review, i) => (
              <ReviewCard
                key={review._id}
                review={review}
                index={i}
                onRefresh={fetchMyReviews}
                showActions={true}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MyReviews;