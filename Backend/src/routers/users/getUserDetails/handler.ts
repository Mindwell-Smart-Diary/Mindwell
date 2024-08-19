import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../middleware/auth";
import { NotFoundError } from "../../../errors/NotFoundError";
import { prisma } from "../../../prisma/prismaClient";

export const userDetailsHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.user;

  try {
    if (userId !== Number(req.params.id)) {
      throw new NotFoundError("Could not find requested user");
    }

    const a = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        birthdate: true,
        email: true,
        gender: true,
      },
    });

    res.json(a);
  } catch (e) {
    next(e);
  }
};
