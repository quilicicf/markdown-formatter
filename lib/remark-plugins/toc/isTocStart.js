import { TOC_START_MATCHER } from '../../constants.js';

export default (part) => part.type === 'html' && TOC_START_MATCHER.test(part.value);
