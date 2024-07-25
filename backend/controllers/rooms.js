const Room = require('../models/room');
const Task = require('../models/task');

const ValidationError = require('../errors/validation-err');
const { validationErrorMessage } = require('../utils/constants');

const { SUCCESS_CODE } = require('../utils/constants');

const { checkAvailability } = require('../middlewares/check');

const notFoundMessage = 'Такой комнаты не существует';
const forbiddenMessage = 'Вы не можете редактировать или удалять чужую комнату';

module.exports.deleteRoom = (req, res, next) => {
  Room.findById(req.params.id)
    .then((room) =>
      checkAvailability(room, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((room) => {
      Room.findByIdAndDelete(room._id)
        .then((room) => Task.deleteMany({ _id: { $in: room.tasks } }))
        .then(() => res.status(SUCCESS_CODE).send(room))
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

module.exports.renameRoom = (req, res, next) => {
  Room.findById(req.params.id)
    .then((room) =>
      checkAvailability(room, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((room) => {
      Room.findByIdAndUpdate(
        room._id,
        { name: req.body.name },
        { new: true, runValidators: true }
      )
        .then((room) => res.status(SUCCESS_CODE).send(room))
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

module.exports.createTask = (req, res, next) => {
  const { name, frequency } = req.body;
  Room.findById(req.params.id)
    .then((room) =>
      checkAvailability(room, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((room) =>
      Task.create({ name, frequency, owner: room.owner }).then((task) => {
        Room.findByIdAndUpdate(
          room._id,
          { $push: { tasks: task } },
          { new: true, runValidators: true }
        )
          .populate('owner')
          .populate('tasks')
          .then((room) => res.status(SUCCESS_CODE).send(room))
          .catch(next);
      })
    )
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError(err.message || validationErrorMessage));
      } else {
        next(err);
      }
    });
};

// module.exports.createTask = (req, res, next) => {
//   const { name, frequency } = req.body;
//   Task.create({ name, frequency, owner: req.user._id })
//     .then((task) => {
//       Room.findById(req.params.id)
//         .then((room) =>
//           checkAvailability(
//             room,
//             req.user._id,
//             notFoundMessage,
//             forbiddenMessage
//           )
//         )
//         .then((room) => {
//           Room.findByIdAndUpdate(
//             room._id,
//             { $push: { tasks: task } },
//             { new: true, runValidators: true }
//           )
//             .populate('tasks')
//             .populate('owner')

//             .then((room) => res.status(SUCCESS_CODE).send(room))
//             .catch(next);
//         })
//         .catch(next);
//     })
//     .catch((err) => {
//       if (err.name === 'CastError' || err.name === 'ValidationError') {
//         next(new ValidationError(err.message || validationErrorMessage));
//       } else {
//         next(err);
//       }
//     });
// };
