const fs = require('fs-extra');
const yaml = require('yaml-front-matter');
const config = require('../../config');

module.exports = function(app) {

    // Read a YAML file and return as JSON object
    app.post(config.routes.readyaml, function(req, res) {
        var path = req.query['path'].split(',');
        var data = [];

        var promises = path.map(function(_path) {
            return new Promise( function(_path, resolve, reject) {
                fs.readFile(_path, 'utf8', function(err, data) {
                    if (err) {
                        console.log(err);
                        resolve("");
                        //following the same code flow
                    } else {
                        resolve({
                            content : yaml.loadFront(data),
                            path : _path
                        });
                    }
                });
            }.bind(this, _path));
        });

        Promise.all(promises).then(function(results) {
            results.forEach(function(content) {
                data.push(content);
            });

            res.send(data);
        });
    });
} 