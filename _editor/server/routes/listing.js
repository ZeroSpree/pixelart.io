const utils  = require('../utils');
const config = require('../../config');

module.exports = function(app) {

    // Returns an array of _posts files
    app.get(config.routes.listing, function(req, res) {
        var path = req.query['path'];
        res.send(utils.getFiles(path));
    });

}