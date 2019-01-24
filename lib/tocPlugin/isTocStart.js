const getTocStartMatcher = require('./getTocStartMatcher');

module.exports = part => part.type === 'html' && getTocStartMatcher().test(part.value);
