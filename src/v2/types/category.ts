// Import Automatically Genenerate Types from OpenAPI spec - npm run gentypes
import type { Components, Paths } from '../types/sample-spec'

// Manually export the types relevant to the /categories endpoint
export type categoryObject = Components.Schemas.CategoryObject
export type categoryGroupObject = Components.Schemas.CategoryGroupObject

// Get All Categories 
export type getAllCategoriesParams = Paths.GetAllCategories.QueryParameters
export type getAllCategoriesResponse = Paths.GetAllCategories.Responses.$200

// Get Category By ID
export type getCategoryPathParameters = Paths.GetCategoryById.PathParameters
export type getCategoryResponse = Paths.GetCategoryById.Responses.$200
export type getCategoryNotFoundResponse = Paths.GetCategoryById.Responses.$404

