// Automatically Genenerate Types from OpenAPI spec - npm run gentypes
import type { Components, Paths } from '../types/sample-spec'

// Export types needed by the users endpoint
export type UserDTO = Components.Schemas.UserObject
export type getMeResponse = Paths.GetMe.Responses.$200