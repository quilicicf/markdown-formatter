const _ = require('lodash');
const buildNode = require('unist-builder');
const makeToc = require('mdast-util-toc');

const findTocStart = require('./findTocStart');
const parseTocConfiguration = require('./parseTocConfiguration');

const isInRange = require('../isInRange');

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

  const filteredHeadings = _(tree.children)
    .filter(part => part.type === 'heading' && isInRange(part.depth, tocConfiguration))
    .value();
  const toc = makeToc(buildNode('root', filteredHeadings));
  tree.children.splice(tocStartFinder.tocStartIndex + 1, tocStartFinder.tocSize, toc.map);
};

module.exports = () => transformer;
