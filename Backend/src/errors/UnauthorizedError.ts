import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError";

export class UnauthorizedError extends ApiError {
  constructor(extraDetails: string) {
    super(StatusCodes.UNAUTHORIZED, "Unauthorized", extraDetails);
  }
}
