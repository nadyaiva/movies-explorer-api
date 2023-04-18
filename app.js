// app.js — входной файл

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerMovie = require('./routs/movie');
const routerUser = require('./routs/user');

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', routerUser);
app.use('/movie', routerMovie);

app.listen(3000);