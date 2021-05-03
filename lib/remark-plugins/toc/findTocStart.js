import isTocStart from './isTocStart';
import isTocEnd from '../isTocEnd';

export default (tree) => tree.children.reduce(
  (seed, part) => {
    if (seed.tocStart && !seed.isInToc) { return seed; }
    if (isTocEnd(part)) { return { ...seed, isInToc: false }; }
    if (isTocStart(part)) {
      return {
        ...seed,
        tocStart: part,
        tocStartIndex: seed.tocStartIndex,
        isInToc: true,
      };
    }

    return seed.isInToc
      ? { ...seed, tocContent: [ ...seed.tocContent, part ], tocSize: seed.tocSize + 1 }
      : { ...seed, tocStartIndex: seed.tocStartIndex + 1 };
  },
  {
    tocStartIndex: 0,
    tocSize: 0,
    tocStart: undefined,
    tocContent: [],
    isInToc: false,
  },
);
