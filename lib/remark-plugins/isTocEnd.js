const { TOC_END_MATCHER } = require('../constants');

module.exports = (part) => part.type === 'html' && TOC_END_MATCHER.test(part.value);
