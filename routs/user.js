const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUserMe, patchUserMe } = require('../controllers/users');

routerUser.get('/', getUserMe);

routerUser.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), patchUserMe);

module.exports = routerUser;