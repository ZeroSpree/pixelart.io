/*
 * Add all site sections to editor
 */

// Get sections urls
$.get(config.routes.listing+'?path='+config.sectionsDir, function (data) {
    var fileCount = data.length;
    var counter = 0;

    for (var section in data) {
        // Get section data
        $.post(config.routes.readyaml+'?path='+data[section], function (res) {
            counter++;

            res.content.path = res.path.replace(/^.*[\\\/]/, '').replace('.markdown', '');

            // Push section to Vue and sort alphabetically
            _Sections.push(res.content);
            _Sections.sort( utils.sortByProperty('order') );
        });
    }
});
