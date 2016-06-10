'use strict';

var fs = require('fs');
var name = process.argv[3] || require(process.cwd() + '/package.json').name;
var inputFile = process.argv[2];

fs.readFile(process.cwd() + '/' + inputFile, 'utf8', function (err, script) {
    if (err) {
        throw err;
    }

    var setup = (function () {
        if (typeof window !== 'undefined') {
            window.exports = {};
        }
    }).toString();

    var teardown = (function () {
        if (typeof window !== 'undefined') {
            window['${name}'] = window.exports.default || window.exports;
        }
    }).toString().replace('${name}', name);

    var bowrapped = '(' + setup + ')();(function(){' + script + '})();(' + teardown + ')();';
    console.log(bowrapped);
});
