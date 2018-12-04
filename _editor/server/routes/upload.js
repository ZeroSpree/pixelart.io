const hh         = require('http-https');
const fs         = require('fs-extra');
const config     = require('../../config');
const utils      = require('../utils');

/*
 * Upload a file from web
 *
 * Places it on local server, under config.uploadsDir/YYYY-MM-DD/fileName.extension
 * Default location: uploads/YYYY-MM-DD/slug.ext
 */

module.exports = function(app) {

    app.post(config.routes.upload, function(req, res) {
        var url      = req.body['url'];
        var slug     = utils.getSlug(url);
        var fullPath = utils.getFullPath(slug);

        fs.ensureDir(utils.getFullDir(), err => {
            if (err)
                return console.error(err);

            var file = fs.createWriteStream(fullPath);

            hh.get(url, function(response) {
                var stream = response.pipe(file);

                stream.on('finish', function() {
                    res.send({
                        path : '/'+fullPath,
                    });
                });
            });
        });
    });

}