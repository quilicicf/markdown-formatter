const _ = require('lodash');
const buildNode = require('unist-builder');
const makeToc = require('mdast-util-toc');

const findTocStart = require('./findTocStart');
const recursiveSetDepth = require('./recursiveSetDepth');
const parseTocConfiguration = require('./parseTocConfiguration');
const getWasCursorPositionInToc = require('./getWasCursorPositionInToc');

const isInRange = require('../../isInRange');
const {
  NAME_SPACE,
  DEPTH,
  CONTAINS_CURSOR,
  IS_CURSOR_AT_END,
} = require('../../constants');

const DEFAULT_CONFIGURATION = { min: 2, max: 4 };

const transformer = (tree, file) => {
  const tocStartFinder = findTocStart(tree);

  if (!tocStartFinder.tocStart) {
    file.info('No ToC start found, only simple formatting was done');
    return;
  }

  const tocConfiguration = {
    ...DEFAULT_CONFIGURATION,
    ...parseTocConfiguration(tocStartFinder.tocStart.value),
  };

  const filteredHeadings = _.filter(
    tree.children,
    part => part.type === 'heading' && isInRange(part.depth, tocConfiguration),
  );

  const toc = makeToc(buildNode('root', filteredHeadings)).map;

  const wasCursorPositionInToc = getWasCursorPositionInToc(tocStartFinder.tocContent);
  _.set(toc, [ NAME_SPACE, CONTAINS_CURSOR ], wasCursorPositionInToc);
  _.set(toc, [ NAME_SPACE, IS_CURSOR_AT_END ], wasCursorPositionInToc);
  _.set(toc, [ NAME_SPACE, DEPTH ], 1);
  recursiveSetDepth(toc.children);

  tree.children.splice(tocStartFinder.tocStartIndex + 1, tocStartFinder.tocSize, toc);
};

module.exports = () => transformer;
