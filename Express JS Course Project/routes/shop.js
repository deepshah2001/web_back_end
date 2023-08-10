const path = require('path');
const express = require('express');

// Controllers
const product = require('../controllers/product');

const router = express.Router();

router.get('/', product.getProducts);

module.exports = router;
