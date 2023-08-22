const express = require("express");

const authenticate = require("../middlewares/auth");
const paymentPremium = require("../controllers/payment");

const router = express.Router();

// to get the status of a user is premium or not
router.get("/is-premium", authenticate.getVerified, paymentPremium.isPremium);

// to create a new order when the use rtries to make a payment
router.get(
  "/buy-premium",
  authenticate.getVerified,
  paymentPremium.purchasePremium
);

// updates the status as failed or success after the payment is processed.
router.post(
  "/purchase/update-transaction-status",
  authenticate.getVerified,
  paymentPremium.updateStatus
);

module.exports = router;
