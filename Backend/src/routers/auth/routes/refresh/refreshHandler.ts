import { Request, Response, NextFunction } from "express";
import { refreshAccessTokens } from "../../../../services/auth/auth.service";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../../prisma/prismaClient";

export const refreshHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  const refreshToken = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  try {
    const newTokensWithId = await refreshAccessTokens(prisma, refreshToken);

    res.status(StatusCodes.OK).json(newTokensWithId);
  } catch (e) {
    next(e);
  }
};
