import { PrismaClient, PrismaPromise, users } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";

export const createTokens = async (user: users) => {
  const accessToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET as Secret,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  const refreshToken = jwt.sign(
    { id: user.id, random: Math.random() },
    process.env.JWT_REFRESH_SECRET as Secret
  );

  return {
    accessToken,
    refreshToken,
  };
};
