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
            _Sections.sort(utils.sortByProperty('title'));
        }

        // Edit Mode only
        // Get article sections and set the active ones
        if (_Slug.length) {
            $.post(config.routes.readyaml + '?path=' + decodeURI(_Slug), function(res) {
                var articleCategories = res[0].content.categories;

                if (!articleCategories)
                    return false;

                for (var category in _Sections) {
                    var thisCat = _Sections[category],
                        thisSection = thisCat.path;

                    if (articleCategories.indexOf(thisSection) > -1) {
                        Vue.set(vm.sections[category], 'active', true);
                    }
                }
            });
        }

    });
});

// Watch sections and add the right ones to article 'categories'
vm.$watch('sections', function(newVal, oldVal) {
    this.editor.categories = [];

    for (category in this.sections) {
        var thisCat = this.sections[category];
        if (thisCat.active)
            this.editor.categories.push(thisCat.path);
    }
}, {
    deep : true
}); 