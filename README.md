# Data-Cache
[![Build Status](https://travis-ci.com/binyamin/data-cache.svg?branch=main)](https://travis-ci.com/binyamin/data-cache)

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
