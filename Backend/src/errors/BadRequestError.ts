import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError";

export class BadRequestError extends ApiError {
  constructor(extraDetails: string) {
    super(StatusCodes.BAD_REQUEST, "Bad request", extraDetails);
  }
}
