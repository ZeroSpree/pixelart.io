$(function(){
    $('.js--readmore').on('click', function () {
        $(this).parents('.posts').first().toggleClass('is--expanded');
    });
});