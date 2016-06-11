#!/usr/bin/env node
'use strict';

var fs = require('fs');
var meow = require('meow');

var cli = meow([
    'Usage',
    '  $ bowrap <path> [...]',
    '',
    'Options',
    '  -o, --output  File to output to',
    '  -n, --name    The name to use other than the name field in package.json',
    '',
    'Example',
    '  $ bowrap src/index.js -o dist/index.js'
], {
    string: [
        '_',
        'output',
        'name'
    ],
    alias: {
        o: 'output',
        n: 'name'
    }
});

if (cli.input.length != 1) {
    console.error('You must specify single path to a file');
    process.exit(1);
}

var name = cli.flags.name || require(process.cwd() + '/package.json').name;
var inputFile = cli.input[0];

fs.readFile(process.cwd() + '/' + inputFile, 'utf8', function (err, script) {
    if (err) {
        throw err;
    }

    var setup = (function () {
        if (typeof window !== 'undefined') {
            window.exports = {};
            window.module = {};
        }
    }).toString();

    var teardown = (function () {
        if (typeof window !== 'undefined') {
            window['${name}'] = module.exports || exports.default || exports;
        }
    }).toString().replace('${name}', name);

    var bowrapped = '(' + setup + ')();(function(){' + script + '})();(' + teardown + ')();';

    if(cli.flags.output) {
        fs.writeFile(cli.flags.output, bowrapped);
    }
    else {
        console.log(bowrapped);
    }
});
