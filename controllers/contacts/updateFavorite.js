const { HttpError } = require("../../utils");
const Contact = require("../../models/contact");

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const contactUpDate = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
    });
    console.log(contactUpDate);
    if (!contactUpDate) {
        throw HttpError(404, "Not found");
    }
    res.json(contactUpDate);
};

module.exports = updateFavorite;
