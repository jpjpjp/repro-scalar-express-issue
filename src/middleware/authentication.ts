import type { Context } from "openapi-backend";
import type { Request, Response } from "express";
const passport = require('passport')
const BearerStrategy = require('passport-http-bearer').Strategy

export const authenticateUser = (passport) => {
  /**
   * Authenticating with Bearer token for developer API
   */
  passport.use(
    new BearerStrategy(async function (token, done) {
      if (token?.length > 10) {
        return done(null, {
          user_name: 'User 1',
          user_email: 'user-1@sample.dev',
          user_id: 18328,
          account_id: 18221,
        })
      } else {
        return done(null, false)
      }
    }),
  )
}


// This is essentially the same as the expressAuthentication handler below
// that was working in the tsoa version of this server, modified by:
// 1) Changing the signature to accept the OpenAPI backend context
// 2) It doesn't need to check the security type because this handler
//    is registered explicitly for "bearerSecurity" in server.ts
export function passportSecurityHandler(
  c: Context,
  request: Request,
  _res: Response
): Promise<any> {
  const authHeader = c.request.headers["authorization"];
  if (!authHeader) {
    return Promise.reject({
      authorized: false,
      errMsg: 'Missing authorization header'
    })
  }
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'bearer',
      { session: false },
      function (err, user, info) {
        if (err) {
          return reject(err)
        }
        if (!user) {
          //  return reject(new Error('Access token does not exist.'))
          return reject({
            authorized: false,
            errMsg: 'Access token does not exist.'
          })
        }
        console.log(`[Received] ${request.method} ${request.url}`, {
          ...request.body,
          ...request.query,
          access_token: null,
        })
        request.user = user;

        return resolve(user)
      },
    )(request)
  })
}

export function passportCookieSecurityHandler(
  c: Context,
  request: Request,
  _res: Response
): Promise<any> {
  const token = c.request.cookies["_lm_access_token"];
  if (!token) {
    return Promise.reject({
      authorized: false,
      errMsg: 'No supplied authorization token'
    })
  }

  // Implement a real JWT/session handler here...
  let user = {
    user_name: 'User 1',
    user_email: 'user-1@sampl.dev',
    user_id: 18328,
    account_id: 18221,
    budget_name: '🏠 Family budget',
    api_key_label: 'Side project dev key',
    primary_currency: 'usd',
  };
  console.log(`[Received] ${request.method} ${request.url}`, {
    ...request.body,
    ...request.query,
    access_token: null,
  })
  request.user = user;

  return Promise.resolve(user)
}

