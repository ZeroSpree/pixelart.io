/*
 * Removes the splash image
 */

function removeImageSuccess($el, obj, key) {
    // remove from vue data (so it won't be in YAML when saving)
    if (obj && key) {
        _Data[obj][key] = false;
    }
    // remove tags from editor
    else {
        $el.parent('figure').remove();
    }

    // if existing article, make sure to save the change in article.markdown
    // so we don't end up with broken images
    if (_Slug.length) save();

    UI.notify('Image removed successfully!');
}

function removeImageError(res) {
    console.log(res);
    UI.notify('Woops, something went wrong!<br/>' + res.statusText, 'error');
}

$(function () {

    $('.ee').on('click', 'figure img', function () {
        var $t  = $(this);
        var url = $t.attr('src');
        var obj = $t.attr('data-object');
        var key = $t.attr('data-key');

        var data = {
            cmd: 'rm .'+ url
        }

        if ( confirm('Remove image?') ) {
            $.post(config.routes.exec, data).done(function(data) {
                removeImageSuccess($t, obj, key);
            }).fail(function(res) {
                removeImageError(res);
            });
        }
    });

});
