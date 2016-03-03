'use strict';
var all = require('promise-all');

module.exports = function apply(fn, args, that) {
	if (!Array.isArray(args)) {
		return Promise.reject(new TypeError('`args` must be an array!'));
	}
	return Promise.resolve(fn)
		.then(function (fn) {
			if (typeof fn !== 'function') {
				return Promise.reject(new TypeError('`fn` must be a function!'));
			}
			return all(args).then(function (values) {
				return fn.apply(that, values);
			});
		});
};
