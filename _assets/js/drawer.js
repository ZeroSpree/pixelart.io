$(function() {

    function toggleMenu (e, id) {
        var menuID = $(e.target).attr('aria-controls') || id;

        var $button = $('button[aria-controls="'+menuID+'"]');
        var $overlay = $('.drawer-overlay[aria-controls="'+menuID+'"]');
        var $menu = $('#'+menuID);
        var $body = $('body');
        var $html = $('html');
        var $window = $(window);

        var isOpen  = !$button.is('[aria-expanded="true"]');
        var transitionDuration = parseFloat( $menu.css('transition-duration') ) * 1000;

        var htmlOpenClass = $menu.attr('data-helper-class');
        var drawerOpenClass = 'is--visible';
        var drawerClosedClass = 'is-hidden';
        var drawerButtonActiveClass = 'is-active';

        /*
         * Toggle button aria attributes and active class
         */
        $button
            .toggleClass(drawerButtonActiveClass, isOpen)
            .attr({
                'aria-expanded': isOpen
            });

        /*
         * Toggle overlay, if it exists
         */
        if ( $overlay.length ) {
            $overlay.toggleClass('is-active');
        }

        /*
         * Optional <html> helper class.
         * Use it to customize other UI elements based on menu state.
         */
        if ( htmlOpenClass ) {
            $html.toggleClass(htmlOpenClass, isOpen);
        }

        /* iOS fix for preventing scroll on the underlying container and preserve current document scroll position.
         * 
         * Because overflow:hidden won't disable scrolling behind the opened main menu on iOS,
         * we must hack our way around.
         * Set the body to a fixed position with negative top offset when opening the menu.
         * When closed, revert to previous scroll position.
        */
        if ( !$menu.attr('data-allow-scroll') ) {
            if( !$html.is('.drawer--prevent-scroll') ) {
                var scrollPosition = $window.scrollTop();

                $body.css('top', -scrollPosition + 'px').attr('data-scroll', scrollPosition);
                $html.addClass('drawer--prevent-scroll');
            }
            else {
                var scrollPosition = parseInt( $body.attr('data-scroll') );

                $html.removeClass('drawer--prevent-scroll');
                $('body,html').scrollTop(scrollPosition);
            }
        }

        /*
         * Allow for some animation to happen before setting display:none; on the menu
         * The delay is based on the css transition duration of .drawer
         */
        var delay = isOpen ? 0 : transitionDuration;
        setTimeout( function () {
            $menu.toggleClass(drawerOpenClass);
            $menu.toggleClass(drawerClosedClass);
        }, delay);

        /*
         * This allows the animation to happen correctly.
         * It ensures the drawer CSS transform transition begins after drawerOpenClass has been set.
         */
        setTimeout(function() {
            $menu.attr('aria-hidden', !isOpen);
        }, 25);

        // After closing the menu, refocus the trigger button
        if (!isOpen) {
            $button.focus();
        }

        if( window.ga ) {
            ga('send', {
                hitType: 'event',
                eventCategory: 'Hamburger',
                eventAction: isOpen ? 'Open Hamburger' : 'Close Hamburger',
                eventLabel: 'Clicked Hamburger on ' + window.location.href
            });
        }
    }

    $('.js--drawer-toggle').on('click', toggleMenu);

    /*
     * Close the menu by pressing the Escape key
     */
    $(document).on('keyup', function(e) {
         // escape key maps to keycode 27
         if (e.key === "Escape" && $('.drawer.is--visible').length) {
            toggleMenu(false, $('.drawer.is--visible').attr('id') );
        }
    });
});
