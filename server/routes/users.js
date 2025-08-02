import express from 'express';
import User from '../models/User.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Add movie to favorites
router.post('/favorites', verifyToken, async (req, res) => {
  const { movieId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      await user.save();
    }
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from favorites
router.delete('/favorites/:movieId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter(id => id !== Number(req.params.movieId));
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new watchlist
router.post('/watchlists', verifyToken, async (req, res) => {
  const { title } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.watchlists.push({ title, movies: [] });
    await user.save();
    res.status(201).json(user.watchlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Add a movie to a specific watchlist
router.post('/watchlists/:title/add', verifyToken, async (req, res) => {
  const { movieId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const list = user.watchlists.find(w => w.title === req.params.title);
    if (!list) return res.status(404).json({ error: 'Watchlist not found' });

    if (!list.movies.includes(movieId)) list.movies.push(movieId);
    await user.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Remove movie from watchlist
router.post('/watchlists/:title/remove', verifyToken, async (req, res) => {
  const { movieId } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const list = user.watchlists.find(w => w.title === req.params.title);
    if (!list) return res.status(404).json({ error: 'Watchlist not found' });

    list.movies = list.movies.filter(id => id !== movieId);
    await user.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an entire watchlist
router.delete('/watchlists/:title', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.watchlists = user.watchlists.filter(w => w.title !== req.params.title);
    await user.save();
    res.json(user.watchlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user profile
router.put('/me', verifyToken, async (req, res) => {
  const { username, email } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    ).select('-password');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router;