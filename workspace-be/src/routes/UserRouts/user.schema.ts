import * as Joi from "joi";

const allowedRoles = ["Admin", "Customer"];

const userSchema: Record<string, Joi.Schema> = {
  userAccount: Joi.object().keys({
    email: Joi.string().required(),
    role: Joi.string().valid(...allowedRoles),
    username: Joi.string().required(),
    password: Joi.string().min(5).max(16).required(),
  }),
  userUpdate: Joi.object().keys({
    newEmail: Joi.string().required(),
    role: Joi.string().valid(...allowedRoles),
    email: Joi.string(),
    username: Joi.string(),
  }),
};

export default userSchema;
