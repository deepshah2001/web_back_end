const express = require('express');
const router = express.Router();

// /shop => GET
router.get("/", (req, res, next) => {
    res.send("<h1>Hello from Express JS</h1>");
})


module.exports = router;