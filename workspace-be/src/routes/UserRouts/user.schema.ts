import * as Joi from "joi";

const allowedRoles = ["Admin", "Customer"];

const userSchema: Record<string, Joi.Schema> = {
  userAccount: Joi.object().keys({
    email: Joi.string().required(),
    companyName: Joi.string(),
    role: Joi.string().valid(...allowedRoles),
    username: Joi.string(),
    password: Joi.string().min(5).max(16).required(),
  }),
  userUpdate: Joi.object().keys({
    newEmail: Joi.string(),
    role: Joi.string().valid(...allowedRoles),
    companyName: Joi.string(),
    email: Joi.string(),
    username: Joi.string(),
  }),
};

export default userSchema;
