/**
 * @param {string} url
 * @returns {string}
 */
const normalizeUrl = (url) => url.toLowerCase().replace(/^\/+|\/+$/g, '').trim();

module.exports = normalizeUrl;