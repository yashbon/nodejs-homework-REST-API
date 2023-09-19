const { HttpError, sendEmail } = require("../../utils");
const { User } = require("../../models/user");

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(400, "missing required field email");
    }
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }

    const { BASE_URL } = process.env;
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
    };
    await sendEmail(verifyEmail(email, user.verificationToken));

    res.json({ massage: "Verification email sent" });
};

module.exports = resendVerifyEmail;
