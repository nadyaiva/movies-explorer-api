const NotFoundError = require('../utils/NotFoundError');

module.exports = () => {
  throw new NotFoundError('Страница не найдена');
};
