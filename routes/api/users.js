const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../schemasJoi/user");

const router = express.Router();
const ctrl = require("../../controllers/users");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrentUser);

module.exports = router;
