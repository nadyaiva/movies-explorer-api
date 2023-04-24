const Movie = require('../models/movie');
const BadRequestError = require('../utils/BadRequestError');
const NotFoundError = require('../utils/NotFoundError');
const ForbiddenError = require('../utils/ForbiddenError');

const getMovies = (req, res, next) => {
    console.log(req.user._id);
    Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
}

const postMovie = (req, res, next) => {
  const { country, director, duration , year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
  Movie.create({ country, director, duration , year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные: ${err.message}`));
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий id фильма');
    })
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Попытка удалить не свой фильм');
      } Movie.deleteOne(movie)
      .then((movie) => res.send(movie))
         .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректно передан id фильма'));
      } else next(err);
    });
};

module.exports = { getMovies, postMovie, deleteMovie };