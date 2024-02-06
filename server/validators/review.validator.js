import Joi from "joi";

export const ratingValidator = ({ rating }) => {
  const schema = Joi.number().min(1).max(5).required().messages({
    "number.base": `Rating should be a number`,
    "number.empty": `Rating cannot be empty`,
    "number.min": `Rating should be not less than {#limit}`,
    "number.max": `Rating should not more than {#limit}`,
    "any.required": `Rating is required`,
  });
  return schema.validate(rating).error?.details[0].message;
};

export const reviewValidator = ({ review }) => {
  const schema = Joi.string().min(2).required().messages({
    "string.base": `Review should be a text`,
    "string.empty": `Review cannot be empty`,
    "any.required": `Review is required`,
  });
  return schema.validate(review).error?.details[0].message;
};
