import Movie from "../models/Movie.js";

// queries (read-list/search/detail)
export const home = async (req, res) => {
  const movies = await Movie.find({}).sort({ createdAt: -1 });
  return res.render("home", { pageTitle: "Home", movies });
};
export const search = async (req, res) => {
  const { keyword } = req.query;
  let movies = [];
  if (keyword) {
    movies = await Movie.find({
      title: {
        $regex: new RegExp(`$${keyword}$`, "i"),
      },
    });
    return res.render("home", { pageTitle: "Search", movies });
  }
};
export const detail = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  return res.render("detail", { pageTitle: movie.title, movie });
};

// mutations (create, update, delete)
export const addMovie = (req, res) => {
  return res.render("upload", { pageTitle: "Add Movie" });
};
export const createMovie = async (req, res) => {
  const { title, summary, genres, posterImage } = req.body;
  try {
    if (!title || !summary || !genres) {
      throw new Error("All fields are required.");
    }
    await Movie.create({
      title,
      summary,
      genres: Movie.formatGenres(genres),
      posterImage,
    });
    return res.redirect("/");
  } catch (error) {
    console.error("Error adding movie:", error);
    return res.render("upload", {
      pageTitle: "Add Movie",
      errorMessage: error._message,
    });
  }
};

export const editMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  return res.render("edit", { pageTitle: `Edit: ${movie.title}`, movie });
};
export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.exists({ _id: id });
  if (!movie) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  const { title, summary, year, rating, genres, posterImage } = req.body;
  await Movie.findByIdAndUpdate(id, {
    title,
    summary,
    genres: Movie.formatGenres(genres),
    year: year ? parseInt(year, 10) : new Date().getFullYear(),
    rating: rating ? parseFloat(rating) : 0,
    posterImage,
    updatedAt: Date.now(),
  });
  return res.redirect("/");
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  await Movie.findByIdAndDelete(id);
  return res.redirect("/");
};
