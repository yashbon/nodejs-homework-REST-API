const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { HttpError } = require("../../utils");

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    const user = await User.findOne({ email }).exec();
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    if (!user.verify) {
        throw HttpError(401, "Email not verified");
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

module.exports = login;
