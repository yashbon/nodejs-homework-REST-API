const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../schemasJoi/user");

const router = express.Router();
const ctrl = require("../../controllers/users");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.getCurrentUser);
router.patch("/", authenticate, ctrl.updateSubscriptionUser);
router.patch(
    "/avatars",
    authenticate,
    upload.single("avatar"),
    ctrl.uploadAvatar
);

module.exports = router;
