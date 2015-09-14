'use strict';
var test = require('ava');
var sliced = require('sliced');
var apply = require('../src');

test('no arguments', function (assert) {
	assert.plan(1);
	function greet(val) {
		return 'hello ' + val;
	}
	return apply(greet)
		.catch(function (err) {
			var actual = err.message;
			var expected = '`args` must be an array!';
			assert.is(actual, expected);
		});
});

test('no function', function (assert) {
	assert.plan(1);
	return apply('hello', [])
		.catch(function (err) {
			var actual = err.message;
			var expected = '`fn` must be a function!';
			assert.is(actual, expected);
		});
});

test('one argument', function (assert) {
	assert.plan(1);
	function greet(val) {
		return 'hello ' + val;
	}
	return apply(greet, [Promise.resolve('world')])
		.then(function (actual) {
			var expected = 'hello world';
			assert.is(actual, expected);
		});
});

test('multiple arguments', function (assert) {
	assert.plan(1);
	function join(sep) {
		return function () {
			return sliced(arguments).join(sep);
		};
	}
	return apply(join(' '), [Promise.resolve('hello'), Promise.resolve('world')])
		.then(function (actual) {
			var expected = 'hello world';
			assert.is(actual, expected);
		});
});

test('non-promise values', function (assert) {
	assert.plan(1);
	function join(sep) {
		return function () {
			return sliced(arguments).join(sep);
		};
	}
	return apply(join(' '), ['hello', 'world'])
		.then(function (actual) {
			var expected = 'hello world';
			assert.is(actual, expected);
		});
});

test('function to apply is a promise', function (assert) {
	assert.plan(1);
	function join(sep) {
		return Promise.resolve(function () {
			return sliced(arguments).join(sep);
		});
	}
	return apply(join(' '), ['hello', 'world'])
		.then(function (actual) {
			var expected = 'hello world';
			assert.is(actual, expected);
		});
});
