import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../middleware/auth";
import { NotFoundError } from "../../../errors/NotFoundError";
import { prisma } from "../../../prisma/prismaClient";
import { userPatchSchema } from "./schema";
import { BadRequestError } from "../../../errors/BadRequestError";

export const patchUserHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.user;

  try {
    const patch = userPatchSchema.parse(req.body);

    if (userId !== Number(req.params.id)) {
      throw new NotFoundError("Could not find requested user");
    }

    if (Object.keys(patch ?? {}).length === 0) {
      throw new BadRequestError("Patch body cannot be empty");
    }

    const a = await prisma.users.update({
      where: {
        id: userId,
      },
      data: patch,
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
