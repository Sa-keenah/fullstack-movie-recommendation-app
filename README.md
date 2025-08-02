# 🎬 Fullstack Movie Recommendation App

A full-featured movie recommendation platform built with **React**, **Express**, **MongoDB**, and **Node.js**. Users can register, log in, browse movies, add favorites, create watchlists, leave reviews, and more.

---

## 🔗 Live Demo

- **Frontend (Vercel)**: [https://your-frontend-url.vercel.app](https://fullstack-movie-recommendation-app-two.vercel.app/)
- **Backend (Render)**: [https://your-backend-url.onrender.com](https://fullstack-movie-recommendation-app.onrender.com)

## 📁 Project Structure
fullstack-movie-recommendation-app/
├── client/ # React frontend
├── server/ # Express backend
├── package.json
└── README.md 


---

## 🚀 Features

- 🔐 User authentication (JWT-based)
- 🧾 Movie reviews & ratings
- ❤️ Favorite movies
- 📃 Watchlist management
- 🧑‍💼 Profile page
- 🔍 Discover trending movies (via TMDB API)
- 🌐 Fully responsive UI

---

## 🛠️ Tech Stack

| Frontend  | Backend   | Database |
|-----------|-----------|----------|
| React     | Node.js   | MongoDB  |
| Axios     | Express   | Mongoose |
| TMDB API  | JWT Auth  |          |

---

## 🔧 Getting Started (Locally)

### 📦 Prerequisites

- Node.js & npm
- MongoDB
- TMDB API key

### 📍 Setup

```bash
git clone https://github.com/your-username/fullstack-movie-recommendation-app.git
cd fullstack-movie-recommendation-app


---

## 🚀 Features

- 🔐 User authentication (JWT-based)
- 🧾 Movie reviews & ratings
- ❤️ Favorite movies
- 📃 Watchlist management
- 🧑‍💼 Profile page
- 🔍 Discover trending movies (via TMDB API)
- 🌐 Fully responsive UI

---

## 🛠️ Tech Stack

| Frontend  | Backend   | Database |
|-----------|-----------|----------|
| React     | Node.js   | MongoDB  |
| Axios     | Express   | Mongoose |
| TMDB API  | JWT Auth  |          |

---

## 🔧 Getting Started (Locally)

### 📦 Prerequisites

- Node.js & npm
- MongoDB
- TMDB API key

### 📍 Setup

```bash
git clone https://github.com/your-username/fullstack-movie-recommendation-app.git
cd fullstack-movie-recommendation-app

1. Setup Backend (server)
cd server
npm install

Create .env in server/:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

Start the backend:
npm run dev

2. Setup Frontend (client)
cd ../client
npm install

Create .env in client/:
REACT_APP_API_URL=http://localhost:5000
REACT_APP_TMDB_KEY=your_tmdb_api_key

Start the frontend:
npm start

🌍 Deployment
🔹 Frontend – Vercel
Deploy the client/ folder on vercel.com

Set environment variables in Vercel dashboard

🔹 Backend – Render
Deploy the server/ folder on render.com
Add environment variables (MONGO_URI, JWT_SECRET, etc.)

🧑‍💻 Author
Your Name
GitHub

### 🔐 Authentication
- User registration and login are handled with secure password hashing using [`bcryptjs`](https://www.npmjs.com/package/bcryptjs).
- JWT tokens are generated using `jsonwebtoken` for authentication and protected routes.

### 🔐 JWT Authentication
Protected routes require a valid JWT in the `Authorization` header. 
JWTs are issued upon login and verified via centralized middleware (`middleware/auth.js`) 
to ensure secure access control.

```js
Authorization: Bearer <your_token>

### 👤 User Endpoints
### 👤 User Endpoints

- `POST /api/users/favorites` – Add movie to favorites
- `DELETE /api/users/favorites/:movieId` – Remove favorite
- `POST /api/users/watchlists` – Create new watchlist
- `POST /api/users/watchlists/:title/add` – Add movie to a watchlist
- `POST /api/users/watchlists/:title/remove` – Remove movie from watchlist
- `DELETE /api/users/watchlists/:title` – Delete watchlist
- `GET /api/users/me` – Get current user profile **(JWT protected)**
- `PUT /api/users/me` – Update user profile **(JWT protected)**
All protected endpoints require `Authorization: Bearer <token>` header.
