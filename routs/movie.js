const routerMovie = require('express').Router();

const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

routerMovie.get('/movies', getMovies);

routerMovie.post('/movies', postMovie);

routerMovie.delete('/movies/_id', deleteMovie);

module.exports = routerMovie;