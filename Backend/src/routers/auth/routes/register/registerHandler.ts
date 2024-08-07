import { Request, Response, NextFunction } from "express";
import {
  loginUser,
  registerUser,
} from "../../../../services/auth/auth.service";
import { TokenPairWithId } from "../../../../services/auth/types";
import { StatusCodes } from "http-status-codes";
import { registerSchema } from "./schema";
import { prisma } from "../../../../prisma/prismaClient";

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, firstName, lastName, gender, birthdate } =
      registerSchema.parse(req.body);

    const tokensWithId: TokenPairWithId = await registerUser(
      prisma,
      email,
      password,
      firstName,
      lastName,
      gender,
      new Date(birthdate)
    );

    res.status(StatusCodes.CREATED).json(tokensWithId);
  } catch (e) {
    next(e);
  }
};
