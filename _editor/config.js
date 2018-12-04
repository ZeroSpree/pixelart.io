var config = {};

// Jekyll vars
config.siteDir     = '_site/';
config.postsDir    = '_posts/';
config.layoutsDir  = '_layouts/';
config.sectionsDir = '_sections/';
config.uploadsDir  = 'uploads/';

// Editor vars
config.editorDir    = '_editor/';
config.templatesDir = 'templates/';

// Server vars
config.routes = {
    exec        : '/exec',
    listing     : '/listing',
    readyaml    : '/readyaml',
    saveArticle : '/save-article',
    upload      : '/upload',
    uploadLocal : '/upload-local'
}

if( typeof module !== 'undefined') module.exports = config;
