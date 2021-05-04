import isTocEnd from '../isTocEnd.js';
import { WATERMARK_TOC } from '../../constants.js';

export default (tree) => {
  const tocEnd = tree.children.find((part) => isTocEnd(part));
  if (tocEnd) { tocEnd.value = WATERMARK_TOC; }
};
