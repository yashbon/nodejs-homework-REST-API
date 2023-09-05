const Joi = require("joi");
const { emailRegexp } = require("../models/user");

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    // subscription: Joi.string().valid(...["starter", "pro", "business"]),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid(...["starter", "pro", "business"])
        .required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
};

module.exports = { schemas };
