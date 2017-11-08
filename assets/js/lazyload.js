$(function(){

    function lazyLoadImage ($elm) {
        $elm.attr('src', '/assets/img/'+$elm.attr('data-src')).removeAttr('data-src');
    }

    /*At pageload*/
    $.each($('img[data-src]'), function(){
        var $t = $(this);

        if (!$t.parents('.posts__readmore').length) {
            lazyLoadImage($t);
        }
    });

    /*On load more*/
    $(window).on('loadMoreCallback', function(){
        $.each($('img[data-src]'), function(){
            var $t = $(this);

            if (!$t.parents('.posts__readmore').length) {
                lazyLoadImage($t);
            }
        });
    });

    /*After Article Expand*/
    $('body').on('click', '.js--readmore', function(){
        var $t = $(this),
            $imgs = $t.parents('.posts').find('.posts__readmore img[data-src]');

        $.each($imgs, function(){
            lazyLoadImage($(this));
        });
    });

});
