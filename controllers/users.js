const { HttpError, ctrlWrapper } = require("../utils");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email is already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
    });

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // if (!user) {
    //     throw HttpError(401, "Email or password is wrong");
    // }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!user || !validPassword) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };
    const { SECRET_KEY } = process.env;
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

    res.status(200).json({
        token,
        email: user.email,
        subscription: user.subscription,
    });
};

module.exports = { register: ctrlWrapper(register), login: ctrlWrapper(login) };
