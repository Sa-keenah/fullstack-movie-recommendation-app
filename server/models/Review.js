import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movieId: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 10 },
  comment: String,
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);