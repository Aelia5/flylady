const House = require('../models/house');

const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const {
  validationErrorMessage,
} = require('../utils/constants');

const notFoundMessage = 'Такого дома не существует';
const forbiddenMessage = 'Вы не можете удалить чужой дом';

const { SUCCESS_CODE } = require('../utils/constants');

module.exports.createHouse = (req, res, next) => {
  const { name } = req.body;
  House.create({ name, owner: req.user._id })
    .then((house) => House.findById(house._id).populate('owner'))
    .then((house) => res.status(SUCCESS_CODE).send(house))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(validationErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.getMyHouses = (req, res, next) => {
  House.find({owner: req.user._id}).populate('owner')
    .then((houses) => res.send(houses))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteHouse = (req, res, next) => {
  House.findById(req.params.id)
    .then((house) => {
      if (!house) {
        throw new NotFoundError(notFoundMessage);
      } else if (house.owner.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenMessage);
      } else {
        House.findByIdAndDelete(house._id)
          .then(() => res.send(house))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(validationErrorMessage));
      } else {
        next(err);
      }
    });
};
