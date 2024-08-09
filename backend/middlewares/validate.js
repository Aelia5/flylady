const { celebrate, Joi } = require('celebrate');

module.exports.validateUserName = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(20),
    })
    .unknown(true),
});

module.exports.validatePlace = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
    })
    .unknown(true),
});

module.exports.validateEmail = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
    })
    .unknown(true),
});

module.exports.validatePassword = celebrate({
  body: Joi.object()
    .keys({
      password: Joi.string().required().min(7),
    })
    .unknown(true),
});

module.exports.validateTask = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(300),
    frequency: Joi.number().required().min(7).max(365),
    last: Joi.date(),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().length(24).hex().required(),
    })
    .unknown(true),
});

module.exports.validateZoneNumber = celebrate({
  params: Joi.object()
    .keys({
      zone: Joi.number().min(1).max(5),
    })
    .unknown(true),
});

module.exports.validateZoneOrder = celebrate({
  body: Joi.object().keys({
    newOrder: Joi.array().items(Joi.number().min(1).max(5)).length(5).unique(),
  }),
});
