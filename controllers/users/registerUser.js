const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../utils");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (user) {
        throw HttpError(409, "Email is already in use");
    }
    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
        avatarURL,
        verificationToken,
    });

    const { BASE_URL } = process.env;
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    // send email
    // const emailData = {
    //     to: email,
    //     // from: "bohdan.yashchyshyn@meta.ua",
    //     subject: "Test email",
    //     html: "<p>Test email</p>",
    // };
    // sendEmail(emailData);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL,
        },
    });
};

module.exports = register;
