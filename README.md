# Exchange API Server with Scalar Docs issue

This small repo was built to demonstrate an issue with using the scalar express-api-reference module to generate docs.

The project is a small node.js exchange server that demonstrates an API Design First approach to building an API service.

The API spec itself is in [./public/sample-spec.yaml](./public/sample-spec.yaml).

The bulk of the API server logic is in [./src/server.ts](./src/server.ts), where the following things happen:
- an Express server is instantiated
- rate limiting middleware is instantiatied
- passport.js and a memory store middleware are instantiated
- the [openapi-backend](https://openapistack.co/docs/openapi-backend/intro/) service is set up to provide parameter validation and routing to the API endpoints specified in the spec
  - passport.js security handlers are registered with the router
  - mock API service handlers are imported which implement and register handlers for the defined endpoints
- a high level `app.use` router is set up which does the following:
  - if the request is for the `/` or `v2/docs` endpoint, display the Stoplight Elements](https://github.com/stoplightio/elements) generated docs
  - if the request is for the `v2/docs-scalar` endpoint display the scalar generated docs
  - if the request is for the `v2/openapi` endpoint serve the sample-spec.yaml file
  - for any other endpoint, pass the request off to the openapi-backend router

## What is the issue?

On this first attempt to use the scalar express-api-reference we are finding that the request to http://localhost:3000/v2/docs-scalar never returns.  This repo was created so that someone from scalar can attempt to replicate

## Replicating the scalar documentation issue

1) Clone the repo
2) `npm -i` to set up dependencies
3) `npm run build-ts` to compile the typescript
4) `npm run` or `npm run dev` to start the server

Once started navigate to http://localhost:3000/.  This should show the Stoplight Elements generated documentation and will allow the user to use the "Send API Request" feature for various endpoints.

(Note, set the  Token to any 11 character string, ie: 1234567901)

Navigate to http://localhost:3000/v2/docs-scalar.  This will trigger the following code in [./src/server.ts](./src/server.ts):

```js
function GenerateScalarDocs(req: Express.Request, res: Express.Response) {
  apiReference({
    spec: {
      url: 'http://localhost:3000/v2/openapi/',
    }
  });
}
```

This request never generates a response.

I'm available for questions on the Scalar discord!

