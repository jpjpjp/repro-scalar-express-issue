import type { Context} from "openapi-backend";
import { ErrorObject } from 'ajv';
import type { Request, Response } from "express";
import { api } from '../../server';
import {
    ErrorResponse,
    UnauthorizedResponse,

} from "../types/errors"

// Register the handlers for the various error responses
api.register("validationFail", returnValidationFailure);
api.register("notFound", returnNotFoundFailure)
api.register("unauthorizedHandler", returnUnauthorizedFailure)


async function returnValidationFailure(
    c: Context,
    _req: Request,
    res: Response
  ): Promise<Response> {
    let response:ErrorResponse = buildRequestValidationError(c.validation.errors);
    return Promise.resolve(res.status(400).json({...response}));
}

async function returnNotFoundFailure(
    c: Context,
    _req: Request,
    res: Response
  ): Promise<Response> {
    // TODO massage OpenAPI Generator validation response into the
    // LM standard error response
    return Promise.resolve(res.status(404).json({ err: 'not found' }));
}

async function returnUnauthorizedFailure(
    c: Context,
    _req: Request,
    res: Response
  ): Promise<Response> {
    // TODO massage OpenAPI Generator validation response into the
    // LM standard error response
    let response:UnauthorizedResponse = {
      "message": "Unauthorized",
      "errors": [{
        errMsg: c.security.bearerSecurity.error.errMsg
      }]
    };
    return Promise.resolve(res.status(401).json(response));
}

// TODO - check OpenAPI docs to see if there are other handlers we want
// eg - maybe in non production mode we want to validate responses?

/*
   Helper functions to standardize error responses with potentially
   multiple errors

   TODO: Create a catalog of standard error responses?
*/
function buildRequestValidationError(errors: ErrorObject<string, Record<string, any>, unknown>[]): ErrorResponse {
  return {
    message: "Request Validation Failure",
    errors: errors.map(({ message: errMsg, ...rest }) => ({ errMsg, ...rest })),
  };
}

export function buildInvalidRequestError(errResponse, message, errMsg) {
    if (Object.keys(errResponse).length === 0) {
      errResponse.message = message;
      errResponse.errors = [{ errMsg: errMsg }];
    } else {
      if (!errResponse.hasOwnProperty('errors')) {
        errResponse.errors = [];
      }
      errResponse.errors.push({ errMsg: errMsg });
    }
    return errResponse
  }
  
export function buildInvalidRequestBodyError(errResponse, errMsg) {
    return buildInvalidRequestError(errResponse, "Invalid Request Body", errMsg);
  }
  
export function buildServerError(errMsg = "") {
  let response =  {
    message: "Internal Server Error",
    errors: [{
      errMsg: 'Operation error occurred. Please try again or contact ' +
              'support@lunchmoney.app for assistance.'
      // TODO, could we add more info here?  Is there a session id?
      // Maybe we could pass in the user object and function that was called?
    }]
  }
  if (errMsg.length > 0) {
    response.errors.push({
      errMsg: errMsg
    })
  }
  return response
}  