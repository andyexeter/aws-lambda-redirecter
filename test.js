const test = require('ava');
const Redirecter = require("./src/redirecter");
const Response = require("./src/response");
const RedirectResponse = require("./src/redirect-response");

test('Default redirect', t => {
    const redirectMap = {
        'foo': 'bar'
    };
    const redirecter = new Redirecter('https://example.org', redirectMap);

    const response = redirecter.getResponse('foo');

    t.true(response instanceof RedirectResponse);
    t.is(response.headers.Location, 'https://example.org/bar');
    t.is(response.statusCode, 301);
});

test('Home redirect', t => {
    const redirectMap = {
        'foo': 'bar'
    };
    const redirecter = new Redirecter('https://example.org', redirectMap);

    const response = redirecter.getResponse('baz');

    t.true(response instanceof RedirectResponse);
    t.is(response.headers.Location, 'https://example.org');
    t.is(response.statusCode, 301);
});

test('As is redirect', t => {
    const redirectMap = {
        'foo': 'bar'
    };
    const redirecter = new Redirecter('https://example.org', redirectMap, 301, Redirecter.NOTFOUND_REDIRECT_AS_IS);

    const response = redirecter.getResponse('baz');

    t.true(response instanceof RedirectResponse);
    t.is(response.headers.Location, 'https://example.org/baz');
    t.is(response.statusCode, 301);
});

test('Return 404', t => {
    const redirectMap = {
        'foo': 'bar'
    };
    const redirecter = new Redirecter('https://example.org', redirectMap, 301, Redirecter.NOTFOUND_RETURN_404);

    const response = redirecter.getResponse('baz');

    t.true(response instanceof Response);
    t.false(response instanceof RedirectResponse);
    t.is(response.body, '404 Not Found');
    t.is(response.statusCode, 404);
});