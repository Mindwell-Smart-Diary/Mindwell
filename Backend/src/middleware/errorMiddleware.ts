import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../errors/ApiError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message);

  if (err instanceof ApiError) {
    res.status(err.httpStatusCode).json(err.apiError.extraDetails);
  } else {
    console.error("Unknown error occurred");
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
