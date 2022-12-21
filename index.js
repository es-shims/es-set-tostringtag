'use strict';

var GetIntrinsic = require('get-intrinsic');

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasToStringTag = require('has-tostringtag/shams')();
var has = require('has');

var toStringTag = hasToStringTag ? Symbol.toStringTag : null;

module.exports = function setToStringTag(object, value) {
	if (toStringTag && !has(object, toStringTag)) {
		if ($defineProperty) {
			$defineProperty(object, toStringTag, {
				configurable: true,
				enumerable: false,
				value: value,
				writable: false
			});
		} else {
			object[toStringTag] = value; // eslint-disable-line no-param-reassign
		}
	}
};
