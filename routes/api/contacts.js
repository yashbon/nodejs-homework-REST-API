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

const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
    // res.send("get all contacts");

    try {
        const contacts = await listContacts();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }

    // res.json({ status: "success", data: contacts });

    // res.json({ message: "get: all contacts" });
});

router.get("/:contactId", async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);
        if (!contact) {
            throw HttpError(404, "Not found");
            // return res.status(404).json({ message: "Not found" });
        }
        res.json(contact);
    } catch (error) {
        // const { status = 500, message = "Server error" } = error;
        // res.status(status).json(message);
        next(error);
    }

    // res.json({ message: "get: contact by id" });
});

router.post("/", async (req, res, next) => {
    // res.json({ message: "post: create contact " });
    try {
        const { error } = addContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const contact = await addContact(req.body);
        res.status(201).json(contact);
    } catch (error) {
        next(error);
    }
});

router.delete("/:contactId", async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await removeContact(contactId);
        if (!contact) {
            throw HttpError(400, "Not found");
        }
        res.json({ message: "contact deleted" });
    } catch (error) {
        next(error);
    }
    // if (!contact) {
    //     // return { message: "Not found" };
    //     return res.status(404).json({ message: "Not found" });
    // }
    // res.json({ message: "contact deleted" });

    // // res.json({ message: "delete: delete contact by id" });
});

router.put("/:contactId", async (req, res, next) => {
    try {
        const { error } = addContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const { contactId } = req.params;
        const contactUpDate = await updateContact(contactId, req.body);
        if (!contactUpDate) {
            throw HttpError(404, "Not found");
        }
        res.json(contactUpDate);
    } catch (error) {
        next(error);
    }

    // const { contactId } = req.params;
    // const contact = await getContactById(contactId);
    // if (!contact) {
    //     return res.status(404).json({ message: "missing fields" });
    // }
    // const contactUpdate = await updateContact(contactId, req.body);
    // res.json(contactUpdate);
    // res.json({ message: "put: update contact by id" });
});

module.exports = router;
