// server.js
// ─────────────────────────────────────────────────────────────────
// The application entry point. Thanks to our MVC separation,
// this file stays clean — it only wires things together.
//
// Responsibilities:
//   1. Load environment variables from .env
//   2. Connect to MongoDB
//   3. Register middleware (cors, json parsing)
//   4. Mount the routes
//   5. Start listening on a port
// ─────────────────────────────────────────────────────────────────

require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const connectDB = require("./config/db");
const reviewRoutes = require("./routes/reviewRoutes");

// ── Connect to Database ──────────────────────────────────────────
connectDB();

// ── Create Express App ───────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 5000;

// ── Global Middleware ────────────────────────────────────────────
app.use(cors());              // allow cross-origin requests from the React frontend
app.use(express.json());      // parse JSON request bodies automatically

// ── API Routes ───────────────────────────────────────────────────
// All review endpoints are prefixed with /api/reviews
app.use("/api/reviews", reviewRoutes);

// ── Health Check ─────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Review-It API is running 🚀" });
});

// ── Start Server ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});
