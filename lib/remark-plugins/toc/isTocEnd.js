module.exports = part => part.type === 'html' && /^<!-- TOC END -->$/.test(part.value);
