const Joi = require("joi");

exports.registerValidator = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\d)/)
    .min(6)
    .max(10)
    .required(),
  confirmPassowrd: Joi.ref("password"),
  type: Joi.any(),
});

exports.loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\d)/)
    .min(6)
    .max(10)
    .required(),
});
