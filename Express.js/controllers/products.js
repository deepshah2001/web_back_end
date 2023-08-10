const path = require('path');

const pathDir = require('../util/path');

// admin.js
exports.getAddProducts = (req, res, next) => {
    res.sendFile(path.join(pathDir, 'views', 'add-product.html'));
}

exports.postAddProducts = (req, res, next) => {
    console.log(req.body);
    res.redirect("/shop");
}

// shop.js
exports.getProducts = (req, res, next) => {
    res.sendFile(path.join(pathDir, 'views', 'shop.html'));
}