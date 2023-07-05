import * as Joi from "joi";

const workspaceSchema: Record<string, Joi.Schema> = {
    create: Joi.object().keys({
        name: Joi.string().required(),
        slug: Joi.string().required(),
    }),
    delete: Joi.object().keys({
        workspaceId: Joi.number().required(),
    }),
    checkAvalability: Joi.object().keys({
        workspaceSlug: Joi.string().required(),
    }),
    
};

export default workspaceSchema;
