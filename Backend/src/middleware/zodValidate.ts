import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

import { BadRequestError } from "../errors/BadRequestError";

export function validateData(
  schema: z.ZodObject<any, any>,
  data: Record<string, unknown>,
  message?: string
) {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.errors.map(
        (issue: any) => `${issue.path.join(".")} is ${issue.message}`
      );

      throw new BadRequestError(
        `${message ?? "Invalid field(s)"}: ${errorMessages.join(", ")}`
      );
    } else {
      throw error;
    }
  }
}

export function validateDataMiddleware(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    validateData(schema, req.body);
    next();
  };
}
