import type { Context } from "openapi-backend";
import type { Request, Response } from "express";
import type { UserDTO } from "../types/user"
import { api } from '../../server';

// Register the handler based on the OpenAPI OperationId
api.register("getMe", getMeHandler);

async function getMeHandler(
  _c: Context,
  _req: Request,
  res: Response
): Promise<Response> {
  // Mock user response
  const theUser = {
    user_name: 'User 1',
    user_email: 'user-1@sample.dev',
    user_id: 18328,
    account_id: 18221,
  }

  const response: UserDTO = {
    ...theUser,
  };

  return Promise.resolve(res.status(200).json(response));
}

