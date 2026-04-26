// src/hooks/useReviews.js
// ─────────────────────────────────────────────────────────────────
// Custom React hook that encapsulates all API communication.
// Any component that needs reviews just calls this hook —
// no fetch() logic scattered across pages.
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from "react";

const API_BASE = "/api/reviews"; // proxy in package.json routes to :5000

function useReviews(params = {}) {
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // Build query string from params object
  const buildUrl = useCallback(() => {
    const query = new URLSearchParams();
    if (params.search)   query.append("search",   params.search);
    if (params.category) query.append("category", params.category);
    if (params.sort)     query.append("sort",     params.sort);
    const qs = query.toString();
    return qs ? `${API_BASE}?${qs}` : API_BASE;
  }, [params.search, params.category, params.sort]);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(buildUrl());
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setReviews(json.data);
    } catch (err) {
      setError(err.message || "Could not reach the server");
    } finally {
      setLoading(false);
    }
  }, [buildUrl]);

  // Re-fetch whenever params change
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return { reviews, loading, error, refetch: fetchReviews };
}

export default useReviews;
