# Data-Cache
[![npm bundle size](https://img.shields.io/bundlephobia/min/@binyamin/data-cache)](https://npmjs.com/package/@binyamin/data-cache)
[![CI Test](https://github.com/binyamin/data-cache/workflows/Test/badge.svg)](https://github.com/binyamin/data-cache/actions)

> A tiny npm module for caching data

## Install
```
$ npm install @binyamin/data-cache
```

## Usage
```js
const datacache = require("@binyamin/data-cache");

datacache.set("data", "value");
// => Creates a file `.cache/data`, with a value of "value"

datacache.get("data");
// => "value"
```

## License
MIT © [Binyamin Green](https://binyam.in)
