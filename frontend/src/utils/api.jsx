
const API_BASE = "https://review-it-backend.onrender.com/api/reviews";

// POST
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

// GET 
export async function fetchAnalytics() {
  const response = await fetch(`${API_BASE}/analytics`);
  const json     = await response.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

// PUT 
export async function updateReview(id, reviewData) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method:  "PUT",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(reviewData),
  });

  const json = await response.json();
  if (!json.success) throw new Error(json.message || "Failed to update review");
  return json.data;
}

// DELETE 
export async function deleteReview(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  const json = await response.json();
  if (!json.success) throw new Error(json.message || "Failed to delete review");
  return json;
}
