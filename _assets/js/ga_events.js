$(function () {
    $('body').on('click', '[data-ga]', function () {
        var $t = $(this),
            data = $t.attr('data-ga').split(','),
            category = $.trim( data[0] ),
            action = $.trim( data[1] ),
            label = $.trim( data[2] );

        if( window.ga ) {
            ga('send', {
                hitType: 'event',
                eventCategory: category,
                eventAction: action,
                eventLabel: label + ' '+ window.location.href
            });
        }
    });

});
