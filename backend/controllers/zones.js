const Zone = require('../models/zone');
const Task = require('../models/task');

const ValidationError = require('../errors/validation-err');
const { validationErrorMessage } = require('../utils/constants');

const { SUCCESS_CODE } = require('../utils/constants');

const { checkAvailability } = require('../middlewares/check');

const notFoundMessage = 'Такой комнаты не существует';
const forbiddenMessage = 'Вы не можете редактировать или удалять чужую комнату';

module.exports.renameZone = (req, res, next) => {
  Zone.findById(req.params.id)
    .then((zone) =>
      checkAvailability(zone, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((zone) => {
      Zone.findByIdAndUpdate(
        zone._id,
        { name: req.body.name },
        { new: true, runValidators: true }
      )
        .then((zone) => res.status(SUCCESS_CODE).send(zone))
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
  Zone.findById(req.params.id)
    .then((zone) =>
      checkAvailability(zone, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((zone) =>
      Task.create({ name, frequency, owner: zone.owner }).then((task) => {
        Zone.findByIdAndUpdate(
          zone._id,
          { $push: { tasks: task } },
          { new: true, runValidators: true }
        )
          .populate('owner')
          .populate('tasks')
          .then((zone) => res.status(SUCCESS_CODE).send(zone))
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
//       Zone.findById(req.params.id)
//         .then((zone) =>
//           checkAvailability(
//             zone,
//             req.user._id,
//             notFoundMessage,
//             forbiddenMessage
//           )
//         )
//         .then((zone) => {
//           Zone.findByIdAndUpdate(
//             zone._id,
//             { $push: { tasks: task } },
//             { new: true, runValidators: true }
//           )
//             .populate('tasks')
//             .populate('owner')

//             .then((zone) => res.status(SUCCESS_CODE).send(zone))
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
