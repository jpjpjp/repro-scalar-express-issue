import type { Context } from "openapi-backend";
import type { Request, Response } from "express";
import { api } from '../../server';
import { 
  buildInvalidRequestError, 
  buildServerError
} from './errors'

// /categories endpoint types generated from OpenAPI spec
import {
  categoryObject,
  categoryGroupObject,

  // GET /categories
  getAllCategoriesParams,
  getAllCategoriesResponse,
  // GET /categories/{category_id}
  getCategoryPathParameters,
  getCategoryResponse,
  getCategoryNotFoundResponse,
} from "../types/category";

// Import the mock categories
import { mockCategories } from '../mock_data/categoriesMockData';

// Register the handlers based on the OpenAPI OperationId
api.register("getAllCategories", geAllCategoriesHandler);
api.register("getCategoryById", getSingleCategory)

// Handler for GET /categories

async function geAllCategoriesHandler(
  c: Context <getAllCategoriesParams>,
  _req: Request,
  res: Response
): Promise<Response> {
  try {
    const { 
      format, 
      ids
    } = c.request.query;
    let filter_ids: number[] = [];

    const { 
      hydrate_children: hydrateParam
    } = c.request.query;
    const hydrate_children = (hydrateParam as string)?.toLowerCase() === 'true';

    // Get the ids to filter on - validation insures they are numbers
    let theCategories = {
      categories: [] as (categoryObject | categoryGroupObject)[]
    }

    // Simulate database lookups
    if (ids) {
      // return just the requested categoryIds
      filter_ids = (Array.isArray(ids) ? ids : [ids]).map(id => Number(id));
      for (let i = 0; i < filter_ids.length; i++) {
        const id = filter_ids[i];
        let category = null;
        category = mockCategories.getCategoryById(id);
        if (category) {
          if (hydrate_children && category?.children?.length > 0) {
            const hydratedChildren = 
              mockCategories.generateHydratedChildren(category.children || []);
            theCategories.categories.push({ ...category, hydrated_children: hydratedChildren });
          } else {
            theCategories.categories.push(category);
          }
        }
      }
    } else if (format && format === 'nested') {
      theCategories.categories = mockCategories.generateNestedCategories(hydrate_children);
    } else {
      theCategories.categories = mockCategories.generateFlattenedCategories();
    }

    const response: getAllCategoriesResponse = { ...theCategories };
    return Promise.resolve(res.status(200).json(response));
  } catch (e) {
    console.log(`[API error for GET /categories`, e)
    return Promise.resolve(res.status(500).json(buildServerError(e.msg)));
  }
}

// Handler for GET /categories/:id
async function getSingleCategory(
  c: Context <getCategoryPathParameters>,
  _req: Request,
  res: Response
): Promise<Response> {
  try {
    // Read in path and query parameters
    const { id } = c.request.params;
    const categoryId = parseInt(Array.isArray(id) ? id[0] : id);

    let theCategory = mockCategories.getCategoryById(categoryId);
    let errResponse = {} as getCategoryNotFoundResponse; 

    if (theCategory === null) {
      // Return 404 if the specified category id does not exist
      errResponse = buildInvalidRequestError(errResponse,
        "Not Found",
        `There is no category with the id:'${categoryId}'`)
      const response: getCategoryNotFoundResponse = {...errResponse}
      return Promise.resolve(res.status(404).json(response));
    }
  
    const response: getCategoryResponse = { ...theCategory };
    return Promise.resolve(res.status(200).json(response));
  } catch (e) {
    console.log(`API error for GET /categories/${c.request.params.id}`, e)
    return Promise.reject(res.status(500));
  }
}

