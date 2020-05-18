# CHANGELOG

* __3.0.0:__
  * :rotating_light: BREAKING CHANGES
    * :shower: Remove cursor positioning. It was useless because editors already handle it better
* __2.0.2:__
  * :lock: Upgrade libs to fix vulnerabilities
* __2.0.1:__
  * [Better cursor positioning](https://github.com/quilicicf/markdown-formatter/pull/2)
* __2.0.0:__ 
  * [Compute cursor position](https://github.com/quilicicf/markdown-formatter/pull/1)
  * :rotating_light: BREAKING CHANGES
    * The result for `format*` methods is not the formatted markdown as string anymore. Get the formatted markdown as string with `result.contents`.
* __1.0.0:__ Initial version
