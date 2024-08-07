import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError";

export class NotFoundError extends ApiError {
  constructor(extraDetails: string) {
    super(StatusCodes.NOT_FOUND, "Not found", extraDetails);
  }
}
