const normalizeUrl = require("./normalize-url");
const RedirectResponse = require("./redirect-response");
const Response = require("./response");

/**
 * @property {string} redirectDomain
 * @property {Object<string, string>} redirectMap
 * @property {number} statusCode
 * @property {Function|null} notFoundCallback
 */
class Redirecter {

    static get NOTFOUND_REDIRECT_AS_IS() {
        return 1;
    }

    static get NOTFOUND_REDIRECT_HOME() {
        return 2;
    }

    static get NOTFOUND_RETURN_404() {
        return 3;
    }

    /**
     * @param {string} redirectDomain
     * @param {Object<string, string>} redirectMap
     * @param {number} statusCode
     * @param {number} notFoundAction
     */
    constructor(redirectDomain, redirectMap, statusCode = 301, notFoundAction = Redirecter.NOTFOUND_REDIRECT_HOME) {
        this.redirectDomain = normalizeUrl(redirectDomain);

        this.redirectMap = {};
        Object.keys(redirectMap).forEach((k) => {
            this.redirectMap[normalizeUrl(k)] = normalizeUrl(redirectMap[k]);
        });

        this.statusCode = statusCode;

        if (![Redirecter.NOTFOUND_REDIRECT_AS_IS, Redirecter.NOTFOUND_REDIRECT_HOME, Redirecter.NOTFOUND_RETURN_404].includes(notFoundAction)) {
            notFoundAction = Redirecter.NOTFOUND_REDIRECT_HOME
        }

        this.notFoundAction = notFoundAction;
    }

    /**
     * @param {string} requestUri
     */
    getResponse(requestUri) {
        let requestUriToCheck = normalizeUrl(requestUri);

        if (this.redirectMap.hasOwnProperty(requestUriToCheck)) {
            return new RedirectResponse(`${this.redirectDomain}/${this.redirectMap[requestUriToCheck]}`, this.statusCode);
        }

        if (this.notFoundAction === Redirecter.NOTFOUND_REDIRECT_AS_IS) {
            return new RedirectResponse(`${this.redirectDomain}/${requestUriToCheck}`, this.statusCode);
        }

        if (this.notFoundAction === Redirecter.NOTFOUND_RETURN_404) {
            return new Response('404 Not Found', 404);
        }

        return new RedirectResponse(this.redirectDomain, this.statusCode);

    }
}

module.exports = Redirecter;