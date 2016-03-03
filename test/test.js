'use strict';
const test = require('ava');
const apply = require('../src');

test('no arguments', t => {
	t.plan(1);
	function greet(val) {
		return `hello ${val}`;
	}
	return apply(greet)
		.catch(err => {
			const actual = err.message;
			const expected = '`args` must be an array!';
			t.is(actual, expected);
		});
});

test('no function', t => {
	t.plan(1);
	return apply('hello', [])
		.catch(err => {
			const actual = err.message;
			const expected = '`fn` must be a function!';
			t.is(actual, expected);
		});
});

test('one argument', t => {
	t.plan(1);
	function greet(val) {
		return `hello ${val}`;
	}
	return apply(greet, [Promise.resolve('world')])
		.then(actual => {
			const expected = 'hello world';
			t.is(actual, expected);
		});
});

test('multiple arguments', t => {
	t.plan(1);
	function join(sep) {
		return (...args) => args.join(sep);
	}
	return apply(join(' '), [Promise.resolve('hello'), Promise.resolve('world')])
		.then(actual => {
			const expected = 'hello world';
			t.is(actual, expected);
		});
});

test('non-promise values', t => {
	t.plan(1);
	function join(sep) {
		return (...args) => args.join(sep);
	}
	return apply(join(' '), ['hello', 'world'])
		.then(actual => {
			const expected = 'hello world';
			t.is(actual, expected);
		});
});

test('function to apply is a promise', t => {
	t.plan(1);
	function join(sep) {
		return Promise.resolve((...args) => args.join(sep));
	}
	return apply(join(' '), ['hello', 'world'])
		.then(actual => {
			const expected = 'hello world';
			t.is(actual, expected);
		});
});

test('setting context', t => {
	t.plan(1);
	const obj = {
		greeting: 'Hello ',
		greet: Promise.resolve(function (name) {
			return this.greeting + name;
		})
	};
	return apply(obj.greet, ['world'], obj)
		.then(actual => {
			const expected = 'Hello world';
			t.is(actual, expected);
		});
});
