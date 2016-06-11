
var assert = require('assert');
var bowrapped = require('./bowrapped');


describe('bowrap', function() {
    it('should import bowrapped module', function () {
        assert.equal(true, bowrapped.test());
    });
});

