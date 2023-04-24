require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mainRouter = require('./routs/index');
const handleError = require('./middlewares/handleError');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errors } = require('celebrate');
const { PORT = 3002, DB_ADDRESS } = process.env;

const app = express();
app.use(cors());
// подключаемся к серверу mongo
mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(mainRouter);
app.use(errorLogger);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errors());
app.use(handleError);
app.listen(PORT);