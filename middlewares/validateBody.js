const { HttpError } = require("../utils");

const validateBody = (schema) => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            let errorMessage = "";
            Object.keys(req.body).length === 0
                ? (errorMessage = "missing fields")
                : (errorMessage = `missing required ${error.details[0].context.key} field`);
            next(HttpError(400, errorMessage));
        }
        next();
    };
    return func;
};
module.exports = validateBody;
