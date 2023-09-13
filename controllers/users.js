const { HttpError, ctrlWrapper } = require("../utils");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (user) {
        throw HttpError(409, "Email is already in use");
    }

    const avatarURL = gravatar.url(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
        avatarURL,
    });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL,
        },
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user._id };
    const { SECRET_KEY } = process.env;
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    await User.findByIdAndUpdate(user._id, { token }).exec();

    res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
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

const fs = require("fs/promises");
const path = require("path");
const avatarsDir = path.join(__dirname, "..", "public", "avatars");
const Jimp = require("jimp");

const uploadAvatar = async (req, res, next) => {
    const { path: tempUpload, originalname } = req.file;
    const idUser = req.user._id;
    const filename = `${idUser}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    await Jimp.read(tempUpload)
        .then((file) => {
            return (
                file
                    .cover(250, 250) // resize
                    // .quality(60) // set JPEG quality
                    // .greyscale() // set greyscale
                    .write(tempUpload)
            ); // save
        })
        .catch((err) => {
            console.error(err);
        });

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(idUser, { avatarURL });

    res.json({ avatarURL });
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrentUser: ctrlWrapper(getCurrentUser),
    updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
    uploadAvatar: ctrlWrapper(uploadAvatar),
};
