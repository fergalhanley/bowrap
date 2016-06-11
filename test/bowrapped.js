(function () {
        if (typeof window !== 'undefined') {
            window.exports = {};
            window.module = {};
        }
    })();(function(){
function test(){
    return true;
}

module.exports = {
    test: test
};})();(function () {
        if (typeof window !== 'undefined') {
            window['bowrapped'] = module.exports || exports.default || exports;
        }
    })();