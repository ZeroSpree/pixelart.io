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
            absurl       = encodeURIComponent(" http://bestcms2017.com "),
            share_url    = '',
            twitter_via  = '',
            twitter_tags = '',
            tumblr_tags  = '';

        
        twitter_via = '&via=bestCMS2017';
        
        
        twitter_tags = '&hashtags=bestcms, bestblogs, bestcms2017';
        tumblr_tags = '&tags=bestcms, bestblogs, bestcms2017';
        

        media_url_encoded = encodeURIComponent(media_url);

        if(service == 'facebook'){
            share_url = 'https://www.facebook.com/dialog/feed?app_id=1902799049933562&display=popup&description=Find more about the best CMS and blogging platforms at bestcms2017.com&caption=BESTCMS2017.COM&link='+media_url_encoded+'&redirect_uri='+media_url_encoded+'&picture='+thumb;
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
            share_url = 'http://pinterest.com/pin/create/button/?url='+media_url_encoded+'&description='+title+' found at http://bestcms2017.com&media='+thumb;
        }
        else if(service == 'reddit'){
            share_url = 'http://www.reddit.com/submit?url='+media_url_encoded+'&title='+title+' found at http://bestcms2017.com';
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