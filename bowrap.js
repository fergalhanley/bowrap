'use strict';

var fs = require('fs');
var name = require(process.cwd() + '/package.json').name;
var inputFile = process.argv[2];

fs.readFile(process.cwd() + '/' + inputFile, 'utf8', function (err, script) {
    if (err) {
        throw err;
    }

    var setup = (function () {
        if (typeof window !== 'undefined') {
            window.exports = {};
            window.bowrap = window.bowrap || function (member) {
                    member = member || 'default';
                    return {
                        from: function from(moduleName) {
                            var module = bowrapped[moduleName];
                            return module[member];
                        }
                    };
                };
        }
    }).toString().slice(13, -1);

    var teardown = (function () {
        if (typeof window !== 'undefined') {
            window.bowrapped = window.bowrapped || {};
            window.bowrapped['${name}'] = window.exports;
        }
    }).toString().slice(13, -1).replace('${name}', name);

    var bowrapped = setup + '(function(){' + script + '})();' + teardown;
    console.log(bowrapped);
});
