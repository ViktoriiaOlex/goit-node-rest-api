import Joi from "joi";

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(25)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, "password")
    .required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  avatarURL: Joi.string(),
  verificationToken: Joi.any().forbidden(),
  verify: Joi.any().forbidden(),
});

export const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
