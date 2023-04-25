const jwt = require('jsonwebtoken');
const UnautorizedError = require('../utils/UnautorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnautorizedError('Необходима авторизация'));
  }
  const token = authorization.split('Bearer ')[1];
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnautorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
}

module.exports = auth;
