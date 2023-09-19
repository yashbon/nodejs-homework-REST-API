const { HttpError } = require("../../utils");
const { User } = require("../../models/user");

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

module.exports = updateSubscriptionUser;
