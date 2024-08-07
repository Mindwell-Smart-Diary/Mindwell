import { Request, Response, NextFunction } from "express";
import { loginUser } from "../../../../services/auth/auth.service";
import { TokenPairWithId } from "../../../../services/auth/types";
import { StatusCodes } from "http-status-codes";
import { loginSchema } from "./schema";

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const tokensWithId: TokenPairWithId = await loginUser(email, password);

    res.status(StatusCodes.OK).json(tokensWithId);
  } catch (e) {
    next(e);
  }
};
