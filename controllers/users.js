const { HttpError, ctrlWrapper } = require("../utils");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
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
    const user = await User.findOne({ email }).exec();

    const validPassword = await bcrypt.compare(password, user.password);
    // console.log(validPassword);
    if (!user || !validPassword) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };
    const { SECRET_KEY } = process.env;
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    await User.findByIdAndUpdate(user._id, { token }).exec();

    res.status(200).json({
        token,
        email: user.email,
        subscription: user.subscription,
    });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null }).exec();
    res.status(204).json({ message: "Logout success" }); // no message
};

const getCurrentUser = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
};

const updateSubscriptionUser = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const subscriptionsValues = ["starter", "pro", "business"];
    if (!subscriptionsValues.includes(subscription)) {
        throw HttpError(400, "Invalid subscription value");
    }

    const subscriptionUpdate = await User.findByIdAndUpdate(
        _id,
        { subscription },
        { new: true }
    );

    if (!subscriptionUpdate) {
        throw HttpError(404, "User not found");
    }
    res.json(subscriptionUpdate);
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrentUser: ctrlWrapper(getCurrentUser),
    updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
};
