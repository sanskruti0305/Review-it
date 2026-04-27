import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-box">
     <h2 className="auth-title">Create Account ✦</h2>
<p className="auth-subtitle">
Join Review-It and start sharing your reviews
</p>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <input
          className="auth-input"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button
          className="auth-btn"
          type="submit"
        >
          Register
        </button>
      </form>

      <p className="auth-footer">
        Already have account?
        <Link to="/login"> Login</Link>
      </p>
    </div>
  </div>
);
};

export default Register;