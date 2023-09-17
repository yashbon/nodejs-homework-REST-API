const Joi = require("joi");
const { emailRegexp } = require("../models/user");

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    // subscription: Joi.string().valid(...["starter", "pro", "business"]),
});

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
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
    emailSchema,
    loginSchema,
    updateSubscriptionSchema,
};

module.exports = { schemas };
