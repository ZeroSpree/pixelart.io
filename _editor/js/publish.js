function publish () {
    var data = {
        cmd: 'gulp git:publish'
    }

    $.post(config.routes.exec, data, function (res) {
        UI.notify('Site published succesfully!');
    });
}

$(function () {
    $('body').on('click', '#publish', publish);
});