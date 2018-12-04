const exec   = require('child_process').exec;
const config = require('../../config');

module.exports = function(app) {

    // Returns an array of _posts files
    app.post(config.routes.exec, function(req, res) {
        var cmd = req.body['cmd'];

        if( cmd ) {
            exec(cmd);
        }

        res.send('Success!');
    });

}