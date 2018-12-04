/*
 * Format raw path
 * to jekyl build permalink format
 * 
 * Original: _posts/2018-10-03-welcome-to-jekyll - Copy (11) - Copy.markdown
 * Formatted: /welcome-to-jekyll-Copy-(11)-Copy
 */

Vue.filter('tojekyllurl', function (string) {
    var newstring = utils.sanitizeFilename(string);

    return decodeURI( newstring.replace(newstring.substring(0, 11), '/') );
});

Vue.filter('tojekyllurlsection', function (string) {
    return decodeURI( '/' + utils.sanitizeFilename(string) );
});

Vue.filter('ymd', function (date) {
    var d    = new Date(date),
        dd   = d.getDate(),
        mm   = d.getMonth()+1,
        yyyy = d.getFullYear();

    if (dd < 10)  { dd = '0'+dd; }
    if (mm < 10)  { mm = '0'+mm; }

    return yyyy+'-'+mm+'-'+dd;
});

Vue.filter('hms', function (date) {
    var d    = new Date(date);
    var utcString = d.toISOString().substring(0, 19);
    var hour = d.getHours();
    var localDatetime = (hour < 10 ? "0" + hour : hour) + utcString.substring(13, 19);

    return localDatetime;
});