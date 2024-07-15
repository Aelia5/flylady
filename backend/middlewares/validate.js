const { celebrate, Joi } = require('celebrate');

module.exports.validateUserName = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(20),
  }).unknown(true),
});

module.exports.validateEmail = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }).unknown(true),
});

module.exports.validatePassword = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(7),
  }).unknown(true),
});

module.exports.validateTask = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(300),
    frequency: Joi.number().required().min(7).max(365),
  })
})

module.exports.validateRoom = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }).unknown(true),
})

module.exports.validateHouse = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }).unknown(true),
})

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});
