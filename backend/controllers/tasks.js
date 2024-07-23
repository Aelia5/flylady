const Task = require('../models/task');

const ValidationError = require('../errors/validation-err');
const { validationErrorMessage } = require('../utils/constants');

const { SUCCESS_CODE } = require('../utils/constants');

const { checkAvailability } = require('../middlewares/check');

const notFoundMessage = 'Такой задачи не существует';
const forbiddenMessage = 'Вы не можете редактировать или удалять чужую задачу';

module.exports.deleteTask = (req, res, next) => {
  Task.findById(req.params.id)
    .then((task) =>
      checkAvailability(task, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((task) => {
      Task.findByIdAndDelete(task._id)
        .then(() => res.status(SUCCESS_CODE).send(task))
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

module.exports.editTask = (req, res, next) => {
  Task.findById(req.params.id)
    .then((task) =>
      checkAvailability(task, req.user._id, notFoundMessage, forbiddenMessage)
    )
    .then((task) => {
      Task.findByIdAndUpdate(
        task._id,
        { name: req.body.name, frequency: req.body.frequency },
        { new: true, runValidators: true }
      )
        .then((task) => res.status(SUCCESS_CODE).send(task))
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
