// Import Automatically Genenerate Types from OpenAPI spec - npm run gentypes
import type { Components, Paths } from '../types/sample-spec'

// Manually export the default error types
export type ErrorResponse = Components.Schemas.ErrorResponseObject;
export type UnauthorizedResponse = Components.Responses.UnauthorizedToken;
