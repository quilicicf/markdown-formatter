const { WATERMARK_VALUES, WATERMARK_TOP } = require('../../constants');

const addWatermarkInTocEnd = require('./addWatermarkInTocEnd');
const searchAndDestroyWatermarkTop = require('./searchAndDestroyWatermarkTop');

module.exports = watermarkType => (
  () => (
    (tree) => {
      searchAndDestroyWatermarkTop(tree);
      if (watermarkType === WATERMARK_VALUES.NONE) { return; }
      if (watermarkType === WATERMARK_VALUES.TOP) { tree.splice(0, 0, WATERMARK_TOP); }
      if (watermarkType === WATERMARK_VALUES.TOC) { addWatermarkInTocEnd(tree); }
    }
  )
);
