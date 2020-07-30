# easy-template-string

[![Build Status](https://travis-ci.org/manolan1/easy-template-string.svg?branch=master)](https://travis-ci.org/manolan1/easy-template-string)
[![Dependency Status](https://david-dm.org/manolan1/easy-template-string.svg)](https://david-dm.org/manolan1/easy-template-string)
[![Code Coverage](https://codecov.io/gh/manolan1/easy-template-string/branch/master/graph/badge.svg)](https://codecov.io/gh/manolan1/easy-template-string)

Allow normal JS strings to behave like template strings

# Usage

```js
const Template = require('easy-template-string').default;

const template1 = new Template('x${first}y${second}z');
console.log(template1.interpolate({ first: 'abc', second: 'def' }));  // xabcydefz
```

If a key is missing in the object passed to ```interpolate```, it will simply be ignored in the output:
```js
const template2 = new Template('x${value1}y${value2}z');
console.log(template2.interpolate({ value2: 'def' }));  // xydefz
```

Patterns can be escaped using a backslash (```\```). Note that, in simple string initialisation, this requires escaping the backslash itself:
```js
const template3 = new Template('x\\${escaped}y');
console.log(template3.template);                         // x\${escaped}y
console.log(template3.interpolate({ escaped: 'abc' }));  // x${escaped}y
```

Values will always be coerced to a string, even if that isn't pretty:
```js
const template4 = new Template('x${notPretty}y${pretty}z');
console.log(template4.interpolate({ notPretty: {}, pretty: 'def' }));  // x[object Object]ydefz
```
But ```undefined``` will be ignored just like a missing property.


# Restrictions

Requires Node v12.0.0+ to support ```string.prototype.matchAll```.
