import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  movies: [{ type: Number }], // TMDB movie IDs
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  favorites: [{ type: Number }], // TMDB movie IDs
  watchlists: [watchlistSchema],
}, { timestamps: true });

export default mongoose.model('User', userSchema);