const express = require('express');
const path = require('path');

const pathDir = require('../util/path');

const router = express.Router();

router.get("/contactus", (req, res, next) => {
    res.sendFile(path.join(pathDir, 'views', 'contactus.html'));
})

router.post("/success", (req, res, next) => {
    console.log(req.body);
    res.sendFile(path.join(pathDir, 'views', 'success.html'));
})

module.exports = router;