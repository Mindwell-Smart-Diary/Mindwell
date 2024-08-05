import { PrismaClient, PrismaPromise, users } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";
import { Configuration } from "../../config/Configuration";

export const createTokens = async (user: users) => {
  const { JWT_EXPIRATION, JWT_REFRESH_SECRET, JWT_SECRET } =
    Configuration.getInstance();

  const accessToken = jwt.sign({ id: user.id }, JWT_SECRET as Secret, {
    expiresIn: JWT_EXPIRATION / 1000,
  });

  const refreshToken = jwt.sign(
    { id: user.id, random: Math.random() },
    JWT_REFRESH_SECRET as Secret
  );

  return {
    accessToken,
    refreshToken,
  };
};
