import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 50 },
  summary: { type: String, required: true, trim: true, minLength: 20 },
  year: { type: Number, default: new Date().getFullYear() },
  rating: { type: Number, default: 0 },
  genres: [{ type: String }],
  posterImage: { type: String },
  fileUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

// middleware to format some fields before saving
// Case I
// export const formatYear = (year) => {
//   const parsed = parseInt(year, 10);
//   return isNaN(parsed) ? new Date().getFullYear() : parsed;
// };
// export const formatGenres = (year) => {
//   const parsed = genres.split(",").map((genre) => genre.trim());
//   return !parsed ? [] : parsed;
// };

// Case II
// movieSchema.pre("save", function (next) {
//   this.year = year ? parseInt(year, 10) : new Date().getFullYear();
//   this.genres = this.genres[0].split(",").map((genre) => genre.trim());
//   next();
// });

// Case III
movieSchema.static("formatYear", function (year) {
  return year ? parseInt(year, 10) : new Date().getFullYear();
});
movieSchema.static("formatGenres", function (genres) {
  return genres.split(",").map((genre) => genre.trim());
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
