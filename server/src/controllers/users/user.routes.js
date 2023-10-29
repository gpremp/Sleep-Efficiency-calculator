const router = require("express").Router();
const { createUser, authUser } = require("./user.contoller");

router.post("/auth", authUser);

router.post("/", createUser);

module.exports = router;
