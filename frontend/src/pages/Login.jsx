import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login successful");
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

 return (
  <div className="auth-container">
    <div className="auth-box">
      <h2 className="auth-title">Welcome Back</h2>
<p className="auth-subtitle">
Login to post, edit and manage your reviews
</p>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
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
          Login
        </button>
      </form>

      <p className="auth-footer">
        New user?
        <Link to="/register"> Register</Link>
      </p>
    </div>
  </div>
);
};

export default Login;