import { WATERMARK_TOP, WATERMARK_VALUES } from '../../constants.js';

import addWatermarkInTocEnd from './addWatermarkInTocEnd.js';
import searchAndDestroyWatermarkTop from './searchAndDestroyWatermarkTop.js';

export default (watermarkType) => (
  () => (
    (tree, file) => {
      searchAndDestroyWatermarkTop(tree, file);
      if (watermarkType === WATERMARK_VALUES.NONE) { return; }
      if (watermarkType === WATERMARK_VALUES.TOP) { tree.children.splice(0, 0, { type: 'html', value: WATERMARK_TOP }); }
      if (watermarkType === WATERMARK_VALUES.TOC) { addWatermarkInTocEnd(tree); }
    }
  )
);
