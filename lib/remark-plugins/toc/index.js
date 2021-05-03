import { toc as makeToc } from 'mdast-util-toc';
import { u as buildNode } from 'unist-builder';

import findTocStart from './findTocStart';
import parseTocConfiguration from './parseTocConfiguration';

import isInRange from '../../isInRange';
import { DEFAULT_TOC_OPTIONS } from '../../constants';

const transformer = (tree, file) => {
  const tocStartFinder = findTocStart(tree);

  if (!tocStartFinder.tocStart) {
    file.info('No ToC start found, only simple formatting was done');
    return;
  }

  const tocConfiguration = {
    ...DEFAULT_TOC_OPTIONS,
    ...parseTocConfiguration(tocStartFinder.tocStart.value),
  };

  const filteredHeadings = tree.children.filter(
    (part) => part.type === 'heading' && isInRange(part.depth, tocConfiguration),
  );

  const toc = makeToc(buildNode('root', filteredHeadings)).map;
  tree.children.splice(tocStartFinder.tocStartIndex + 1, tocStartFinder.tocSize, toc);
};

export default () => transformer;
