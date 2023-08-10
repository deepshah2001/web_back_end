const path = require('path');

const pathDir = require('../util/path');             // Helper function for retrieving the main directory

exports.pageNotFound = (req, res, next) => {
    res.status(404).sendFile(path.join(pathDir, 'views', '404.html'));
}