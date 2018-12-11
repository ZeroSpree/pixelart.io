/*
 * Create Editor Layout picker
 */

// Get available layouts
$.get(config.routes.listing+'?path='+config.layoutsDir+'&ext=html', function (data) {
    for ( var path in data ) {
        var layoutName = utils.sanitizeFilename( data[path] );

        _Layouts.push(layoutName);
    }
});