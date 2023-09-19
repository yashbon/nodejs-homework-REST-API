const Contact = require("../../models/contact");

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    const query = { owner };
    if (favorite === "true") {
        query.favorite = true;
    }

    const contactsList = await Contact.find(query, "-createdAt -updatedAt", {
        skip,
        limit,
    }).populate("owner", "name email");
    res.json(contactsList);
};

module.exports = getAllContacts;
