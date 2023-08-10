const path = require('path');
const express = require('express');

// Controller
const product = require('../controllers/product');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', product.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', product.postAddProduct);

module.exports = router;