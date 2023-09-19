const { HttpError } = require("../../utils");
const Contact = require("../../models/contact");

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndRemove(contactId);
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContact;
