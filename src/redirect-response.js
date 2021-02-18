const Response = require('./response');

/**
 * @property {Object<string, string>} headers
 * @property {number} statusCode
 */
class RedirectResponse extends Response {
    /**
     * @param {string} url
     * @param {number} statusCode
     * @param {Object<string, string>} headers
     */
    constructor(url, statusCode = 301, headers = {}) {
        super('', statusCode, headers);
        this.headers['Location'] = url;
    }
}

module.exports = RedirectResponse;