const path = require('path');

const pathDir = require('../util/path');
exports.postSuccessPage = (req, res, next) => {
    console.log(req.body);
    res.sendFile(path.join(pathDir, 'views', 'success.html'));
}