const { WATERMARK_VALUES, WATERMARK_TOP } = require('../../constants');

const addWatermarkInTocEnd = require('./addWatermarkInTocEnd');
const searchAndDestroyWatermarkTop = require('./searchAndDestroyWatermarkTop');

module.exports = watermarkType => (
  () => (
    (tree, file) => {
      searchAndDestroyWatermarkTop(tree, file);
      if (watermarkType === WATERMARK_VALUES.NONE) { return; }
      if (watermarkType === WATERMARK_VALUES.TOP) { tree.children.splice(0, 0, { type: 'html', value: WATERMARK_TOP }); }
      if (watermarkType === WATERMARK_VALUES.TOC) { addWatermarkInTocEnd(tree); }
    }
  )
);
