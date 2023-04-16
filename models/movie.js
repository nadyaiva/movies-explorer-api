const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new mongoose.Schema({
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
    _id: Schema.Types.ObjectId, //not sure about this
    requered: true,
  },
  movieId: {
    _id: Schema.Types.ObjectId, //it should be from respond, so maybe it's not correct
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