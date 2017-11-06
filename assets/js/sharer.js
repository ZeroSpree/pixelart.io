// TODO: check amp sharing functionality

$(function(){
    $('body').on('click', '.js-sharer', function(e){
        e.preventDefault();

        var $t           = $(this),
            service      = $t.attr('data-service').toLowerCase(),
            $ct          = $t.parents('.posts').first(),
            title        = $ct.find('.js--title').text(),
            media_url    = $ct.attr('data-url'),
            thumb        = $ct.attr('data-splash'),
            $dataCt      = $('#stream'),
            absurl       = encodeURIComponent($dataCt.attr('data-share-sitename')),
            share_url    = '',
            twitter_via  = $dataCt.attr('data-share-tw-username'),
            tags         = $dataCt.attr('data-share-tags'),
            fbCaption    = $dataCt.attr('data-share-fb-caption'),
            fbDesc       = $dataCt.attr('data-share-fb-description'),
            imgFolder    = $dataCt.attr('data-share-imgfolder'),
            fbAppId      = $dataCt.attr('data-share-fb-appid');

        twitter_via = '&via='+twitter_via;
        twitter_tags = '&hashtags='+tags;
        tumblr_tags = '&tags='+tags;
        media_url_encoded = encodeURIComponent(media_url);

        if(service == 'facebook'){
            share_url = 'https://www.facebook.com/dialog/feed?app_id='+fbAppId+'&display=popup&description='+fbDesc+'&caption='+media_url_encoded+'&link='+media_url_encoded+'&redirect_uri='+media_url_encoded+'&picture='+absurl+imgFolder+thumb;
        }
        else if(service == 'twitter'){
            share_url = 'https://twitter.com/share?url='+media_url_encoded+'&text='+title+twitter_via+twitter_tags;
        }
        else if(service == 'google+'){
            share_url = 'https://plus.google.com/share?url='+media_url_encoded;
        }
        else if(service == 'tumblr'){
            share_url = 'http://tumblr.com/share/link?url='+media_url_encoded+'&content='+thumb+'&posttype=photo'+tumblr_tags+'&show-via='+media_url;
        }
        else if(service == 'pinterest'){
            share_url = 'http://pinterest.com/pin/create/button/?url='+media_url_encoded+'&description='+title+' found at '+absurl+'&media='+thumb;
        }
        else if(service == 'reddit'){
            share_url = 'http://www.reddit.com/submit?url='+media_url_encoded+'&title='+title+' found at '+absurl;
        }

        if(share_url.length){
            window.open(share_url, 'Sharer', 'height=500,width=900,top=150,left=150').focus();

            if( window.ga ) {
                ga('send', {
                    hitType: 'event',
                    eventCategory: 'Article Share',
                    eventAction: 'Share on ' + service,
                    eventLabel: 'Shared ' + media_url
                });
            }

        }
    });
});