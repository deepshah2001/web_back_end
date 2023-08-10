const path = require('path');

const pathDir = require('../util/path');

exports.getFormContact = (req, res, next) => {
    res.sendFile(path.join(pathDir, 'views', 'contactus.html'));
}