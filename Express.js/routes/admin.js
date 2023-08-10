const express = require('express');

// Controllers
const products = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", products.getAddProducts);

// /admin/add-product => POST
router.post("/add-product", products.postAddProducts);

module.exports = router;