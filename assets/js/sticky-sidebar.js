$(function(){

    var $win = $(window),
        $sidebar = $('.sidebar'),
        iTopSpacing = $('main').offset().top;

    var sidebarFixed = function (top, bottom) {
        $sidebar
            .addClass('sidebar--fixed')
            .css({
                'top'    : top,
                'bottom' : bottom
            });
    };

    $win
        .scroll(function () {
            //if( !$('.sidebar:visible').length ) return false;

            var iOffsetTop  = $(this).scrollTop(),
                iWindowHeight = $win.height(),
                iSidebarFullHeight = $sidebar.height() + iTopSpacing;

            /*when sidebar is smaller than window*/
            if ( iSidebarFullHeight < iWindowHeight && 
                iTopSpacing - iOffsetTop <= iTopSpacing) {
                sidebarFixed(iTopSpacing, 'auto');
            }
            /*when sidebar is taller than window*/
            else if ( iSidebarFullHeight - iWindowHeight < iOffsetTop ) {
                sidebarFixed('auto', 0);
            }
            /* reset fixed position */
            else {
                $sidebar
                    .removeClass('sidebar--fixed')
                    .removeAttr('style');
            }
        })
        .resize(function () {
            $(this).trigger('scroll');
        });

});