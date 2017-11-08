$(function(){
    $('body').on('click', '.js--readmore', function () {
        $(this).parents('.posts').first().toggleClass('is--expanded');
    });
});