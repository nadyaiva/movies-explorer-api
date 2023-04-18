const routerMovie = require('express').Router();

const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

routerMovie.get('/', getMovies);

routerMovie.post('/', postMovie);

routerMovie.delete('/_id', deleteMovie);

module.exports = routerMovie;