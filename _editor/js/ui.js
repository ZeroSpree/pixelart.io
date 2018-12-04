UI = {};

/*
 * Show a sticky notice when an action takes place.
 * @msg: string | Message to displayed
 * @type: string | success, error
 */
UI.notify = function (msg, type) {
    var message = msg || 'Success!';
    var type = type || 'success';

    // click click click... make sure we only have ONE notice at a time
    $('.notice').remove();

    var $notice = $('<div class="notice notice--'+ type +'">'+ msg +'</div>')
        .appendTo('body')
        .fadeIn(500);

    setTimeout(function () {
        $notice.fadeOut(500, function () {
            $notice.remove();
        });
    }, 2000);
}