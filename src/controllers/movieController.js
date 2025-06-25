import Movie from "../models/Movie.js";

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
  const movie = await Movie.findById(id);
  if (!movie) {
    return res.render("404", { pageTitle: "Movie not found." });
  }
  return res.render("detail", { pageTitle: movie.title, movie });
};

// mutations (create, update, delete)
export const addMovie = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Movie" });
};
export const createMovie = async (req, res) => {
  const {
    body: { title, summary, year, genres, posterImage },
    file,
  } = req;
  console.log(`# addMovie: ${JSON.stringify(file)}`);

  try {
    if (!title || !summary) {
      throw new Error("Mandatory fields are required.");
    }
    await Movie.create({
      title,
      summary,
      year: Movie.formatYear(year),
      genres: Movie.formatGenres(genres),
      posterImage,
      fileUrl: file ? file.path : undefined,
    });
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
  const {
    body: { title, summary, year, rating, genres, posterImage },
    file,
  } = req;
  console.log(`# updateMovie: ${file}`);

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
  await Movie.findByIdAndDelete(id);
  return res.redirect("/");
};
