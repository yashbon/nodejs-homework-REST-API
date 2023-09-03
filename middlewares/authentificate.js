const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { HttpError } = require("../utils");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    // console.log("Bearer: ", bearer);
    if (bearer !== "Bearer") {
        next(HttpError(401));
    } else
        try {
            // console.log("in try");
            const { id } = jwt.verify(token, SECRET_KEY);
            const user = await User.findById(id);
            if (!user || !user.token || user.token !== token) {
                next(HttpError(401));
            }
            req.user = user;
            next();
        } catch {
            // console.log("in catch");
            next(HttpError(401));
        }
};

module.exports = authenticate;
