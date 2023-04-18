const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  contry: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  duration: {
    type: Number,
    requered: true,
    minlength: 1,
    maxlength: 3,
  },
  year: {
    type: String,
    requered: true,
  },
  description: {
    type: String,
    requered: true,
  },
  image: {
    type: String,
    requered: true,
    validate: {
      validator: (link) => { validator.isURL(link); },
      message: 'Неккоректная ссылка на картинку',
    },
  },
  trailerLink: {
    type: String,
    requered: true,
    validate: {
      validator: (link) => { validator.isURL(link); },
      message: 'Неккоректная ссылка на картинку',
    },
  },
  thumbnail: {
    type: String,
    requered: true,
    validate: {
      validator: (link) => { validator.isURL(link); },
      message: 'Неккоректная ссылка на картинку',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    requered: true,
  },
  movieId: {
    type: String,
    requered: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
});

module.exports = mongoose.model('movie', movieSchema);