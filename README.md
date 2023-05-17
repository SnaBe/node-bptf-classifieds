# node-bptf-classifieds
A Node.js wrapper for the Backpack.tf Classifieds Web API.

[![npm version](https://img.shields.io/npm/v/bptf-classifieds.svg?style=flat-square)](https://npmjs.com/package/bptf-classifieds)
[![node version](https://img.shields.io/node/v/bptf-classifieds?style=flat-square)](https://nodejs.org/en/about/releases/)
[![npm test](https://img.shields.io/github/actions/workflow/status/SnaBe/node-bptf-classifieds/test.yml?logo=github&branch=main&style=flat-square)](https://github.com/SnaBe/node-bptf-classifieds/actions/workflows/test.yml)
[![dependencies](https://img.shields.io/librariesio/release/npm/bptf-classifieds?style=flat-square)](https://www.npmjs.com/package/bptf-classifieds)
[![npm downloads](https://img.shields.io/npm/dm/bptf-classifieds.svg?style=flat-square)](https://npmjs.com/package/bptf-classifieds)
[![license](https://img.shields.io/npm/l/bptf-classifieds.svg?style=flat-square)](https://github.com/SnaBe/node-bptf-classifieds/blob/master/LICENSE)
[![paypal](https://img.shields.io/badge/paypal-donate-yellow.svg?style=flat-square)](https://www.paypal.me/snabe)

## Installation

Using [npm](https://www.npmjs.com/package/bptf-classifieds):

```bash
$ npm install bptf-classifieds
```

Using [yarn](https://yarnpkg.com/package/bptf-classifieds):

```bash
$ yarn add bptf-classifieds
```

## Testing

**Note**: Make sure you've supplied a valid `user token` or `API key` in the [spec.ts](https://github.com/SnaBe/node-bptf-classifieds/tree/main/test) files.

Using [npm](https://docs.npmjs.com/cli/v8/commands/npm-run-script):
```bash
$ npm test
```

Using [yarn](https://classic.yarnpkg.com/lang/en/docs/cli/run/):
```bash
$ yarn test
```

## Examples

### Importing with `CommonJS`

```js
const { Classifieds } = require('bptf-classifieds');
```

### or with `ES6's import` statement

```js
import { Classifieds } from 'bptf-classifieds';
```

### Instantiating with the `token` and `apiKey` options
```js
const classifieds = new Classifieds({ 
    token: 'XXXXXXXXXXXXXXXXXXXXXXXX',
    apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXX'  
});
```

### Asynchronous requests with `callbacks`

```js
classifieds.getListings({
    sku: 'Fizzy Pharmacist',
    callback: (err, data) => {
        if (err) throw err;

        console.log(data.listings);
    }
});
```

### Asynchronous requests with `async`/`await`

```js
(async () => {
    try {
        const data = await classifieds.getListings({ 
            sku: 'The Bird-Man of Aberdeen'
        });

        console.log(data.listings);
    } catch (error) {
        console.error('An error occurred: ', error);
    }
})();
```

There are some more examples available in the [test](https://github.com/SnaBe/node-bptf-classifieds/tree/main/test) directory.

## Documentation

See the [Wiki pages](https://github.com/SnaBe/node-bptf-classifieds/wiki) for further documentation.

## License

[MIT](LICENSE)

Copyright 2023, Simon Sørensen
