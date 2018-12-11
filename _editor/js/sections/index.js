var listing = [];

new Vue({
    el : '#app',
    data : {
        'sections' : listing
    }
});

$.get(config.routes.listing + '?path=' + config.sectionsDir + '&ext=markdown', function(data) {

    $.post(config.routes.readyaml + '?path=' + data, function(res) {
        for (var i in res) {
            var content = res[i].content;
            var path = res[i].path;

            content['path'] = path;

            listing.push(content);
            listing.sort(utils.sortByProperty('order', 'asc'));
        }

        makeSortable();
    });

});

$('.sidebar__nav a[href="/sections"]').addClass('is--active');

function makeSortable() {
    $('body').find('.listing').sortable({
        containment : 'parent',
        items : '> .listing__row',
        axis : 'y',
        handle : '.js--sort-handle',
        update : function(e, ui) {
            for (var i in listing) {
                var thisSection = listing[i],
                    path = thisSection.path,
                    $row = $('.listing__row[data-path="' + path + '"]');

                thisSection.order = $row.index('.listing__row') + 1;

                var data = {
                    path : path,
                    frontmatter : utils.yamlSanitize(thisSection),
                    content : $.trim(thisSection.__content),
                }

                $.post(config.routes.saveArticle, data, function(res) {
                    UI.notify('Sections order updated!');
                });
            }
        }
    });
}

