const mainRouter = require('express').Router();
const routerMovie = require('./movie');
const routerUser = require('./user');
const auth = require('../middlewares/auth');
const { createUser, signinUser } = require('../controllers/users');
const { Joi, celebrate } = require('celebrate');

mainRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
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

module.exports = mainRouter;