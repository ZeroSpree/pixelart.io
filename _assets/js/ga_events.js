function sendGAevent() {
    var data = this.getAttribute('data-ga').split(','),
        category = data[0].trim(),
        action = data[1].trim(),
        label = data[2].trim();

    if( window.ga ) {
        ga('send', {
            hitType: 'event',
            eventCategory: category,
            eventAction: action,
            eventLabel: label + ' '+ window.location.href
        });
    }
}

var gaButtons = document.querySelectorAll('[data-ga]');

for (var i = 0; i < gaButtons.length; i++) {
    gaButtons[i].addEventListener('click', sendGAevent);
}
