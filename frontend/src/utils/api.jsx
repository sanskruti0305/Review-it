const API_BASE =
  "https://review-it-backend.onrender.com/api/reviews";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/* =========================
   CREATE REVIEW
========================= */

export async function createReview(reviewData) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(reviewData),
  });

  const json = await response.json();

  if (!json.success) {
    throw new Error(
      json.message || "Failed to post review"
    );
  }

  return json.data;
}

/* =========================
   GET ANALYTICS
========================= */

export async function fetchAnalytics() {
  const response = await fetch(
    `${API_BASE}/analytics`
  );

  const json = await response.json();

  if (!json.success) {
    throw new Error(
      json.message || "Failed to fetch analytics"
    );
  }

  return json.data;
}

/* =========================
   UPDATE REVIEW
========================= */

export async function updateReview(
  id,
  reviewData
) {
  const response = await fetch(
    `${API_BASE}/${id}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(reviewData),
    }
  );

  const json = await response.json();

  if (!json.success) {
    throw new Error(
      json.message || "Failed to update review"
    );
  }

  return json.data;
}

/* =========================
   DELETE REVIEW
========================= */

export async function deleteReview(id) {
  const response = await fetch(
    `${API_BASE}/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );

  const json = await response.json();

  if (!json.success) {
    throw new Error(
      json.message || "Failed to delete review"
    );
  }

  return json;
}

/* =========================
   GET MY REVIEWS
========================= */

export async function fetchMyReviews() {
  const response = await fetch(
    `${API_BASE}/my-reviews`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );

  const json = await response.json();

  if (!json.success) {
    throw new Error(
      json.message || "Failed to fetch your reviews"
    );
  }

  return json.data;
}