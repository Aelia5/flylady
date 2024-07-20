const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-err');
const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const DefaultError = require('../errors/default-err');

const {
  validationErrorMessage,
} = require('../utils/constants');

const notFoundMessage = 'Такой пользователь не существует';
const unauthorizedMessage = 'Вы ввели неправильный логин или пароль';
const conflictMessage = 'Пользователь с такой почтой уже существует';

const { SUCCESS_CODE } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
        .then((user) => res.status(SUCCESS_CODE).send({
          name: user.name,
          email: user.email,
          _id: user._id,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError(conflictMessage));
          } else if (err.name === 'ValidationError') {
            next(new ValidationError(err.message));
          } else {
            next(new DefaultError('При регистрации пользователя произошла ошибка.'));
          }
        });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(unauthorizedMessage);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(unauthorizedMessage);
          }
          return (user);
        });
    })
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
                { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user,
    { name: req.body.name, email: req.body.email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundMessage);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError(err.message || validationErrorMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(conflictMessage));
      } else {
        next(new DefaultError('При обновлении профиля произошла ошибка.'));
      }
    });
};
