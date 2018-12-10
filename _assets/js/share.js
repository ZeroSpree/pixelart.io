function triggerShare() {
    event.preventDefault();

    var url = this.getAttribute('href');
    var service = this.getAttribute('data-service');

    window.open(url, 'Sharer', 'height=500,width=900,top=150,left=150').focus();

    if( window.ga ) {
        ga('send', {
            hitType: 'event',
            eventCategory: 'Article Share',
            eventAction: 'Share on ' + service,
            eventLabel: 'Shared ' + url
        });
    }
}

var shareButtons = document.getElementsByClassName('js-sharer');

for (var i = 0; i < shareButtons.length; i++) {
    shareButtons[i].addEventListener('click', triggerShare);
}
