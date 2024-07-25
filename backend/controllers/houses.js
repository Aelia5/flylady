const House = require('../models/house');
const Room = require('../models/room');
const Task = require('../models/task');

const ValidationError = require('../errors/validation-err');

const { validationErrorMessage } = require('../utils/constants');

const { SUCCESS_CODE } = require('../utils/constants');

const { checkAvailability } = require('../middlewares/check');

const notFoundMessage = 'Такого дома не существует';
const forbiddenMessage = 'Вы не можете редактировать или удалять чужой дом';

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
    .populate({ path: 'rooms', populate: { path: 'tasks' } })
    .then((houses) => res.status(SUCCESS_CODE).send(houses))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteHouse = (req, res, next) => {
  House.findById(req.params.id)
    .populate('rooms')
    .then((house) =>
      checkAvailability(house, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((house) => {
      const tasksToDelete = [];
      house.rooms.forEach((room) => {
        tasksToDelete.push(...room.tasks);
      });
      Task.deleteMany({ _id: { $in: tasksToDelete } })
        .then(() => Room.deleteMany({ house: house._id }))
        .then(() => House.findByIdAndDelete(house._id))
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

module.exports.renameHouse = (req, res, next) => {
  House.findById(req.params.id)
    .then((house) =>
      checkAvailability(house, req.user._id, notFoundMessage, forbiddenMessage)
    )
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
  House.findById(req.params.id)
    .then((house) =>
      checkAvailability(house, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((house) =>
      Room.create({ name, house: house._id, owner: house.owner }).then(
        (room) => {
          House.findByIdAndUpdate(
            house._id,
            { $push: { rooms: room } },
            { new: true, runValidators: true }
          )
            .populate('owner')
            .populate('rooms')
            .then((house) => res.status(SUCCESS_CODE).send(house))
            .catch(next);
        }
      )
    )
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError(err.message || validationErrorMessage));
      } else {
        next(err);
      }
    });
};
