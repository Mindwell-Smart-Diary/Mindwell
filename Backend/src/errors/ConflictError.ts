import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError";

export class ConflictError extends ApiError {
  constructor(extraDetails: string) {
    super(StatusCodes.CONFLICT, "Conflict", extraDetails);
  }
}
