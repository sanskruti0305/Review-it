

require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const connectDB = require("./config/db");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();
const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());              // allow cross-origin requests from the React frontend
app.use(express.json());      // parse JSON request bodies automatically

// All review endpoints are prefixed with /api/reviews
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Review-It API is running 🚀" });
});

app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});
