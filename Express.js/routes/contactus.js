const express = require('express');

// Controllers
const contactus = require('../controllers/contactus');
const success = require('../controllers/success');

const router = express.Router();

router.get("/contactus", contactus.getFormContact);

router.post("/success", success.postSuccessPage);

module.exports = router;