const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BadRequestError = require('../utils/BadRequestError');
const ConflictError = require('../utils/ConflictError');
const NotFoundError = require('../utils/NotFoundError');

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

const signinUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })).then((user) => res.status(201).send({
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      console.log(err);

      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные: ${err.message}`));
      } else next(err);
    });
};

const patchUserMe = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные: ${err.message}`));
      } else next(err);
    });
};

module.exports = { getUserMe, patchUserMe, createUser, signinUser }