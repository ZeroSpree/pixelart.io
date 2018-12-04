// Example field setup
var exampleField = {
    /*
     * Required. No dashes, format with camelCase instead.
     * This sets the YAML key in the markdown file.
     * Also used for Vue data.
     */
    name: 'example',

    /*
     * Required
     * Setup field type.
     * Possbile values: text, checkbox, richtext (contenteditable field, use instead of textarea)
     */
    type: 'text',

    /*
     * Required
     * Placement of field in the editor.
     * 1 is left column, 2 is right column
     */
    placement: '1',

    /*
     * Optional.
     * Shows up as the field title in the editor page.
     */
    title: 'Example Field',

    /*
     * Optional.
     * Field placeholder text.
     * Works for type:'text' and 'richtext'.
     */
    placeholder: 'Enter example text here',

    /*
     * Optional.
     * Add custom CSS classes on the field.
     */
    classes: 'custom-class',

    /*
     * Optional.
     * Trigger a Vue event.
     * Possible events: textTrim, htmlTrim
     */
    event: '@blur="textTrim"',
};

// checkbox example:

var checkboxField = {
    name: 'output',
    type: 'checkbox',
    placement: '2-1',
    title: 'Checkbox label here',
}