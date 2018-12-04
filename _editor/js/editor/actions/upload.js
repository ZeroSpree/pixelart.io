function uploadSuccess(filepath, obj, key) {
    // obj & key are needed for yaml data, like splash image.
    if (obj && key) {
        _Data[obj][key] = filepath;
    }
    // insert into editor
    else {
        quillImageInsert(filepath);
    }

    UI.notify('Image uploaded succesfully!');
}

function uploadError(res) {
    console.log(res);
    UI.notify('Woops, something went wrong!<br/>' + res.statusText, 'error');
}

function uploadMissingFile() {
    UI.notify('No image was selected. Please select an image to upload.', 'error');
}

$(function() {
    /*
     * Upload an image from URL
     */
    $('body').on('click', '.js--upload', function() {
        var $t = $(this);
        var obj = $t.attr('data-object');
        var key = $t.attr('data-key');
        var dialog = prompt('Image URL', '');

        if (!dialog) {
            uploadMissingFile();
            return false;
        }

        var data = {
            url  : dialog
        };

        $.post(config.routes.upload, data).done(function(data) {
            uploadSuccess(data.path, obj, key);
        }).fail(function(res) {
            uploadError(res);
        });
    });

    /*
     * Upload an image from local system
     */

    // Auto-submit forms when a local file is selected
    $('body').on('change', '[name="upload"]', function () {
        $(this).parents('form').first().trigger('submit');
    });

    $('body').on('submit', '.js--upload-localfile', function (e) {
        e.preventDefault();

        // Get the files from input, create new FormData.
        var $t        = $(this);
        var $input    = $t.find('[name="upload"]');
        var obj       = $input.attr('data-object');
        var key       = $input.attr('data-key');
        var inputName = $input.attr('name');
        var files     = $input.get(0).files;
        var formData  = new FormData();

        if (files.length === 0) {
            uploadMissingFile();
            return false;
        }

        // Append the files to the formData.
        for (var i=0; i < files.length; i++) {
            var file = files[i];
            formData.append(inputName, file, file.name);
        }

        $t.trigger('reset');

        $.ajax({
            url: config.routes.uploadLocal,
            method: 'post',
            data: formData,
            processData: false,
            contentType: false
        }).done(function (data) {
            uploadSuccess(data.path, obj, key);
        }).fail(function (res) {
            uploadError(res);
        });

    });
});

