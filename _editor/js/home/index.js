var limit = 15;

var vm = new Vue({
    el    : '#app',
    data  : {
        'posts' : [],
        'poststoload' : []
    },
    methods : {
        loadmore : function (event) {
            loadArticles();
        }
    }
});

function loadArticles () {
    for (var article in vm.poststoload) {
        var path = vm.poststoload[article];

        if (article < limit) {
            $.post(config.routes.readyaml+'?path='+path, function (res) {
                var path = res.path;
                var content = res.content;

                content['path'] = path;

                vm.posts.push(content);
                vm.posts.sort( utils.sortByProperty('date', 'desc') );

                var index = vm.poststoload.indexOf(path);
                if (index !== -1) vm.poststoload.splice(index, 1);
            });
        }
    }
}

$.get(config.routes.listing+'?path='+config.postsDir, function (data) {
    vm.poststoload = data;
    loadArticles();
});

$('.sidebar__nav a[href="/"]').addClass('is--active');
