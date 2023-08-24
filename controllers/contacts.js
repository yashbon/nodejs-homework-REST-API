const { HttpError, ctrlWrapper } = require("../utils");
const contacts = require("../models/contacts");

const getAllContacts = async (req, res) => {
    const contactsList = await contacts.listContacts();
    res.json(contactsList);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.json(contact);
};

const addContact = async (req, res) => {
    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await contacts.removeContact(contactId);
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const contactUpDate = await contacts.updateContact(contactId, req.body);
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
};
