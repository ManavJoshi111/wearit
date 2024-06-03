import Joi from "joi";

export const firstNameValidator = ({ firstName }) => {
  const schema = Joi.string().min(2).required().messages({
    "string.base": `First name should be a type of 'text'`,
    "string.empty": `First name is required`,
    "string.min": `First name should have a minimum length of {#limit}`,
    "any.required": `First name is required`,
  });
  return {
    field: "firstName",
    error: schema.validate(firstName).error?.details[0].message,
  };
};

export const lastNameValidator = ({ lastName }) => {
  const schema = Joi.string().min(2).required().messages({
    "string.base": `Last name should be a type of 'text'`,
    "string.empty": `Last name is required`,
    "string.min": `Last name should have a minimum length of {#limit}`,
    "any.required": `Last name is required`,
  });
  return {
    field: "lastName",
    error: schema.validate(lastName).error?.details[0].message,
  };
};

export const emailValidator = ({ email }) => {
  const schema = Joi.string().email().required().messages({
    "string.base": `Email should be a type of 'text'`,
    "string.empty": `Email is required`,
    "string.email": `Email format is invalid`,
    "any.required": `Email is required`,
  });
  return {
    field: "email",
    error: schema.validate(email).error?.details[0].message,
  };
};

export const passwordValidator = ({ password }) => {
  const schema = Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\d)/)
    .min(6)
    .required()
    .messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password is required`,
      "string.pattern.base": `Password must contain at least one uppercase letter, one lowercase letter, one number and one special character`,
      "string.min": `Password should have a minimum length of {#limit}`,
      "any.required": `Password is required`,
    });
  return {
    field: "password",
    error: schema.validate(password).error?.details[0].message,
  };
};

export const confirmPasswordValidator = ({ password, confirmPassword }) => {
  if (password !== confirmPassword) {
    return { field: "confirmPassword", error: "Passwords must match" };
  }
  return null;
};

export const typeValidator = ({ type }) => {
  const schema = Joi.string().valid("buyer", "seller").required();
  return {
    field: "type",
    error: schema.validate(type).error?.details[0].message,
  };
};

export const companyNameValidator = ({ type, companyName }) => {
  const schema =
    type === "buyer"
      ? Joi.string().allow("")
      : Joi.string().min(2).required().messages({
          "string.base": `Company name should be a type of 'text'`,
          "string.empty": `Company name is required`,
          "string.min": `Company name should have a minimum length of {#limit}`,
          "any.required": `Company name is required`,
        });
  return {
    field: "companyName",
    error: schema.validate(companyName).error?.details[0].message,
  };
};

export const companyAddressValidator = ({ type, companyAddress }) => {
  const schema =
    type === "buyer"
      ? Joi.string().allow("")
      : Joi.string().min(2).required().messages({
          "string.base": `Company address should be a type of 'text'`,
          "string.empty": `Company address is required`,
          "string.min": `Company address should have a minimum length of {#limit}`,
          "any.required": `Company address is required`,
        });
  return {
    field: "companyAddress",
    error: schema.validate(companyAddress).error?.details[0].message,
  };
};
