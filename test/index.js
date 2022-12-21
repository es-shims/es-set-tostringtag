'use strict';

var test = require('tape');
var hasToStringTag = require('has-tostringtag/shams')();
var has = require('has');

var setToStringTag = require('../');

test('setToStringTag', function (t) {
	t.equal(typeof setToStringTag, 'function', 'is a function');

	var obj = {};
	var sentinel = {};

	setToStringTag(obj, sentinel);

	if (hasToStringTag) {
		t.ok(has(obj, Symbol.toStringTag), 'has toStringTag property');
		t.equal(obj[Symbol.toStringTag], sentinel, 'toStringTag property is as expected');
	} else {
		var passed = true;
		for (var key in obj) { // eslint-disable-line no-restricted-syntax
			if (has(obj, key)) {
				t.fail('object has own key ' + key);
				passed = false;
			}
		}
		if (passed) {
			t.ok(true, 'object has no enumerable own keys');
		}
	}
	t.equal(String(obj), '[object Object]', 'toStringTag works', { skip: !hasToStringTag });

	t.end();
});
