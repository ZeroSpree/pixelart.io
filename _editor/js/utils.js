var utils = {};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


/*
 * Remove special chars from an article slug
 * @returns : 2018-10-20----test!@#$-article => 2018-10-20-test-article
 */
utils.sanitizeSlug = function (value) {
    var value = $.trim(value);

    value = value.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    value = value.replaceAll(/[--]+/g, '-');

    return value;
}

/*
 * Strip away everything unnecessary from window.location.hash
 * @returns : 2018-10-20-test-article.markdown
 */
utils.slug = function() {
    // remove everything before last slash and after last dot (file location and file extension)
    var hash = window.location.hash.replace(/^.*[\\\/]/, '');

    // If new article, make new slug
    if (!hash.length) {
        hash = _Extra.permalink + '.markdown';

        // Jekyll articles must have a YYYY-MM-DD- prefix
        if( utils.isArticleEditor() ) {
            hash = utils.jekyllTime().substr(0, 10) + '-' + hash;
        }
    }

    return hash;
}
/*
 * Sanitize frontmatter data
 * Removes properties we don't need in article frontmatter
 */
utils.yamlSanitize = function(obj) {
    var yamlData = {};
    var yamlIgnore = ['__content', 'path'];

    for (var attrname in obj) {
        if (
            // Don't save ignored properties
            yamlIgnore.indexOf(attrname) == -1
            // Don't save empty properties
            && obj[attrname] != "" 
            ) {
            yamlData[attrname] = obj[attrname];
        }
    };

    return JSON.stringify(yamlData);
}


utils.htmlSanitize = function (content) {
    $('<div id="htmlSanitize">'+ content +'</div>').appendTo('body');

    var $ct = $('#htmlSanitize');

    // remove empty paragraphs
    $ct.find('p > br').remove();
    $ct.find('p:empty').remove();

    // lazy load images
    var $images = $ct.find('img');
    $.each($images, function () {
        var $t = $(this),
            src = $t.attr('src');

        $t.attr('data-src', src);
        $t.removeAttr('src');
    });

    var $content = $.trim( $ct.html() );

    $ct.remove();

    return $content;
}


/*
 * Get current time
 * @returns: "2018-10-20T18:22:12Z"
 */
utils.jekyllTime = function() {
    var now = new Date();
    var utcString = now.toISOString().substring(0, 19);
    var hour = ('0' + now.getHours()).slice(-2); // leading 0 hour

    return utcString.substring(0, 11) + hour + utcString.substring(13, 19);
}

/*
 * Sort array by object property
 * @usage: array.sort( utils.sortByProperty('anchortext', 'desc') )
 * @returns: array
 */
utils.sortByProperty = function (key, order='asc') {
    return function(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = ( typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const varB = ( typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        let comparison = 0;

        if (varA > varB) comparison = 1; 
        else if (varA < varB) comparison = -1;

        return ((order == 'desc') ? (comparison * -1) : comparison);
    };
}

utils.isSectionEditor = function () {
    return $('.js--sections-editor').length;
}

utils.isArticleEditor = function () {
    return $('.js--article-editor').length;
}


/*
 * Sanitize a path, return the filename.
 * _folder/filename.extension => filename
 * @returns: string
 */
utils.sanitizeFilename = function (path) {
    return path
        // remove everything before the slash
        .replace(/^(.*[\\\/])/, '')
        // remove everything after the last dot
        .replace(/\.[^.]*?$/, '');
}
