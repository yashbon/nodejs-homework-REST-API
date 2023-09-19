const { User } = require("../../models/user");

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null }).exec();
    res.status(204).json({ message: "Logout success" }); // no message
};

module.exports = logout;
