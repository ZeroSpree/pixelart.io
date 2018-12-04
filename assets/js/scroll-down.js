$(function () {
    function smoothScroll(to, duration) {
        if (duration < 0) {
            return;
        }

        var difference = to - $(window).scrollTop();
        var perTick = difference / duration * 10;

        this.scrollToTimerCache = setTimeout(function() {
            if (!isNaN(parseInt(perTick, 10))) {
                window.scrollTo(0, $(window).scrollTop() + perTick);
                smoothScroll(to, duration - 10);
            }
        }.bind(this), 10);
    }

    $('.scroll-down').on('click', function(e) {
        e.preventDefault();

        var target = $(this).attr('href');
        smoothScroll($(target).offset().top, 200);
    });
});
