import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  summary: {
    type: String,
    required: true,
    trim: true,
    minLength: 20,
  },
  genres: [{ type: String, required: true }],
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
