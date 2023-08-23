const express = require("express");
const router = express.Router();

const Joi = require("joi");

const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} = require("../../models/contacts");

const { HttpError } = require("../../utils");
const ctrl = require("../../controllers/contacts");

const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", ctrl.updateContact);

module.exports = router;
