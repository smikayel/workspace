import * as Joi from 'joi'

const authSchema: Record<string, Joi.Schema> = {
	login: Joi.object().keys({
        email: Joi.string().required(),
		password: Joi.string().min(5).max(16).required(),
	}),
};

export default authSchema;
