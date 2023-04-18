const User = require('../models/user');

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

const patchUserMe = (req, res, next) => {
  const user = req.body;
  console.log(req.body);
  // User.findByIdAndUpdate(req.user._id, { name, about }, {
  //   new: true,
  //   runValidators: true,
  // })

  const { email, name, password } = req.body;

  User.create({ email, name, password })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные: ${err.message}`));
      } else next(err);
    });
};

module.exports = { getUserMe, patchUserMe }