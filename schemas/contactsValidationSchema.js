import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(4).max(15).required(),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(20),
  email: Joi.string().email().required(),
  phone: Joi.string().min(4).max(15),
  favorite: Joi.boolean(),
});

export const updateContactFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});
