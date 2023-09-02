const Joi = require("joi");

const addContactSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "missing required name field",
    }),
    email: Joi.string().required().messages({
        "any.required": "missing required email field",
    }),
    phone: Joi.string().required().messages({
        "any.required": "missing required phone field",
    }),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
    addContactSchema,
    updateFavoriteSchema,
};

module.exports = { schemas };
