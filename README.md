# promise-fnapply

[![Build status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![XO code style][codestyle-image]][codestyle-url]

> A Function.apply that can deal with promise arguments

## Installation

Install `promise-fnapply` using [npm](https://www.npmjs.com/):

```bash
npm install --save promise-fnapply
```

## Usage

### Module usage

```javascript
const apply = require('promise-fnapply');

function greet(val) {
  return `hello ${val}`;
}

apply(greet, [Promise.resolve('world')])
  .then(val => {
    // val === 'hello world'
  });
```

## API

### `apply(fn, promises)`

| Name | Type | Description |
|------|------|-------------|
| `fn` | `Function|Promise { [Function] }`| The function, or a promise resolving to a function, to apply with the resolved promises as argument array |
| `promises` | `Array { Promise }`| The arguments array to pass to `fn` when they all are resolved |

Returns: `Promise`, which resolves to the result of applying `fn` with the resolved values of `promises`.

## Related

* [`promise-or`](https://github.com/joakimbeng/promise-or)
* [`promise-and`](https://github.com/joakimbeng/promise-and)
* [`promise-if`](https://github.com/joakimbeng/promise-if)
* [`promise-not`](https://github.com/joakimbeng/promise-not)
* [`promise-all`](https://github.com/joakimbeng/promise-all)
* [`promise-get`](https://github.com/joakimbeng/promise-get)
* [`promise-fncall`](https://github.com/joakimbeng/promise-fncall)

## License

MIT © [Joakim Carlstein](http://joakim.beng.se)

[npm-url]: https://npmjs.org/package/promise-fnapply
[npm-image]: https://badge.fury.io/js/promise-fnapply.svg
[travis-url]: https://travis-ci.org/joakimbeng/promise-fnapply
[travis-image]: https://travis-ci.org/joakimbeng/promise-fnapply.svg?branch=master
[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code%20style-XO-5ed9c7.svg?style=flat
