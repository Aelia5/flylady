const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const notFoundMessage = 'Такого дома не существует';
const forbiddenMessage = 'Вы не можете редактировать или удалять чужой дом';

module.exports.checkHouse = (house, userId) => {
  if (!house) {
    throw new NotFoundError(notFoundMessage);
  } else if (house.owner.toString() !== userId) {
    throw new ForbiddenError(forbiddenMessage);
  } else return house;
};
