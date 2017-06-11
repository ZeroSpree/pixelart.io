$(function(){

    var $win = $(window);

    // http://stackoverflow.com/questions/3701311/event-when-user-stops-scrolling
    $.fn.scrollEnd = function(callback, timeout) {
        $(this).scroll(function(){
            var $this = $(this);
            if ($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,timeout));
        });
    };

    $win.scrollEnd( function() {

        $.each( $('#stream .posts'), function(){
            var $t             = $(this),
                url            = $t.attr('data-relurl'),
                urlProcessed   = $t.attr('data-url-processed'),
                tOffsetTop     = $t.offset().top,
                tOffsetBottom  = tOffsetTop + $t.outerHeight(),
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

    }, 100);
});