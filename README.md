# Review-It v2 🎬📚
### Professional MERN Stack — MVC Architecture

---

## Folder Structure

```
review-it-v2/
│
├── backend/
│   ├── config/
│   │   └── db.js                  ← MongoDB connection logic
│   ├── models/
│   │   └── Review.js              ← Mongoose schema (data shape)
│   ├── controllers/
│   │   └── reviewController.js    ← Business logic (getReviews, getAnalytics, createReview)
│   ├── routes/
│   │   └── reviewRoutes.js        ← API endpoint definitions
│   ├── server.js                  ← Entry point (lean wiring file)
│   ├── package.json
│   └── .env.example               ← Copy to .env and add your MongoDB URI
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js           ← Sticky glass navbar with mobile menu
    │   │   ├── Navbar.css
    │   │   ├── ReviewCard.js       ← Reusable review card (Book / Movie variants)
    │   │   └── ReviewCard.css
    │   ├── hooks/
    │   │   └── useReviews.js       ← Custom hook: fetch reviews from API
    │   ├── pages/
    │   │   ├── Home.js             ← Feed with search + Latest/Top Rated toggle
    │   │   ├── Home.css
    │   │   ├── AddReview.js        ← Form with success state + useNavigate redirect
    │   │   ├── AddReview.css
    │   │   ├── Movies.js           ← Filtered movie reviews feed
    │   │   ├── Books.js            ← Filtered book reviews feed
    │   │   ├── Analytics.js        ← Stats dashboard (totals, avg ratings, bars)
    │   │   └── Analytics.css
    │   ├── styles/
    │   │   └── global.css          ← Design tokens, resets, shared utilities
    │   ├── utils/
    │   │   └── api.js              ← API write functions (createReview, fetchAnalytics)
    │   ├── App.js                  ← Route definitions
    │   └── index.js                ← React entry point
    └── package.json
```

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18, React Router DOM v6, Custom CSS |
| Backend   | Node.js, Express.js                     |
| Database  | MongoDB + Mongoose ODM                  |
| Styling   | Pure Custom CSS (no Bootstrap/Tailwind) |

---

## Setup & Running

### Step 1 — MongoDB URI

**Option A (Free Cloud — Recommended):**
1. Sign up at https://cloud.mongodb.com
2. Create a free M0 cluster
3. Add a DB user + whitelist your IP (or "Allow from Anywhere")
4. Click Connect → Drivers → copy the URI

**Option B (Local):** `mongodb://localhost:27017/reviewit`

---

### Step 2 — Backend

```bash
cd backend
cp .env.example .env
# Edit .env and paste your MONGO_URI

npm install
npm run dev
```

You should see:
```
✅  MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀  Server running on http://localhost:5000
```

---

### Step 3 — Frontend

```bash
cd frontend
npm install
npm start
```

Opens at http://localhost:3000 automatically.

> The `"proxy": "http://localhost:5000"` in frontend/package.json means
> all `/api/...` calls from React are forwarded to Express automatically.

---

## API Reference

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| GET    | `/api/reviews`              | All reviews (newest first)           |
| GET    | `/api/reviews?sort=rating`  | All reviews sorted by rating         |
| GET    | `/api/reviews?category=Book`| Reviews filtered by category         |
| GET    | `/api/reviews?search=dune`  | Reviews with title matching "dune"   |
| GET    | `/api/reviews/analytics`    | Aggregate stats (totals, avg ratings)|
| POST   | `/api/reviews`              | Create a new review                  |

### POST Body Example
```json
{
  "title": "Interstellar",
  "category": "Movie",
  "rating": 5,
  "reviewText": "A masterpiece of time, love, and space. Nolan at his peak.",
  "name": "Arjun"
}
```

---

## MVC Architecture Explained (for your Viva)

```
Request → routes/reviewRoutes.js (which endpoint?)
              ↓
        controllers/reviewController.js (what to do?)
              ↓
        models/Review.js (how is data structured?)
              ↓
        config/db.js → MongoDB (where is data stored?)
```

1. **Model** (`Review.js`) — defines the data shape and validation rules.
2. **View** (`React frontend`) — what the user sees; calls the API via fetch.
3. **Controller** (`reviewController.js`) — the brain; reads Model, sends response.
4. **Route** (`reviewRoutes.js`) — the router; maps HTTP verbs+URLs to controllers.

---

## Frontend Architecture

- **Custom Hook** (`useReviews.js`) — encapsulates all GET fetch logic. Any page can reuse it with different params.
- **Utility** (`utils/api.js`) — encapsulates POST/write API calls.
- **React Router** — `<BrowserRouter>` in index.js, routes in App.js, `useNavigate()` in AddReview for redirect after post.
- **CSS Architecture** — Global tokens in `global.css`, component styles co-located (e.g. `Navbar.css` next to `Navbar.js`).

---

*Review-It v2 — MERN Mini Project | MVC Backend + React Frontend*
