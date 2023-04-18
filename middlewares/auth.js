const jwt = require('jsonwebtoken');
const UnautorizedError = require('../utils/UnautorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new UnautorizedError('Необходима авторизация'));
  }
  const token = authorization.split('Bearer ')[1];
  console.log(token);
  let payload;

  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    return next(new UnautorizedError('Необходима авторизация'));
  }

  req.user = payload;
  console.log(req.user);
  next();
};
