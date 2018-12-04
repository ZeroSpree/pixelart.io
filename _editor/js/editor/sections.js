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
            _Sections.sort( utils.sortByProperty('title') );

            // Edit Mode only
            if (counter == fileCount && _Slug.length) {

                // Get article sections and set the active ones
                $.post(config.routes.readyaml+'?path='+decodeURI(_Slug), function (res) {
                    var articleCategories = res.content.categories;

                    if( !articleCategories ) return false;

                    for (var category in _Sections) {
                        var thisCat = _Sections[category],
                            thisSection = thisCat.path;

                        if( articleCategories.indexOf(thisSection) > -1 ) {
                            Vue.set(vm.sections[category], 'active', true);
                        }
                    }
                });
            }

        });
    }
});

// Watch sections and add the right ones to article 'categories'
vm.$watch('sections', function (newVal, oldVal) {
    this.editor.categories = [];

    for (category in this.sections) {
        var thisCat = this.sections[category];
        if (thisCat.active) this.editor.categories.push(thisCat.path);
    }
}, {deep: true});