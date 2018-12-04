const fileUpload = require('express-fileupload');
const fs         = require('fs-extra');
const config     = require('../../config');
const utils      = require('../utils');

/*
 * Upload a local file
 *
 * Places it on local server, under config.uploadsDir/YYYY-MM-DD/fileName.extension
 * Default location: uploads/YYYY-MM-DD/slug.ext
 */

module.exports = function(app) {

    app.use(fileUpload());

    app.post(config.routes.uploadLocal, function(req, res) {
        var files    = req.files;
        var image    = files.upload; // The name of the input field (i.e. "upload")
        var slug     = utils.getSlug(image.name);
        var fullPath = utils.getFullPath(slug);

        fs.ensureDir(utils.getFullDir(), err => {
            if (err)
                return console.error(err);

            image.mv(fullPath, function(err) {
                if (err)
                    return res.status(500).send(err);

                res.send({
                    path : '/' + fullPath,
                });
            });
        });
    });

}