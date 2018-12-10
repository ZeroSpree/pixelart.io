function triggerMenu(e, id) {
    console.log(this);
    var menuID = id || this.getAttribute('aria-controls');

    var trigger = document.querySelector('button[aria-controls="'+menuID+'"]');
    var overlay = document.querySelector('.drawer-overlay[aria-controls="'+menuID+'"]');
    var menu = document.getElementById(menuID);
    var html = document.getElementsByTagName('html')[0];

    var isOpen = !eval( trigger.getAttribute('aria-expanded') );
    var menuStyles = getComputedStyle(menu);
    var transitionDuration = parseFloat( menuStyles.transitionDuration ) * 1000;

    var htmlOpenClass = menu.getAttribute('data-helper-class');
    var drawerOpenClass = 'is--visible';
    var drawerClosedClass = 'is-hidden';
    var drawerButtonActiveClass = 'is-active';

    console.log(menuID, transitionDuration);

    /*
     * Toggle button aria attributes and active class
     */
    if( isOpen ) {
        trigger.classList.add(drawerButtonActiveClass);
    } else {
        trigger.classList.remove(drawerButtonActiveClass);
    }

    trigger.setAttribute('aria-expanded', isOpen);

    /*
     * Toggle overlay, if it exists
     */
    if ( overlay ) {
        overlay[0].classList.toggle('is-active');
    }

    /*
     * Optional <html> helper class.
     * Use it to customize other UI elements based on menu state.
     */
    if ( htmlOpenClass ) {
        html.classList.toggle(htmlOpenClass);
    }

    /*
     * Allow for some animation to happen before setting display:none; on the menu
     * The delay is based on the css transition duration of .drawer
     */
    var delay = isOpen ? 0 : transitionDuration;
    setTimeout( function () {
        menu.classList.toggle(drawerOpenClass);
        menu.classList.toggle(drawerClosedClass);
    }, delay);

    /*
     * This allows the animation to happen correctly.
     * It ensures the drawer CSS transform transition begins after drawerOpenClass has been set.
     */
    setTimeout(function() {
        menu.setAttribute('aria-hidden', !isOpen);
    }, 25);

    // After closing the menu, refocus the trigger button
    if (!isOpen) {
        trigger.focus();
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

var drawerButtons = document.getElementsByClassName('js--drawer-toggle');

for (var i = 0; i < drawerButtons.length; i++) {
    drawerButtons[i].addEventListener('click', triggerMenu);
}

document.addEventListener('keyup', function(e) {
    // escape key maps to keycode 27
    if ( e.key === "Escape" && document.querySelector('.drawer[aria-hidden="false"]') ) {
        triggerMenu(false, document.querySelector('.drawer[aria-hidden="false"]').getAttribute('id') );
    }
});

