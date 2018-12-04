function getIndex() {
    var range = quill.getSelection();
    console.log(range);
    return range ? range.index : quill.getLength();
}

// Insert Read More button
$('body').on('click', '#ql-readmore', function() {
    quill.insertText(getIndex(), "\n{readmore}\n");
});

// Insert Image (triggered from upload.js)
function quillImageInsert(filepath) {
    quill.insertEmbed(getIndex(), 'figure', filepath); // custom blot
    quill.insertText(getIndex() + 1, '\n', Quill.sources.USER);
    quill.setSelection(getIndex() + 2, Quill.sources.SILENT);
}
