const fs     = require('fs-extra');
const yaml   = require('yaml-front-matter');
const config = require('../../config');

module.exports = function(app) {

    // Read a YAML file and return as JSON object
    app.post(config.routes.readyaml, function(req, res) {
        var path = req.query['path'];

        fs.readFile(path, 'utf8', function(err, contents) {
            res.send({
                content: yaml.loadFront(contents),
                path: path
            });
        });
    });

}