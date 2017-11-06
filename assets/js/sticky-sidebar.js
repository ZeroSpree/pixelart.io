$(function(){

    var $win = $(window),
        $sidebarContainer = $('.sidebar__container');

    var sidebarFixed = function ($elm, top, bottom) {
        $elm
            .addClass('sidebar__container--fixed')
            .css({
                'top'    : top,
                'bottom' : bottom
            });
    };

    $win
        .scroll(function () {
            //if( !$('.sidebar:visible').length ) return false;

            var iOffsetTop  = $(this).scrollTop(),
                iTopSpacing = $('main').offset().top,
                iWindowHeight = $win.height();

            $.each($sidebarContainer, function(){
                var $t = $(this),
                    iSidebarFullHeight = $t.height() + iTopSpacing;

                //when sidebar is smaller than window
                if ( iSidebarFullHeight < iWindowHeight && 
                    iTopSpacing - iOffsetTop <= iTopSpacing) {
                    sidebarFixed($t, iTopSpacing, 'auto');
                }
                //when sidebar is taller than window
                else if ( iSidebarFullHeight - iWindowHeight < iOffsetTop ) {
                    sidebarFixed($t, 'auto', 0);
                }
                // reset fixed position
                else {
                    $t
                      .removeClass('sidebar__container--fixed')
                      .removeAttr('style');
                }
            });
        })
        .resize(function () {
            $(this).trigger('scroll');
        });

});