const Joi = require("joi");
const { HttpError, ctrlWrapper } = require("../utils");
const contacts = require("../models/contacts");
const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

const getAllContacts = async (req, res, next) => {
    const contactsList = await contacts.listContacts();
    res.json(contactsList);
};

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
        throw HttpError(404, "Not found");
    }
    res.json(contact);
};

const addContact = async (req, res, next) => {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);
};

const removeContact = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contacts.removeContact(contactId);
    if (!contact) {
        throw HttpError(400, "Not found");
    }
    res.json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const contactUpDate = await contacts.updateContact(contactId, req.body);
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
