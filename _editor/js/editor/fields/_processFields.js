function processCustomFields (_Fields) {
    for ( var field in _Fields ) {
        var f = _Fields[field],
            type = f.type,
            name = f.name,
            placement = f.placement;

        // Set Vue reactive data
        _Data[name] = '';

        var htmlTitle = '';
        if (f.title) htmlTitle = '<h3>'+ f.title +'</h3>';

        var htmlPlaceholder = '';
        if (f.placeholder) htmlPlaceholder = 'placeholder="'+ f.placeholder +'"';

        var htmlClasses = '';
        if (f.classes) htmlClasses = 'class="'+ f.classes +'"';

        var htmlEvent = '';
        if (f.event) htmlEvent = f.event;

        var htmlField = '';
        if ( type == 'text' ) {
            htmlField = '<input type="text" '+ htmlPlaceholder + htmlClasses + ' v-model="editor.'+ name +'" '+ htmlEvent +'/>';
        }
        else if (type == 'richtext') {
            htmlField = '<div contenteditable ' + htmlPlaceholder + htmlClasses +' v-html="editor.'+ name +'" '+ htmlEvent +'></div>';
        }
        else if (type == 'checkbox') {
            htmlField = '<label>'+
                            '<input type="checkbox" v-model="editor.'+ name +'" checked />'+
                            '<span class="field-'+ type +'__title">'+ f.label +'</span>'+
                        '</label>';
        }

        htmlField = '<div data-name="'+ name +'" class="ee__module field field-'+ type +'">' + htmlTitle + htmlField + '</div>';

        $('#placement-'+placement).append(htmlField);
    }
}
