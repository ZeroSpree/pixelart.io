/*
* Add all site sections to editor
*/

// Get sections urls
$.get(config.routes.listing + '?path=' + config.sectionsDir + '&ext=markdown', function(data) {
    $.post(config.routes.readyaml + '?path=' + data, function(res) {

        for (var section in res) {
            var thisSection = res[section];
            thisSection.content.path = thisSection.path.replace(/^.*[\\\/]/, '').replace('.markdown', '');

            // Push section to Vue and sort alphabetically
            _Sections.push(thisSection.content);
            _Sections.sort(utils.sortByProperty('order'));
        }

    });
});
