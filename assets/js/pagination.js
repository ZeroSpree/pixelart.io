---
---
$(function(){

    var $win                  = $(window),
        $streamContainer      = $('#stream'),
        paginationPath        = $streamContainer.attr('data-pagination-path'),
        iTreshold             = $('.posts-placeholder').height(),
        processRequest        = true,
        requestPage,
        paginationRequest,
        scrollTreshold;

    function checkDuplicates () {
        var postsArray = [];

        $.each( $streamContainer.find('.posts'), function () {
            var $t = $(this),
                url = $t.attr('data-url');

            postsArray.indexOf(url) > -1 ? $t.remove() : postsArray.push(url);
        });
    }

    $win.scroll(function() {
        scrollTreshold = $(document).height() - $win.height() - iTreshold;

        if ( scrollTreshold < $win.scrollTop() && processRequest === true ) {
            // interrupt pagination requests until current one is fulfilled
            processRequest    = false;
            requestPage       = parseInt( $streamContainer.attr('data-pagination-current-page') ) + 1;
            paginationRequest = '/pagination'+ paginationPath +'page/'+ requestPage +'/index.html';

            $.ajax({
                url: paginationRequest,
                dataType: 'html',
                success: function(data) {

                    $streamContainer
                        .append(data)
                        .attr('data-pagination-current-page', requestPage);

                    processRequest = true;
                    checkDuplicates();

                    ga('send', {
                        hitType: 'event',
                        eventCategory: 'Load More',
                        eventAction: 'Load More',
                        eventLabel: 'Load more page '+requestPage
                    });

                },
                error : function () {

                    $('.posts-placeholder').remove();

                    ga('send', {
                        hitType: 'event',
                        eventCategory: 'Load More',
                        eventAction: 'Load More End',
                        eventLabel: 'Load more end page '+requestPage
                    });

                }
            });
        }
    });

});