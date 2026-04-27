import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddReview from "./pages/AddReview";
import Movies from "./pages/Movies";
import Books from "./pages/Books";
import Analytics from "./pages/Analytics";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyReviews from "./pages/MyReviews";

function App() {
  return (
    <div className="app-shell">
      {/* Navbar renders on every page — it lives outside <Routes> */}
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddReview />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/books" element={<Books />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-reviews" element={<MyReviews />}
          />

        </Routes>
      </main>
    </div>
  );
}

export default App;
