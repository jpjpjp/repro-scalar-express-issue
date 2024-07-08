if (process.env.NODE_ENV !== 'production') {
  require('source-map-support').install();
}
// import 'source-map-support/register';
import Express from 'express';
import type { Request, Response, NextFunction } from "express";

// Helper modules for rendering docs
import fs from 'fs';
import path from 'path';

// Scalar docs libraries
import { apiReference } from '@scalar/express-api-reference'



// Define the API Version we are servering
const API_VERSION = '/v2'

// Create the Express API Gateway
const app = Express();
app.use(Express.json());


/******************************************************************************
/*
/*              SET UP SOME BASIC IP RATE LIMITING
/*
/******************************************************************************/

import rateLimit from 'express-rate-limit';

// Define rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  handler: (_req: Request, res: Response, _next: NextFunction, options) => {
		res.status(options.statusCode).send({
      message: "Too Many Requests",
      errors: [{
        errMsg: options.message
      }]
    })
  }
});

// Apply rate limiter to all requests
app.use((req, res, next) => {
  limiter(req, res, next);
});



/******************************************************************************
/*
/*                   PASSPORT.JS and Session Middleware
/*
/******************************************************************************/

import { authenticateUser, passportSecurityHandler, passportCookieSecurityHandler } from "./middleware/authentication";
import passport from "passport";
import session from "express-session";

const MemoryStore = require("memorystore")(session);
app.use(
  session({
    secret: 'tempsecret',
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

authenticateUser(passport);
app.use(passport.initialize());
app.use(passport.session());


// Build the OpenAPI-Backend API router based on the spec
import OpenAPIBackend from 'openapi-backend';
import type { Context, Request as OpenAPIRequest} from 'openapi-backend';
import addFormats from 'ajv-formats';
let handlers = {}

// define v2 api based on OpenAPI spec
const api = new OpenAPIBackend({
  definition: "./public/sample-spec.yaml",
  apiRoot: API_VERSION,
  strict: true,
  // // Support string formats like date-time
  customizeAjv: (ajv) => {
    // TODO narrow down the list to just the types we want, ie: date, date-time
    addFormats(ajv);
    return ajv;
  },
  // We prefer to register handlers in the controllers
  handlers: handlers
});

export { api }
api.init();
// Register the passport.js security handler for bearer auth with openAPI router\
api.registerSecurityHandler("bearerSecurity", passportSecurityHandler);
api.registerSecurityHandler("cookieAuth", passportCookieSecurityHandler);

// Import controllers after api is initialized so they can register handlers
import "./v2/controllers/errors";
import "./v2/controllers/categories";
import "./v2/controllers/user";

// Main router
// If its a GET request for docs, serve it directly here
// Else pass it off to OpenAPIBackend
app.use((req, res, next) => {
    if ((req.method === 'GET') && 
      (req.path === `/` || req.path === `${API_VERSION}/docs` || req.path === `${API_VERSION}/docs/`)) {
      GenerateStoplightDocs(req, res);
      } else if ((req.method === 'GET') && 
      (req.path === `/` || req.path === `${API_VERSION}/docs-scalar` || req.path === `${API_VERSION}/docs/`)) {
      GenerateScalarDocs(req, res);
    } else if ((req.method === 'GET') && 
      (req.path === `${API_VERSION}/openapi` || req.path === `${API_VERSION}/openapi/`)) {
      const openApiSpec = fs.readFileSync(path.join(__dirname, '../public/sample-spec.yaml'), 'utf8');
      res.setHeader('Content-Type', 'text/plain'); 
      res.send(openApiSpec);
    } else {
      console.log('OpenAPIBackend handling v2 request');
      api.handleRequest(req as OpenAPIRequest, req, res);
    }
});


// This function simply serves up the static index.html file which is
// an Elements powered version of the OpenAPI generated documentation
function GenerateStoplightDocs(req: Express.Request, res: Express.Response) {
  const docsPath = path.join(__dirname, '../public/index.html');
  res.sendFile(docsPath);
}

function GenerateScalarDocs(req: Express.Request, res: Express.Response) {
  apiReference({
    spec: {
      url: 'http://localhost:3000/v2/openapi/',
    }
  });
}

export default app;

