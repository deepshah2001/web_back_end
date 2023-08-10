const express = require('express');

// Controllers
const products = require('../controllers/products');

const router = express.Router();

// /shop => GET
router.get("/", products.getProducts);


module.exports = router;