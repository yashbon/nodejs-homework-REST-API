const express = require("express");

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../schemas/contact");

const router = express.Router();
const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addContactSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
    "/:contactId",
    isValidId,
    validateBody(schemas.addContactSchema),
    ctrl.updateContact
);

router.patch(
    "/:contactId/favorite",
    isValidId,
    validateBody(schemas.updateFavoriteSchema),
    ctrl.updateFavorite
);

module.exports = router;
