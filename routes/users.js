const express = require("express");
const router = express.Router();

const { signUp, authenticate } = require("./../controllers/users");

router.post("/signup", signUp);
router.post("/auth", authenticate);

module.exports = router;
