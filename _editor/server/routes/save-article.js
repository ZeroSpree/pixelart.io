const fs     = require('fs-extra');
const YAML   = require('yamljs');
const config = require('../../config');

module.exports = function(app) {

    // Write article with Frontmatter and body data
    app.post(config.routes.saveArticle, function(req, res) {
        var dir         = req.body['dir'];
        var slug        = req.body['slug'];
        var content     = req.body['content'];
        var frontmatter = req.body['frontmatter'];
        var path        = req.body['path'] || dir + slug;
        var yamlData    = YAML.stringify(JSON.parse(frontmatter), 4, 2);
        var data        = '---\n'+yamlData+'\n---\n'+content;

        fs.writeFile(path, data, function(err) {
            if(err) return console.log(err);

            res.send({
                'path': path
            });
        });
    });

}