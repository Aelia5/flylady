const House = require('../models/house');
const Room = require('../models/room');

const ValidationError = require('../errors/validation-err');
//const NotFoundError = require('../errors/not-found-err');
//const ForbiddenError = require('../errors/forbidden-err');

const { validationErrorMessage } = require('../utils/constants');

//const notFoundMessage = 'Такого дома не существует';
//const forbiddenMessage = 'Вы не можете удалить чужой дом';

const { SUCCESS_CODE } = require('../utils/constants');

const { checkHouse } = require('../middlewares/check');

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
  House.find({ owner: req.user._id })
    .populate('owner')
    .populate('rooms')
    .then((houses) => res.status(SUCCESS_CODE).send(houses))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteHouse = (req, res, next) => {
  House.findById(req.params.id)
    .then((house) => checkHouse(house, req.user._id))
    .then((house) => {
      House.findByIdAndDelete(house._id)
        .then(() => res.status(SUCCESS_CODE).send(house))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(validationErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.updateHouse = (req, res, next) => {
  House.findById(req.params.id)
    .then((house) => checkHouse(house, req.user._id))
    .then((house) => {
      House.findByIdAndUpdate(
        house._id,
        { name: req.body.name },
        { new: true, runValidators: true }
      )
        .then((house) => res.status(SUCCESS_CODE).send(house))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError(err.message || validationErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.createRoom = (req, res, next) => {
  const { name } = req.body;
  Room.create({ name, house: req.params.id })
    .then((room) => {
      House.findById(req.params.id)
        .then((house) => checkHouse(house, req.user._id))
        .then((house) => {
          console.log(room);
          House.findByIdAndUpdate(
            house._id,
            { $push: { rooms: room } },
            { new: true, runValidators: true }
          )
            .populate('rooms')
            .populate('owner')
            .then((house) => res.status(SUCCESS_CODE).send(house))
            .catch(next);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError(err.message || validationErrorMessage));
      } else {
        next(err);
      }
    });
};
