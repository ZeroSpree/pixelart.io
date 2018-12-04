function save () {
    // Prevent save if there's no title
    if( !_Data.title ) {
        UI.notify('Please add a Headline', 'error');
        return false;
    }

    // If saving an article for the first time
    // And a folder is selected as permalink,
    // We need to add the full slug in frontmatter permalink data
    if (!window.location.hash.substr(1).length && _Data.permalink) {
        _Data.permalink = _Data.permalink + '/' + _Extra.permalink + '/'
    }

    var data = {
        dir         : utils.isArticleEditor() ? config.postsDir : config.sectionsDir,
        slug        : utils.slug(), // utils.js
        frontmatter : utils.yamlSanitize(_Data), // utils.js
        content     : utils.htmlSanitize($('.ql-editor').html()),
    }

    $.post(config.routes.saveArticle, data, function (res) {
        window.location.hash = res.path;
        _Extra.slug = res.path;
        UI.notify('Page saved succesfully!');
    });
}

$(function () {
    $('#save').on('click', save);
});