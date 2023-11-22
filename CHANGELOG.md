<!-- Formatted by https://github.com/quilicicf/markdown-formatter -->

# CHANGELOG

<!-- TOC START -->

* [5.0.0](#500)
* [4.0.7](#407)
* [4.0.6](#406)
* [4.0.5](#405)
* [4.0.4](#404)
* [4.0.3](#403)
* [4.0.2](#402)
* [4.0.1](#401)
* [4.0.0](#400)
* [3.0.4](#304)
* [3.0.3](#303)
* [3.0.2](#302)
* [3.0.1](#301)
* [3.0.0](#300)
* [2.0.2](#202)
* [2.0.1](#201)
* [2.0.0](#200)
* [1.0.0](#100)

<!-- TOC END -->

## 5.0.0

* :rotating\_light: __Breaking changes__
  * The remark dependencies were upgraded to new major versions. This should only impact users with custom configurations since the format of the configuration has changed. More information in [remark's changelog](https://github.com/remarkjs/remark/releases/tag/15.0.0). If you were using `listItemIndent: '1'`, you should remove it or use `listItemIndent: 'one'` instead (but that's the default, so omitting it works too).
* :lock: Upgrade all libs

## 4.0.7

* :lock: Upgrade all libs

## 4.0.6

* :lock: Upgrade all libs

## 4.0.5

* :lock: Upgrade all libs

## 4.0.4

* :bug: Fix TS types

## 4.0.3

* :lock: Upgrade all libs

## 4.0.2

* :bug: Fix for [Atom package](https://atom.io/packages/markdown-spec-formatter) relying on this module

## 4.0.1

* :bug: Fix TS types

## 4.0.0

* :rotating\_light: __Breaking changes__
  * The content of the result is now in attribute `value` (formerly `contents`).
    See [commit `736356a`](https://github.com/quilicicf/markdown-formatter/commit/736356a14548880f8eafacb29f45c2c09bb304ba).
* :bug: Fix TS types
* :lock: Lib upgrades

## 3.0.4

* :lock: Lib upgrades

## 3.0.3

* :arrow\_up: Lib upgrades

## 3.0.2

* :arrow\_up: Lib upgrades

## 3.0.1

* :arrow\_up: Lib upgrades

## 3.0.0

* :rotating\_light: __BREAKING CHANGES__
  * :shower: Remove cursor positioning. It was useless because editors already handle it better
* :new: Allow overwriting the stringification options (issue [#5](https://github.com/quilicicf/markdown-formatter/issues/5))
* :new: Optionally add a watermark with a link to this repository
* :green\_heart: Add CI build
* :arrow\_up: Upgrade all libs

## 2.0.2

* :lock: Upgrade libs to fix vulnerabilities

## 2.0.1

* [Better cursor positioning](https://github.com/quilicicf/markdown-formatter/pull/2)

## 2.0.0

* :rotating\_light: __BREAKING CHANGES__
  * The result for `format*` methods is not the formatted markdown as string anymore. Get the formatted markdown as string with `result.contents`.
* [Compute cursor position](https://github.com/quilicicf/markdown-formatter/pull/1)

## 1.0.0

Initial version
