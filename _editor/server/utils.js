const fs     = require('fs-extra');
const path   = require('path');
const config = require('../config');

module.exports = {

    /*
     * @returns: array | ['fullpath/file.ext']
     * Used to return a list of files from a directory
     */
    getFiles : function (dir, files_) {
        files_ = files_ || [];
        var files = fs.readdirSync(dir);

        // sort by creation time
        files.sort(function(a, b) {
           return fs.statSync(dir + b).birthtime.getTime() - 
                  fs.statSync(dir + a).birthtime.getTime();
        });

        for (var i in files) {
            var name = dir + files[i];

            if (fs.statSync(name).isDirectory()) {
                this.getFiles(name, files_);
            } else {
                files_.push(name);
            }
        }

        return files_; 
    },


    /*
     * @returns: string | YYYY-MM-DD
     * Format today date
     */
    today: function () {
        var d    = new Date(),
            dd   = d.getDate(),
            mm   = d.getMonth()+1,
            yyyy = d.getFullYear();

        if (dd < 10)  { dd = '0'+dd; }
        if (mm < 10)  { mm = '0'+mm; }

        return yyyy+'-'+mm+'-'+dd;
    },


    /*
     * @returns: string | YYYY-MM-DD/
     * This is used as the default post assets directory name
     */
    todayDir : function () {
        return this.today() + '/';
    },


    /*
     * @returns: uploads/YYYY-MM-DD/
     * This is used as the default post assets directory name
     */
    getFullDir : function () {
        return config.uploadsDir + this.todayDir();
    },


    /*
     * @getFullPath : uploads/YYYY-MM-DD/slug.ext
     * Returns the full path where the image will be saved
     */
    getFullPath : function (slug) {
        return this.getFullDir() + slug;
    },


    /*
     * @getSlug : pixelart_1540225225620.jpg
     * Composes a filename
     */
    getSlug : function(url) {
        var now = new Date();
        var fileName = 'pixelart_' + now.getTime();

        return fileName + path.extname(url);
    }

};
