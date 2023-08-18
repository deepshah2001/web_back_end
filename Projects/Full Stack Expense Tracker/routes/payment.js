const express = require('express');

const authenticate = require('../middlewares/auth');
const paymentPremium = require('../controllers/payment');

const router = express.Router();

router.get("/buy-premium", authenticate.getVerified, paymentPremium.purchasePremium);

router.post("/purchase/update-transaction-status", authenticate.getVerified, paymentPremium.updateStatus);

module.exports = router;