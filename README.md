# markdown-formatter

> A markdown formatter intended for writing specifications

<!-- TOC START min:2 max: 4 -->

* [Badges and stuff](#badges-and-stuff)

  * [Info](#info)
  * [Status](#status)

* [What it is](#what-it-is)

* [Use it](#use-it)

  * [CLI](#cli)

    * [CLI options](#cli-options)

  * [API](#api)

    * [formatFromString](#formatfromstring)
    * [formatFromFile](#formatfromfile)

  * [Options](#options)

    * [markdownFormatterOptions](#markdownformatteroptions)
    * [stringifyOptions](#stringifyoptions)

* [How it works](#how-it-works)

* [ToC generation](#toc-generation)

  * [ToC parameters](#toc-parameters)

* [Roadmap](#roadmap)

<!-- TOC END -->

## Badges and stuff

### Info

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

### Status

[![Dependencies freshness](https://img.shields.io/depfu/quilicicf/markdown-formatter)](https://depfu.com/repos/github/quilicicf/markdown-formatter)
[![Known Vulnerabilities](https://snyk.io/test/github/quilicicf/markdown-formatter/badge.svg)](https://snyk.io/test/github/quilicicf/markdown-formatter)
[![Build status](https://travis-ci.org/quilicicf/markdown-formatter.svg?branch=master)](https://travis-ci.org/quilicicf/markdown-formatter/builds)

## What it is

This formatter takes a markdown file and applies formatting rules to it.

It can also [add a ToC in your document](#toc-generation).

It is supposed to be used as a formatter for your markdown. Feel free to plug it to your favorite editor.

There are already plugins for [Atom](https://atom.io/packages/markdown-spec-formatter) and [VSCode](https://marketplace.visualstudio.com/items?itemName=quilicicf.markdown-spec-formatter).

> Note: obviously, this doc is formatted with markdown-formatter. Look at npm script `format:readme` in `package.json`.

## Use it

### CLI

```shell
$ npm install -g @quilicicf/markdown-formatter
$ markdown-format --content '**Toto**'
> __Toto__
$
```

#### CLI options

|         Option        | Alias | Type    | Description                                                                                                                                                                                                                                                                           |
| :-------------------: | :---: | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      __content__      |   c   | String  | Markdown string to format. Mutually exclusive with `file`                                                                                                                                                                                                                             |
|        __file__       |   f   | String  | File path to Markdown file to format. Mutually exclusive with `content`                                                                                                                                                                                                               |
|    __output-file__    |   o   | String  | When specified, creates/overwrites a file with the formatted markdown                                                                                                                                                                                                                 |
|      __replace__      |   r   | Boolean | Replaces the `file` content in-place. Mutually exclusive with `content` & `output-file`. Only valid when `file` is set                                                                                                                                                                |
| __use-configuration__ |   u   | String  | File path to the configuration file for markdown-formatter. The configuration file can define [markdownFormatterOptions](#markdownformatteroptions), [stringifyOptions](#stringifyoptions) or both ([example](./configurationExample.json)). [More information on options](#options). |

### API

Both methods return a [VFile](https://github.com/vfile/vfile#api).

#### formatFromString

##### Usage

```js
const { formatFromString } = require('@quilicicf/markdown-formatter');

const main = async () => {
  const { value, messages } = await formatFromString(
    '**Toto**', // Markdown string
    { watermark: 'top' }, // Markdown-formatter options
    { gfm: false }, // Stringify options
  );
  process.stdout.write(`Formatted from string:\n${value}\n`);
  process.stdout.write(`With messages:\n${messages}\n`);
}

main();
```

##### formatFromString options

|           Parameter          |  Type  | Description                                                                                     |
| :--------------------------: | :----: | ----------------------------------------------------------------------------------------------- |
|          __content__         | String | Markdown string to format                                                                       |
| __markdownFormatterOptions__ | Object | The [markdownFormatterOptions](#markdownformatteroptions). Set to `{}` or omit to use defaults. |
|     __stringifyOptions__     | Object | The [stringifyOptions](#stringifyoptions). Set to `{}` or omit to use defaults.                 |

#### formatFromFile

##### Usage

```js
const { formatFromFile } = require('@quilicicf/markdown-formatter');

const main = async () => {
  const { value } = await formatFromFile(
    filePath, // Markdown string
    { watermark: 'top' }, // Markdown-formatter options
    { bullet: '+' }, // Stringify options
  );
  process.stdout.write(`Formatted from file:\n${value}\n`);
}

main();
```

##### formatFromFile options

|           Parameter          |  Type  | Description                                                                                     |
| :--------------------------: | :----: | ----------------------------------------------------------------------------------------------- |
|         __filePath__         | String | Path to markdown file to format                                                                 |
| __markdownFormatterOptions__ | Object | The [markdownFormatterOptions](#markdownformatteroptions). Set to `{}` or omit to use defaults. |
|     __stringifyOptions__     | Object | The [stringifyOptions](#stringifyoptions). Set to `{}` or omit to use defaults.                 |

### Options

This tool accepts two different configuration objects, `markdownFormatterOptions` and `stringifyOptions`.

The first one configures the plugin itself, the second one configures the formatting feature only and is purely mapped to the options of the underlying module used: [remark-stringify](https://github.com/remarkjs/remark/tree/master/packages/remark-stringify).

You can pass values for these two using the [CLI](#cli) and [API](#api).

#### markdownFormatterOptions

The `markdownFormatterOptions` structure is defined by this plugin in the [TypeScript module declaration](types/index.d.ts) (in the interface `MarkdownFormatterOptions`).

The default values for the fields are in [the constants file](./lib/constants.js) (in property `DEFAULT_MARKDOWN_FORMATTER_OPTIONS`).

Each field present in the configuration you pass to `markdown-formatter` will overwrite the default value for this field.

Examples:

* pass `{}` to use all the default values
* pass `{ watermark: 'top' }` to overwrite the property `watermark` and use defaults for other properties

#### stringifyOptions

The `stringifyOptions` structure is defined by the dependency [remark-stringify](https://github.com/remarkjs/remark/tree/master/packages/remark-stringify#api).

The default values for the fields are in [the constants file](./lib/constants.js) (in property `DEFAULT_STRINGIFY_OPTIONS`). Any field not present in this repository's defaults will use `remark-stringify`'s default value instead.

Each field present in the configuration you pass to `markdown-formatter` will overwrite the default value for this field.

Examples:

* pass `{}` to use all the default values
* pass `{ gfm: false }` to overwrite the property `gfm` and use defaults for other properties

## How it works

It uses [remark](https://www.npmjs.com/package/remark) to parse the markdown and generate an AST.

Then [remark-stringify](https://www.npmjs.com/package/remark-stringify) to re-generate the string from the AST and apply the formatting rules to it.

Additionally, [mdast-util-toc](https://www.npmjs.com/package/mdast-util-toc) is used to generate a ToC.

## ToC generation

The ToC is inserted in the HTML comments described below and can be configured with the options also examplified.

```markdown
<!-- TOC START min:2 max:4 -->

> Anything between those two HTML comments will be replaced by the auto-generated ToC.
> The TOC parameters are optional, see default values in the table below

<!-- TOC END -->
```

### ToC parameters

| Name    | Accepted values          | Default value | Description                                                 |
| ------- | ------------------------ | :-----------: | ----------------------------------------------------------- |
| __min__ | Any number between 1 & 6 |       2       | The minimum level of headings that should appear in the ToC |
| __max__ | Any number between 1 & 6 |       4       | The maximum level of headings that should appear in the ToC |

## Roadmap

* [x] Create atom formatter
* [x] Create IntelliJ formatter
* [ ] Add dot graphs capabilities?
