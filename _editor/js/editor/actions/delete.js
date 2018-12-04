function filesToDelete () {
    var urls = [_Extra.slug];

    /*
     * Grab all image urls from the post
     * so we can remove these too
     */
    var $files = $('#editor [src^="/'+ config.uploadsDir +'"]');

    $.each($files, function() {
        urls.push( $(this).attr('src').substr(1) );
    });

    return urls;
}

function deleteArticle () {
    var aPaths = filesToDelete();

    var data = {
        cmd: 'rm ' + aPaths.join(' ')
    };

    $.post(config.routes.exec, data, function (res) {
        UI.notify('Article removed succesfully! Redirecting in 2, 1...');

        setTimeout(function () {
            window.location = ('/');
        }, 1500);
    });
}

function confirmDelete () {
    if ( confirm('Remove article?') ) {
        deleteArticle();
    }
}

$(function () {
    $('body').on('click', '#delete-article', confirmDelete);
});