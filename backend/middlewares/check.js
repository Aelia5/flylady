const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.checkAvailability = (
  space,
  userId,
  notFoundMessage,
  forbiddenMessage
) => {
  if (!space) {
    throw new NotFoundError(notFoundMessage);
  } else if (space.owner.toString() !== userId) {
    throw new ForbiddenError(forbiddenMessage);
  } else return space;
};
