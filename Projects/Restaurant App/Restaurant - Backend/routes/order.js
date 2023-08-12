const express = require("express");

const orders = require("../controllers/order");

const router = express.Router();

// For getting all the orders present in the table or database
router.get("/", orders.getOrder);

// For adding a new order to the table or database
router.post("/add-order", orders.addOrder);

// For deleting an existing order using its order id.
router.post("/delete-order/:deleteId", orders.deleteOrder);

module.exports = router;
