# node-data-cache
[![Build Status](https://travis-ci.com/binyamin/data-cache.svg?branch=main)](https://travis-ci.com/binyamin/data-cache)
Tiny module for caching data

## Install
```
$ npm install @b3u/data-cache
```

## Usage
```js
const datacache = require("@b3u/data-cache");

datacache.set("data", "value");
// => Creates a file `.cache/data`, with a value of "value"

datacache.get("data");
// => "value"
```

## License
MIT © [Binyamin Green](https://binyam.in)
