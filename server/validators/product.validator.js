import Joi from "joi";

export const proudctNameValidator = ({ name }) => {
  const schema = Joi.string().required().messages({
    "string.empty": `Name is required`,
    "any.required": `Name is required`,
  });
  return schema.validate(name).error?.details[0].message;
};

export const categoriesValidator = ({ categories }) => {
  const schema = Joi.array().min(1).items(Joi.string()).required().messages({
    "string.empty": `Categories are required`,
    "any.required": `Categories are required`,
    "array.min": "Categories are required",
  });
  return schema.validate(categories).error?.details[0].message;
};

export const priceValidator = ({ price }) => {
  const schema = Joi.number().positive().required().messages({
    "number.empty": `Price is required`,
    "number.positive": `Price must be a positive number`,
    "any.required": `Price is required`,
  });
  return schema.validate(price).error?.details[0].message;
};

export const imgUrlsValidator = ({ imgUrls }) => {
  const schema = Joi.array().items(Joi.string()).required().messages({
    "string.empty": `Please upload at least 1 product image`,
    "any.required": `Please upload at least 1 product image`,
  });
  return schema.validate(imgUrls).error?.details[0].message;
};
