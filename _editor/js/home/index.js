var vm = new Vue({
    el : '#app',
    data : {
        'posts' : [],
        'poststoload' : []
    },
    methods : {
        loadmore : function(event) {
            var limit = 50;
            var batch = vm.poststoload.splice(0, limit);

            $.post(config.routes.readyaml + '?path=' + batch, function(res) {

                for (var article in res) {
                    var content = res[article].content;

                    content['path'] = res[article].path;

                    vm.posts.push(content);
                    vm.posts.sort(utils.sortByProperty('date', 'desc'));
                }

            });
        }
    }
});

$.get(config.routes.listing + '?path=' + config.postsDir + '&ext=markdown', function(data) {
    vm.poststoload = data;
    vm.loadmore();
});

$('.sidebar__nav a[href="/"]').addClass('is--active');

