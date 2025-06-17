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
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
  rating: {
    type: Number,
    default: 0,
  },
  genres: [{ type: String }],
  posterImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// middleware to format genres before saving
// MovieSchema.pre("save", function (next) {
//   this.year = year ? parseInt(year, 10) : new Date().getFullYear();
//   this.genres = this.genres[0].split(",").map((genre) => genre.trim());
//   next();
// });
MovieSchema.static("formatYear", function (year) {
  return year && year.length() == 4
    ? parseInt(year, 10)
    : new Date().getFullYear();
});
MovieSchema.static("formatGenres", function (genres) {
  return genres.split(",").map((genre) => genre.trim());
});

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
