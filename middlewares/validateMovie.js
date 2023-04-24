const { celebrate, Joi } = require('celebrate');

const URL_PATTERN = /(https|http):\/\/(www.)?[a-zA-Z0-9-_]+\.[a-zA-Z]+(\/[a-zA-Z0-9-._/~:@!$&'()*+,;=]*$)?/;

module.exports.validateMoviePost = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(20),
    director: Joi.string().required().min(1).max(20),
    duration: Joi.number().required(),
    year: Joi.string().required().max(4),
    description: Joi.string().required().min(2).max(1000),
    image: Joi.string().required().pattern(URL_PATTERN),
    trailerLink: Joi.string().required().pattern(URL_PATTERN),
    thumbnail: Joi.string().required().pattern(URL_PATTERN),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required().min(1).max(40),
    nameEN: Joi.string().required().min(1).max(40),
  }),
});