require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mainRouter = require('./routs/index');
const handleError = require('./middlewares/handleError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3002, DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();
app.use(cors());
// подключаемся к серверу mongo
mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(mainRouter);
app.use(errorLogger);

app.use(errors());
app.use(handleError);
app.listen(PORT);
