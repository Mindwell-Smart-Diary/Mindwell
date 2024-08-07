import { Request, Response, NextFunction } from "express";
import { logoutUser } from "../../../../services/auth/auth.service";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../../prisma/prismaClient";

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  try {
    await logoutUser(prisma, refreshToken);

    res.sendStatus(StatusCodes.OK);
  } catch (e) {
    next(e);
  }
};
