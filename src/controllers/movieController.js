import Movie from "../models/Movie";
import User from "../models/User";

// queries (read-list/search/watch)
export const listMovie = async (req, res) => {
  const movies = await Movie.find({}).sort({ createdAt: -1 });
  return res.render("home", { pageTitle: "Home", movies });
};

export const searchMovie = async (req, res) => {
  const { keyword } = req.query;
  let movies = [];
  if (keyword) {
    movies = await Movie.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
    console.log(keyword, movies);
  }
  return res.render("search", { pageTitle: "Search Movie", keyword, movies });
};

export const watchMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id).populate("owner");
  if (!movie) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  return res.render("watch", { pageTitle: movie.title, movie });
};

// mutations (create, update, delete)
export const addMovie = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Movie" });
};
export const createMovie = async (req, res) => {
  const {
    body: { title, summary, year, genres, posterImage },
    session: { user },
    file,
  } = req;
  try {
    if (!title || !summary || !year || !genres) {
      throw new Error("Mandatory fields are required.");
    }
    const newMovie = await Movie.create({
      title,
      summary,
      year: Movie.formatYear(year),
      genres: Movie.formatGenres(genres),
      posterImage,
      fileUrl: file ? file.path : undefined,
      owner: user._id,
    });
    const userInfo = await User.findById(user._id);
    userInfo.movies.push(newMovie._id);
    userInfo.save();
    return res.redirect("/");
  } catch (error) {
    console.error("Error adding movie:", error);
    return res.render("upload", {
      pageTitle: "Upload Movie",
      errorMessage: error._message,
    });
  }
};

export const editMovie = async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  if (String(movie.owner) !== String(user._id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit Movie`, movie });
};
export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  const movie = await Movie.exists({ _id: id });
  if (!movie) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  if (String(movie.owner) !== String(user._id)) {
    return res.status(403).redirect("/");
  }
  const {
    body: { title, summary, year, rating, genres, posterImage },
    file,
  } = req;
  await Movie.findByIdAndUpdate(id, {
    title,
    summary,
    year: Movie.formatYear(year),
    rating: rating ? parseFloat(rating) : 0,
    genres: Movie.formatGenres(genres),
    posterImage,
    fileUrl: file ? file.path : undefined,
    updatedAt: Date.now(),
  });
  return res.redirect("/");
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.status(404).render("404", { pageTitle: "Movie not found." });
  }
  if (String(movie.owner) !== String(user._id)) {
    return res.status(403).redirect("/");
  }
  await Movie.findByIdAndDelete(id);
  return res.redirect("/");
};
