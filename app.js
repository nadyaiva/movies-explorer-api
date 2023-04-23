// app.js — входной файл

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerMovie = require('./routs/movie');
const routerUser = require('./routs/user');
const handleError = require('./middlewares/handleError');
const auth = require('./middlewares/auth');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { Joi, celebrate, errors } = require('celebrate');
const { createUser, signinUser } = require('./controllers/users');

const { PORT = 3002, DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb'} = process.env;

const app = express();
app.use(cors());
// подключаемся к серверу mongo
mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), signinUser);
app.use(auth);
app.use('/users', routerUser);
app.use('/movies', routerMovie);
app.use(errorLogger);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errors());
app.use(handleError);
app.listen(PORT);