// Polyfill for Element.closest that falls back to Element.matches that falls back to querySelectorAll
// Created for blazy.js 1.8.1 - https://github.com/dinbror/blazy to ensure IE7+ support

(function () {
    if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.matchesSelector || 
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector || 
        Element.prototype.oMatchesSelector || 
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;            
        };
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = Element.prototype.closest ||
        function(selector) {
            var element = this;
            while (element.matches && !element.matches(selector)) element = element.parentNode;
            return element.matches ? element : null;
        };
    }
})();

    var bLazy = new Blazy({
        selector: '[data-src]',
        offset: 100,
        success: function(element){
            setTimeout(function(){
                console.log('ohai')
            }, 200);
        },
        error: function(ele, msg){
            setTimeout(function(){
                console.log(msg)
            }, 200);
        }
    });