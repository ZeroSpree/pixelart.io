var listing = [];

new Vue({
    el    : '#app',
    data  : {
        'sections' : listing
    }
});

var counter = 0;

$.get(config.routes.listing+'?path='+config.sectionsDir, function (data) {

    for(var i in data) {
        var path = data[i];

        $.post(config.routes.readyaml+'?path='+path, function (res) {
            var content = res.content;
            var path = res.path;

            content['path'] = path;

            listing.push(content);
            listing.sort( utils.sortByProperty('order', 'asc') );

            counter++;

            if ( counter == data.length ) {
                makeSortable();
            }
        });
    }

});

$('.sidebar__nav a[href="/sections"]').addClass('is--active');

function makeSortable() {
    $('body').find('.listing').sortable({
        containment: 'parent',
        items: '> .listing__row',
        axis: 'y',
        handle: '.js--sort-handle',
        update: function (e, ui) {
            for (var i in listing) {
                var thisSection = listing[i],
                    path = thisSection.path,
                    $row = $('.listing__row[data-path="'+ path +'"]');

                thisSection.order = $row.index('.listing__row')+1;

                var data = {
                    path        : path,
                    frontmatter : utils.yamlSanitize(thisSection),
                    content     : $.trim( thisSection.__content ),
                }

                $.post(config.routes.saveArticle, data, function (res) {
                    UI.notify('Sections order updated!');
                });
            }
        }
    });
}

