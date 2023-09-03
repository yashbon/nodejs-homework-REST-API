const { HttpError, ctrlWrapper } = require("../utils");
const Contact = require("../models/contact");

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const contactsList = await Contact.find(
        { owner },
        "-createdAt -updatedAt"
    ).populate("owner", "name email");
    res.json(contactsList);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.json(contact);
};

const addContact = async (req, res) => {
    const { _id: owner } = req.user;
    const contact = await Contact.create({ ...req.body, owner });
    res.status(201).json(contact);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndRemove(contactId);
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
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

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
};
