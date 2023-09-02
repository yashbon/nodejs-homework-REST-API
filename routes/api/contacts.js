const express = require("express");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../schemasJoi/contact");

const router = express.Router();
const ctrl = require("../../controllers/contacts");

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
    "/",
    authenticate,
    validateBody(schemas.addContactSchema),
    ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
    "/:contactId",
    authenticate,
    isValidId,
    validateBody(schemas.addContactSchema),
    ctrl.updateContact
);

router.patch(
    "/:contactId/favorite",
    authenticate,
    isValidId,
    validateBody(schemas.updateFavoriteSchema),
    ctrl.updateFavorite
);

module.exports = router;
