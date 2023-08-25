const express = require("express");

const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();
const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addContactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put(
    "/:contactId",
    validateBody(schemas.addContactSchema),
    ctrl.updateContact
);

module.exports = router;
