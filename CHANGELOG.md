# CHANGELOG

* __3.0.4:__
  * :lock: Lib upgrades
* __3.0.3:__
  * :arrow_up: Lib upgrades
* __3.0.2:__
  * :arrow_up: Lib upgrades
* __3.0.1:__
  * :arrow_up: Lib upgrades
* __3.0.0:__
  * :new: Allow overwriting the stringification options (issue [#5](https://github.com/quilicicf/markdown-formatter/issues/5))
  * :new: Optionally add a watermark with a link to this repository
  * :green_heart: Add CI build
  * :arrow_up: Upgrade all libs
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
