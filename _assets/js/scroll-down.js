function smoothScroll(to, duration) {
    if (duration < 0) {
        return;
    }

    var wScrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
    var difference = to - wScrollTop;
    var perTick = difference / duration * 10;

    this.scrollToTimerCache = setTimeout(function() {
        if (!isNaN(parseInt(perTick, 10))) {
            window.scrollTo(0, wScrollTop + perTick);
            smoothScroll(to, duration - 10);
        }
    }.bind(this), 10);
}

function triggerScroll() {
    event.preventDefault();

    var targetID = this.getAttribute('href').substr(1);
    var target = document.getElementById(targetID);

    smoothScroll(target.offsetTop, 200);
}

var scrollButtons = document.getElementsByClassName('scroll-down');

for (var i = 0; i < scrollButtons.length; i++) {
    scrollButtons[i].addEventListener('click', triggerScroll);
}
