// src/utils/api.js
// ─────────────────────────────────────────────────────────────────
// Utility functions for writing to the API.
// Separating this from hooks keeps each file focused on one job.
// ─────────────────────────────────────────────────────────────────

const API_BASE = "/api/reviews";

// POST a new review to the backend
export async function createReview(reviewData) {
  const response = await fetch(API_BASE, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(reviewData),
  });

  const json = await response.json();

  // If the server returned an error status, throw so the caller can catch it
  if (!json.success) {
    throw new Error(json.message || "Failed to post review");
  }

  return json.data; // the newly saved review document
}

// GET analytics data
export async function fetchAnalytics() {
  const response = await fetch(`${API_BASE}/analytics`);
  const json     = await response.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}
