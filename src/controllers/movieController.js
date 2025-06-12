import {
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear,
} from '../db';

export const home = (req, res) => {
  const movies = getMovies();
  return res.render('movie_list', { pageTitle: 'Movies!', movies });
};
export const movieDetail = (req, res) => {
  const movie = getMovieById(req.params.id);
  return res.render('movie_detail', { pageTitle: movie.title, movie });
};
export const filterMovie = (req, res) => {
  console.log(req.query);
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
