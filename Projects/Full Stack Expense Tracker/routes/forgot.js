const express = require("express");

const forgotLink = require("../controllers/forgot");

const router = express.Router();

// For showing the form to submit new password
router.get("/forgotpassword/:uuid", forgotLink.passwordForm);

// To send reset link to the existing user through / via mail
router.post("/forgotpassword", forgotLink.resetPassword);

// Update the password given by user in the form
router.post("/update-password", forgotLink.updatePassword);

module.exports = router;
