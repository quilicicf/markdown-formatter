const { TOC_START_MATCHER } = require('../../constants');

module.exports = (part) => part.type === 'html' && TOC_START_MATCHER.test(part.value);
