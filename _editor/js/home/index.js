var limit = 50;

var vm = new Vue({
    el : '#app',
    data : {
        'posts' : [],
        'poststoload' : []
    },
    methods : {
        loadmore : function(event) {
            loadArticles();
        }
    }
});

function loadArticles() {
    var paginatedPosts = vm.poststoload.splice(0, limit);

    $.post(config.routes.readyaml + '?path=' + paginatedPosts, function(res) {

        for (var article in res) {
            var thisArticle = res[article];
            var content = thisArticle.content;
            content['path'] = thisArticle.path;

            vm.posts.push(content);
            vm.posts.sort(utils.sortByProperty('date', 'desc'));
        }

    });
}

// Get an array of all markdown posts in the _posts directory
$.get(config.routes.listing + '?path=' + config.postsDir + '&ext=markdown', function(data) {
    vm.poststoload = data;

    // load first articles batch
    loadArticles();
});

$('.sidebar__nav a[href="/"]').addClass('is--active');

