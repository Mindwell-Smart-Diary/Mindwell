import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/BadRequestError";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(
          (issue: any) => `${issue.path.join(".")} is ${issue.message}`
        );

        throw new BadRequestError(
          `Invalid field(s): ${errorMessages.join(", ")}`
        );
      } else {
        throw error;
      }
    }
  };
}
