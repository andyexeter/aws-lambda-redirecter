# AWS Lambda Redirecter

Used by AWS lambda functions to perform redirects

## Installation

```
yarn add @destination/aws-lambda-redirecter
```

## Usage

The default action is to redirect to a matching request URI in the given redirect map or redirect to the homepage if no
match is found.

```js
const Redirecter = require("./src/redirecter");

const redirecter = new Redirecter('https://example.org', {
    'foo': 'bar',
});

// 301 redirect response with Location set to https://example.org/bar
const response = redirecter.getResponse('foo');

// 301 redirect response with Location set to https://example.org
const response2 = redirecter.getResponse('baz');
```

## Configuration

Redirect as-is:

```js
const Redirecter = require("./src/redirecter");

const redirecter = new Redirecter('https://example.org', {
    'foo': 'bar',
}, 301, Redirecter.NOTFOUND_REDIRECT_AS_IS);

// 301 redirect response with Location set to https://example.org/baz
const response = redirecter.getResponse('baz');
```

Return 404:

```js
const Redirecter = require("./src/redirecter");

const redirecter = new Redirecter('https://example.org', {
    'foo': 'bar',
}, 301, Redirecter.NOTFOUND_RETURN_404);

// 404 response with body set to '404 Not Found'
const response = redirecter.getResponse('baz');
```

Change status code:

```js
const Redirecter = require("./src/redirecter");

const redirecter = new Redirecter('https://example.org', {
    'foo': 'bar',
}, 302);

// 302 redirect response with Location set to https://example.org/bar
const response = redirecter.getResponse('foo');
```

## Testing

Install dependencies:

```sh
docker run --rm -v "$PWD":/app -w /app node:14-alpine yarn install
````

Run tests:

```sh
docker run --rm -v "$PWD":/app -w /app node:14-alpine yarn test
```