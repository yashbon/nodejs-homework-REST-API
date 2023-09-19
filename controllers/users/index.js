const register = require("./registerUser");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const login = require("./loginUser");
const logout = require("./logoutUser");
const getCurrentUser = require("./getCurrentUser");
const updateSubscriptionUser = require("./updateSubscriptionUser");
const uploadAvatar = require("./uploadAvatar");

const { ctrlWrapper } = require("../../utils");

module.exports = {
    register: ctrlWrapper(register),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrentUser: ctrlWrapper(getCurrentUser),
    updateSubscriptionUser: ctrlWrapper(updateSubscriptionUser),
    uploadAvatar: ctrlWrapper(uploadAvatar),
};
