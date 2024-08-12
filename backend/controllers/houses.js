const House = require('../models/house');

const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');

const { validationErrorMessage } = require('../utils/constants');

const { SUCCESS_CODE } = require('../utils/constants');

const { checkAvailability } = require('../middlewares/check');

const { defaultZones } = require('../utils/constants');

const notFoundMessage = 'Такого дома не существует';
const forbiddenMessage = 'Вы не можете редактировать или удалять чужой дом';

module.exports.createHouse = (req, res, next) => {
  const { name } = req.body;
  House.create({ name, owner: req.user._id, zones: defaultZones })
    .then((house) => House.findById(house._id).populate('owner'))
    .then((house) => res.status(SUCCESS_CODE).send(house))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err);
        next(new ValidationError(validationErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.getMyHouses = (req, res, next) => {
  House.find({ owner: req.user._id })
    .populate('owner')
    .populate('zones')
    .then((houses) => res.status(SUCCESS_CODE).send(houses))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteHouse = (req, res, next) => {
  House.findById(req.params.id)
    .populate('zones')
    .then((house) =>
      checkAvailability(house, req.user._id, notFoundMessage, forbiddenMessage)
    )
    // .then((house) => {
    //   const zonesToDelete = [];
    //   house.zones.forEach((zone) => {
    //     zonesToDelete.push(zone._id);
    //   });
    //   Zone.deleteMany({ _id: { $in: zonesToDelete } })
    //     .then(() => House.findByIdAndDelete(house._id))
    //     .then(() => res.status(SUCCESS_CODE).send(house))
    //     .catch(next);
    // })
    .then((house) => House.findByIdAndDelete(house._id))
    .then((house) => res.status(SUCCESS_CODE).send(house))
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

module.exports.renameZone = (req, res, next) => {
  House.findById(req.params.id)
    .then((house) =>
      checkAvailability(house, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((house) => {
      house.zones[req.params.zone].name = req.body.name;
      return house;
    })
    .then((house) => {
      House.findByIdAndUpdate(
        house._id,
        { zones: house.zones },
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

module.exports.reorderZones = (req, res, next) => {
  House.findById(req.params.id)
    .then((house) =>
      checkAvailability(house, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((house) => {
      const newOrder = req.body.newOrder;
      const newZones = [
        house.zones[newOrder[0] - 1],
        house.zones[newOrder[1] - 1],
        house.zones[newOrder[2] - 1],
        house.zones[newOrder[3] - 1],
        house.zones[newOrder[4] - 1],
      ];
      house.zones = newZones;
      return house;
    })
    .then((house) => {
      House.findByIdAndUpdate(
        house._id,
        { zones: house.zones },
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

module.exports.addTask = (req, res, next) => {
  House.findById(req.params.id)
    .then((house) =>
      checkAvailability(house, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((house) => {
      house.zones[req.params.zone].tasks.unshift(req.body.name);
      return house;
    })
    .then((house) =>
      House.findByIdAndUpdate(
        house._id,
        { zones: house.zones },
        { new: true, runValidators: true }
      )
    )
    .then((house) => res.status(SUCCESS_CODE).send(house))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError(err.message || validationErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.deleteTask = (req, res, next) => {
  House.findById(req.params.id)
    .then((house) =>
      checkAvailability(house, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((house) => {
      if (req.params.task >= house.zones[req.params.zone].tasks.length) {
        throw new NotFoundError('Такая задача не найдена');
      }
      house.zones[req.params.zone].tasks = house.zones[
        req.params.zone
      ].tasks.filter((task, index) => {
        return index != req.params.task;
      });
      return house;
    })
    .then((house) =>
      House.findByIdAndUpdate(
        house._id,
        { zones: house.zones },
        { new: true, runValidators: true }
      )
    )
    .then((house) => res.status(SUCCESS_CODE).send(house))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError(err.message || validationErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.renameTask = (req, res, next) => {
  House.findById(req.params.id)
    .then((house) =>
      checkAvailability(house, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((house) => {
      if (req.params.task >= house.zones[req.params.zone].tasks.length) {
        throw new NotFoundError('Такая задача не найдена');
      }
      house.zones[req.params.zone].tasks[req.params.task] = req.body.name;
      return house;
    })
    .then((house) =>
      House.findByIdAndUpdate(
        house._id,
        { zones: house.zones },
        { new: true, runValidators: true }
      )
    )
    .then((house) => res.status(SUCCESS_CODE).send(house))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError(err.message || validationErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.completeTask = (req, res, next) => {
  House.findById(req.params.id)
    .then((house) =>
      checkAvailability(house, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((house) => {
      const completedTask = house.zones[req.params.zone].tasks[0];
      house.zones[req.params.zone].tasks.shift();
      house.zones[req.params.zone].tasks.push(completedTask);
      return house;
    })
    .then((house) =>
      House.findByIdAndUpdate(
        house._id,
        { zones: house.zones },
        { new: true, runValidators: true }
      )
    )
    .then((house) => res.status(SUCCESS_CODE).send(house))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError(err.message || validationErrorMessage));
      } else {
        next(err);
      }
    });
};
