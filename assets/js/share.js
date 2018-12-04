$(function () {
    $('body').on('click', '.js-sharer', function(e) {
        e.preventDefault();

        var $t = $(this),
            url = $t.attr('href'),
            service = $t.attr('data-service');

        window.open(url, 'Sharer', 'height=500,width=900,top=150,left=150').focus();

        if( window.ga ) {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Article Share',
                eventAction: 'Share on ' + service,
                eventLabel: 'Shared ' + url
            });
        }
    });
});
