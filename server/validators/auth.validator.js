const Joi = require("joi");

exports.registerValidator = Joi.object({
  firstName: Joi.string().min(2).required().messages({
    "string.base": `First name should be a type of 'text'`,
    "string.empty": `First name cannot be an empty field`,
    "string.min": `First name should have a minimum length of {#limit}`,
    "any.required": `First name is required`,
  }),
  lastName: Joi.string().min(2).required().messages({
    "string.base": `Last name should be a type of 'text'`,
    "string.empty": `Last name cannot be an empty field`,
    "string.min": `Last name should have a minimum length of {#limit}`,
    "any.required": `Last name is required`,
  }),
  email: Joi.string().email().required().messages({
    "string.base": `Email should be a type of 'text'`,
    "string.empty": `Email cannot be an empty field`,
    "string.email": `Email format is invalid`,
    "any.required": `Email is required`,
  }),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\d)/)
    .min(6)
    .max(10)
    .required()
    .messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password cannot be an empty field`,
      "string.pattern.base": `Password must contain at least one uppercase letter, one lowercase letter, one number and one special character`,
      "string.min": `Password should have a minimum length of {#limit}`,
      "any.required": `Password is required`,
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": `Confirm password does not match with password`,
    "any.required": `Confirm password is a required`,
  }),
  type: Joi.string().valid("buyer", "seller").required(),
});

exports.loginValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": `Email should be a type of 'text'`,
    "string.empty": `Email cannot be an empty field`,
    "string.email": `Email format is invalid`,
    "any.required": `Email is required`,
  }),
  password: Joi.any(),
});
