const express = require('express');
const path = require('path');

const pathDir = require('../util/path');

const router = express.Router();

// /shop => GET
router.get("/", (req, res, next) => {
    res.sendFile(path.join(pathDir, 'views', 'shop.html'));
})


module.exports = router;