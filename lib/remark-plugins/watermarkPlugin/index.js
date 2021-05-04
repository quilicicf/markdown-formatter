import { WATERMARK_TOP, WATERMARK_VALUES } from '../../constants';

import addWatermarkInTocEnd from './addWatermarkInTocEnd';
import searchAndDestroyWatermarkTop from './searchAndDestroyWatermarkTop';

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
