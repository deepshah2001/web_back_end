const express = require("express");

const forgotLink = require("../controllers/forgot");

const router = express.Router();

router.post("/forgotpassword", forgotLink.resetPassword);

module.exports = router;
