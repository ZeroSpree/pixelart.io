---
---
$(function(){

    var $win = $(window),
        timer = -1;

    function updateUrl() {
        $.each( $('#stream .posts'), function(){
            var $t             = $(this),
                url            = $t.attr('data-relurl'),
                urlProcessed   = $t.attr('data-url-processed'),
                tOffsetTop     = $t.offset().top,
                tOffsetBottom  = tOffsetTop + $t.height(),
                winTop         = $win.scrollTop(),
                winHeight      = $win.height(),
                winBottom      = winTop + winHeight,
                bottomTreshold = winBottom - winHeight/2,
                topTreshold    = winTop + winHeight/2;

            if( tOffsetTop < bottomTreshold && tOffsetBottom > topTreshold ) {
                history.pushState({}, "", url);

                if( urlProcessed != 'true' ){
                    $t.attr('data-url-processed', true);
                    ga('send', {
                        hitType: 'pageview',
                        page: url
                    });
                }
            }
        });
    }

    $win.scroll(function() {
        if(timer != -1) clearTimeout(timer);
        timer = setTimeout(updateUrl, 150);
    }, false);

});