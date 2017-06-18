---
---
// TODO: check amp sharing functionality
// TODO: move descriptions/text to global config

$(function(){
    $('body').on('click', '.js-sharer', function(e){
        e.preventDefault();

        var $t          = $(this),
            service     = $t.attr('data-service').toLowerCase(),
            $ct         = $t.parents('.posts').first(),
            title       = $ct.find('.js--title').text(),
            media_url   = $ct.attr('data-url'),
            thumb       = $ct.attr('data-splash'),
            description = 'Find more pixelart design and inspiration at pixelart.io',
            caption     = 'PIXELART.IO',
            share_url   = '';

        media_url_encoded = encodeURIComponent(media_url);

        if(service == 'facebook'){
            share_url = 'https://www.facebook.com/dialog/feed?app_id=1344412318946948&display=popup&description='+description+'&caption='+caption+'&link='+media_url_encoded+'&redirect_uri='+media_url_encoded+'&picture='+thumb;
        }
        else if(service == 'twitter'){
            share_url = 'https://twitter.com/share?url='+media_url_encoded+'&text='+title+'&via=pixelartIO&hashtags=pixelart,inspiration';
        }
        else if(service == 'google+'){
            share_url = 'https://plus.google.com/share?url='+media_url_encoded;
        }
        else if(service == 'tumblr'){
            share_url = 'http://tumblr.com/share/link?url='+media_url_encoded+'&content='+thumb+'&posttype=photo&tags=pixelart,inspiration&show-via='+media_url;
        }
        else if(service == 'pinterest'){
            share_url = 'http://pinterest.com/pin/create/button/?url='+media_url_encoded+'&description='+title+' found on pixelart.io&media='+thumb;
        }
        else if(service == 'reddit'){
            share_url = 'http://www.reddit.com/submit?url='+media_url_encoded+'&title='+title+' found on http://pixelart.io';
        }

        if(share_url.length){
            window.open(share_url, 'Sharer', 'height=500,width=900,top=150,left=150').focus();

            ga('send', {
                hitType: 'event',
                eventCategory: 'Article Share',
                eventAction: 'Share on ' + service,
                eventLabel: 'Shared ' + media_url
            });

        }
    });
});