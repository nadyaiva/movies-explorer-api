const routerUser = require('express').Router();

const { getUserMe, patchUserMe } = require('../controllers/users');

routerUser.get('/', getUserMe);

routerUser.patch('/me', patchUserMe);

module.exports = routerUser;