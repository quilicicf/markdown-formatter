# markdown-formatter

> A markdown formatter intended for writing specifications

<!-- TOC START min:2 max: 4 -->

* [Badges and stuff](#badges-and-stuff)

  * [Info](#info)
  * [Status](#status)

* [What it is](#what-it-is)

* [Use it](#use-it)

  * [CLI](#cli)

    * [Options](#options)

  * [API](#api)

    * [Parameters for formatFromString](#parameters-for-formatfromstring)
    * [Parameters for formatFromFile](#parameters-for-formatfromfile)

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

[![Dependency Status](https://david-dm.org/quilicicf/markdown-formatter.svg)](https://david-dm.org/quilicicf/markdown-formatter)
[![Known Vulnerabilities](https://snyk.io/test/github/quilicicf/markdown-formatter/badge.svg)](https://snyk.io/test/github/quilicicf/markdown-formatter)

## What it is

This formatter takes a markdown file and applies formatting rules to it.

It can also add a ToC in you document, see documentation below.

It is supposed to be used as a formatter for your markdown. Feel free to plug it to your favorite editor. I'll do Atom and IntelliJ because they are my editors of choice.

> Note: obviously, this doc is formatted by dog-fooding the package. Look at npm script `format:readme` in `package.json`.

## Use it

### CLI

```shell
$ npm install -g @quilicicf/markdown-formatter
$ markdown-format --content '**Toto**'
  > __Toto__
$
```

#### Options

|      Option     | Alias | Type    | Description                                                                                                            |
| :-------------: | :---: | ------- | ---------------------------------------------------------------------------------------------------------------------- |
|   __content__   |   c   | String  | Markdown string to format. Mutually exclusive with `file`                                                              |
|     __file__    |   f   | String  | File path to Markdown file to format. Mutually exclusive with `content`                                                |
| __output-file__ |   o   | String  | When specified, creates/overwrites a file with the formatted markdown                                                  |
|   __replace__   |   r   | Boolean | Replaces the `file` content in-place. Mutually exclusive with `content` & `output-file`. Only valid when `file` is set |

### API

```js
const { formatFromFile, formatFromString } = require('@quilicicf/markdown-formatter');

const main = async () => {
  const formattedFromString = await formatFromString('**Toto**', 2);
  process.stdout.write(`Formatted from string:\n${formattedFromString.contents}\n`);
  process.stdout.write(`With messages:\n${formattedFromString.messages}\n`);
  process.stdout.write(`New cursor offset:\n${formattedFromString.newCursorOffset}\n`);
  process.stdout.write(`New cursor position:\n${formattedFromString.newCursorPosition}\n`);

  const formattedFromFile = await formatFromFile(filePath);
  process.stdout.write(`Formatted from file:\n${formattedFromFile.contents}\n`);
}

main();
```

#### Parameters for formatFromString

|     Parameter    |   Type  | Description                                      |
| :--------------: | :-----: | ------------------------------------------------ |
|    __content__   |  String | Markdown string to format                        |
| __cursorOffset__ | Integer | _Optional_ the cursor offset from document start |

#### Parameters for formatFromFile

|     Parameter    |   Type  | Description                                      |
| :--------------: | :-----: | ------------------------------------------------ |
|   __filePath__   |  String | Path to markdown file to format                  |
| __cursorOffset__ | Integer | _Optional_ the cursor offset from document start |

## How it works

It uses [remark](https://www.npmjs.com/package/remark) to parse the markdown and generate an AST.

Then [remark-stringify](https://www.npmjs.com/package/remark-stringify) to re-generate the string from the AST and apply the formatting rules to it.

Additionally, [mdast-util-toc](https://www.npmjs.com/package/mdast-util-toc) is used to generate a ToC.

## ToC generation

The ToC is inserted in the HTML comments described below and can be configured with the options also examplified.

```markdown
<!-- TOC START min:2 max:4 -->

> Anything between those two HTML comments will be replaced by the auto-generated ToC.

<!-- TOC END -->
```

### ToC parameters

| Name    | Accepted values          | Default value | Description                                                 |
| ------- | ------------------------ | :-----------: | ----------------------------------------------------------- |
| __min__ | Any number between 1 & 6 |       2       | The minimum level of headings that should appear in the ToC |
| __max__ | Any number between 1 & 6 |       4       | The maximum level of headings that should appear in the ToC |

## Roadmap

* [ ] Create atom formatter
* [ ] Create IntelliJ formatter
* [ ] Add dot graphs capabilities
