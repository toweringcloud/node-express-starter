import {
  addMovie,
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear,
} from '../db';

export const home = (req, res) => {
  const movies = getMovies();
  return res.render('movie_list', { pageTitle: 'Movies!', movies });
};
export const detail = (req, res) => {
  const movie = getMovieById(req.params.id);
  return res.render('movie_detail', { pageTitle: movie.title, movie });
};
export const filter = (req, res) => {
  const year = req.query.year;
  if (year) {
    const movies = getMovieByMinimumYear(year);
    return res.render('movie_list', {
      pageTitle: `Filter by year: ${year}`,
      movies,
    });
  }
  const rating = req.query.rating;
  if (rating) {
    const movies = getMovieByMinimumRating(rating);
    return res.render('movie_list', {
      pageTitle: `Filter by rating: ${rating}`,
      movies,
    });
  }
};
export const getAdd = (req, res) => {
  return res.render('movie_add', { pageTitle: 'Add Movie' });
};
export const postAdd = (req, res) => {
  const { title, synopsis, genres } = req.body;
  addMovie({ title, synopsis, genres: genres.split(',') });
  return res.redirect('/');
};
export const getEdit = (req, res) => {
  return res.render('movie_edit', { pageTitle: 'Edit Movie' });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  if (!getMovieById(id)) {
    return res.status(404).send('Movie not found');
  }
  const { title } = req.body;
  getMovies().map((movie) => {
    if (movie.id === parseInt(id, 10)) {
      return { ...movie, title };
    }
    return movie;
  });
  return res.redirect('/movies');
};
