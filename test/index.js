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

	t.test('has Symbol.toStringTag', { skip: !hasToStringTag }, function (st) {
		st.ok(has(obj, Symbol.toStringTag), 'has toStringTag property');

		st.equal(obj[Symbol.toStringTag], sentinel, 'toStringTag property is as expected');

		st.equal(String(obj), '[object Object]', 'toStringTag works');

		st.end();
	});

	t.test('does not have Symbol.toStringTag', { skip: hasToStringTag }, function (st) {
		var passed = true;
		for (var key in obj) { // eslint-disable-line no-restricted-syntax
			if (has(obj, key)) {
				st.fail('object has own key ' + key);
				passed = false;
			}
		}
		if (passed) {
			st.ok(true, 'object has no enumerable own keys');
		}

		st.end();
	});

	t.end();
});
