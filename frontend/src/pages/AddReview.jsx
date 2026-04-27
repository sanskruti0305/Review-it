import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReview } from "../utils/api";
import "./AddReview.css";

const INITIAL_FORM = {
  title: "",
  category: "",
  rating: 0,
  reviewText: "",
  name: "",
};

function AddReview() {
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      return setError("Please enter the title.");
    }

    if (!form.category) {
      return setError("Please select a category.");
    }

    if (!form.rating) {
      return setError("Please pick a star rating.");
    }

    if (!form.reviewText.trim()) {
      return setError("Review text cannot be empty.");
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await createReview({
        ...form,
        rating: Number(form.rating),
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/my-reviews");
      }, 2000);

    } catch (err) {
      setError(
        err.message || "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="studio">
        <div className="studio__card">
          <div className="studio__success">
            <span className="success-icon">✦</span>
            <h2 className="grad-text-book">
              Review Posted!
            </h2>
            <p>Taking you to My Reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="studio">
      <div className="studio__card">
        <div className="studio__header">
          <p className="studio__eyebrow">
            The Studio
          </p>

          <h1>
            Write a Micro-Review
          </h1>

          <p>
            Keep it punchy — 300 characters max.
          </p>
        </div>

        <form
          className="studio__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-field">
            <label>
              Title of Book / Movie
            </label>

            <input
              className="form-input"
              type="text"
              name="title"
              placeholder="e.g. Dune"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Category</label>

              <select
                className="form-select"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">
                  — Choose —
                </option>
                <option value="Book">
                  📚 Book
                </option>
                <option value="Movie">
                  🎬 Movie
                </option>
              </select>
            </div>

            <div className="form-field">
              <label>Your Name</label>

              <input
                className="form-input"
                type="text"
                name="name"
                placeholder="Anonymous"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-field">
            <label>Rating</label>

            <div className="star-input">
              {[5, 4, 3, 2, 1].map((star) => (
                <React.Fragment key={star}>
                  <input
                    type="radio"
                    id={`star-${star}`}
                    name="rating"
                    value={star}
                    checked={
                      Number(form.rating) === star
                    }
                    onChange={handleChange}
                  />

                  <label htmlFor={`star-${star}`}>
                    ★
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label>
              Your Micro-Review
            </label>

            <textarea
              className="form-textarea"
              name="reviewText"
              value={form.reviewText}
              onChange={handleChange}
              maxLength={300}
            />

            <span className="form-counter">
              {form.reviewText.length} / 300
            </span>
          </div>

          {error && (
            <p className="studio__error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="studio__submit"
            disabled={submitting}
          >
            {submitting
              ? "Posting..."
              : "Post Review ✦"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddReview;