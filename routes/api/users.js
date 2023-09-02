const express = require("express");

const { validateBody } = require("../../middlewares");
const { schemas } = require("../../schemasJoi/user");

const router = express.Router();
const ctrl = require("../../controllers/users");

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;
