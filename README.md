[![Build Status](https://travis-ci.org/UziTech/jasmine2-focused.png)](https://travis-ci.org/UziTech/jasmine2-focused)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/hw8plj2yq94aqahq?svg=true)](https://ci.appveyor.com/project/UziTech/jasmine2-focused)

# Jasmine 2.x Focused

This is similar to [jasmine-focused](https://github.com/atom/jasmine-focused) except it is for Jasmine 2.x

Adds global functions to run only certain [Jasmine](https://github.com/pivotal/jasmine) specs.

The number of `f` characters in the method name denotes the priority of the `describe` or `it` spec.

For example, a `fit` spec would be run instead of any `it` specs and a `ffit` spec would be run instead of any `fit` or `it` specs.

## Installing

Save `jasmine2-focused` in devDependencies

```sh
npm install jasmine2-focused --save-dev
```

then require it

```js
require("jasmine2-focused");
```

before your tests.

## Using

The following function are provides that wrap the standard `it` and `describe` Jasmine functions.

  * `fit`
  * `ffit`
  * `fffit`
  * `fdescribe`
  * `ffdescribe`
  * `fffdescribe`
