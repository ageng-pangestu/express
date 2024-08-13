import Joi from "joi";

export const createPostSchema = Joi.object({
  // title: Joi.string().min(3).max(30).required(),
  content: Joi.string().required().max(225),
});
