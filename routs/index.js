const mainRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const routerMovie = require('./movie');
const routerUser = require('./user');
const auth = require('../middlewares/auth');
const { createUser, signinUser } = require('../controllers/users');
const handleNotFoundError = require('../middlewares/handleNotFoundError');

mainRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

mainRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), signinUser);
mainRouter.use(auth);
mainRouter.use('/users', routerUser);
mainRouter.use('/movies', routerMovie);
mainRouter.use(handleNotFoundError);

module.exports = mainRouter;
