/**
 * @property {string} body
 * @property {number} statusCode
 * @property {Object<string, string>} headers
 */
class Response {
    /**
     *
     * @param {string} body
     * @param {number} statusCode
     * @param {Object<string, string>} headers
     */
    constructor(body = '', statusCode = 200, headers = {}) {
        this.body = body;
        this.statusCode = statusCode;
        this.headers = headers;
    }
}

module.exports = Response;