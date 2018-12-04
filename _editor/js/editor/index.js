var _Slug = window.location.hash.substr(1);
var _Sections = [];
var _Layouts = [];

var _Extra = {
    'slug' : _Slug,
    'permalink': '',
    'isCustomSlug' : false
}

// Set default reactive data
var _Data = {
    'splash': {
        'image': false
    },
    '__content': ''
};

// Add Custom Fields
processCustomFields(_Fields, _Data);

// Add Article default data
if ( utils.isArticleEditor() ) {
    _Data.layout     = 'post',
    _Data.categories = [];
    _Data.date       = utils.jekyllTime();
    _Data.permalink  = '';
}

// Add Sections default data
if ( utils.isSectionEditor() ) {
    _Data.layout = 'section';
    _Data.parent = '';

    // Add order
    $.get(config.routes.listing+'?path='+config.sectionsDir, function (data) {
        _Data.order = data.length + 1;
    });
}

var vm = new Vue({
    el    : '#editor',
    data  : {
        'editor'   : _Data,
        'sections' : _Sections,
        'layouts'  : _Layouts,
        'extra'    : _Extra
    },
    methods : {
        headlineHandler : function (event) {
            var data = this._data,
                $t = $(event.target),
                key = $t.parents('[data-name]').first().attr('data-name');

            // Trim the text
            this._data.editor[key] = $t.text().trim();

            // Autofill slug
            if ( !data.extra.isCustomSlug ) {
                data.extra.permalink = utils.sanitizeSlug( $('[data-name="title"]').text() );
            }
        },
        textTrim : function (event) {
            var $t = $(event.target),
                key = $t.parents('[data-name]').first().attr('data-name');

            this._data.editor[key] = $t.text().trim();
        },
        htmlTrim : function (event) {
            var $t = $(event.target),
                key = $t.parents('[data-name]').first().attr('data-name');

            this._data.editor[key] = $t.html().trim();
        },
        sanitizeSlug : function (event) {
            this._data.extra.permalink = utils.sanitizeSlug( $(event.target).val() );
        },
        headlineSlugHandler : function (event) {
            var data = this._data;

            if ( !data.extra.isCustomSlug ) {
                data.extra.permalink = utils.sanitizeSlug( $('[data-name="title"]').text() );
            }
        }
    }
});

var quill = new Quill('#editor-body', {
    placeholder: 'Compose an epic...',
    theme: 'snow',
    modules: {
        toolbar: '#quilljs-toolbar'
    }
});

// Edit
function edit() {
    if (!_Slug.length) return;

    $.post(config.routes.readyaml+'?path='+decodeURI(_Slug), function (res) {
        var data = res.content;

        // Populate Vue _Data with article info
        for (var attrname in data) {
            _Data[attrname] = data[attrname];
        }

        // Populate Quill editor with article contents
        $('.ql-editor').html( $.trim(_Data.__content) );


        // Revert the transformations from utils.htmlSanitize

        // Add a paragraph at the end so we can write new content
        $('.ql-editor').append('<p><br></p>');

        // Load the lazy images
        var $images = $('.ql-editor').find('img');
        $.each($images, function () {
            var $t = $(this),
                src = $t.attr('data-src');

            $t.attr('src', src);
            $t.removeAttr('data-src');
        });
    });
}

edit();
