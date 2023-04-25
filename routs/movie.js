const routerMovie = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { validateMoviePost } = require('../middlewares/validateMovie');

const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

routerMovie.get('/', getMovies);

routerMovie.post('/', validateMoviePost, postMovie);

routerMovie.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
}), deleteMovie);

module.exports = routerMovie;
