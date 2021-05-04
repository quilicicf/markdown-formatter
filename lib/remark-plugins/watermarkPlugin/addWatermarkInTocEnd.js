import isTocEnd from '../isTocEnd';
import { WATERMARK_TOC } from '../../constants';

export default (tree) => {
  const tocEnd = tree.children.find((part) => isTocEnd(part));
  if (tocEnd) { tocEnd.value = WATERMARK_TOC; }
};
