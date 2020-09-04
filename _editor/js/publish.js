function publish () {
    var data = {
        //cmd: 'gulp git:publish'
        cmd: 'git grep attracting-talent.jpg'
    }

    $.post(config.routes.exec, data, function (res) {
        UI.notify('Site published succesfully!');
    });
}

$(function () {
    $('body').on('click', '#publish', publish);
});
