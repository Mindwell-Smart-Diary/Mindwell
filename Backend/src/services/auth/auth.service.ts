import { JwtPayload, Secret } from "jsonwebtoken";
import { Gender, PrismaClient, users } from "@prisma/client";
import { ApiError } from "../../errors/ApiError";
import { BadRequestError } from "../../errors/BadRequestError";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { prisma } from "../../prisma/prismaClient";
import {
  findByEmail,
  getUser,
  resetRefreshTokens,
  revokeRefreshToken,
  updateRefreshToken,
} from "../../repository/users.repository";
import { createTokens } from "./tokens";
import { TokenPair, TokenPairWithId } from "./types";
import bcrypt from "bcrypt";
import { ConflictError } from "../../errors/ConflictError";
import { jwtVerify } from "../../utils/jwtVerify";

export const loginUser = async (
  email: string,
  password: string
): Promise<TokenPairWithId> => {
  try {
    const user = await findByEmail(prisma, email);

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedError("email or password incorrect");
    }

    const tokens = await createTokens(user);
    await updateRefreshToken(prisma, user.id, tokens.refreshToken);

    return { id: user.id, ...tokens };
  } catch (e) {
    if (e instanceof ApiError) throw e;
    throw new UnauthorizedError("email or password incorrect");
  }
};

export const registerUser = async (
  prismaClient: PrismaClient,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  gender: Gender,
  birthdate: Date
): Promise<TokenPairWithId> => {
  try {
    findByEmail(prismaClient, email);
    throw new ConflictError("username already exists");
  } catch (e) {
    if (!(e instanceof ConflictError)) throw e;
  }

  // Save the new user
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user: users = await prismaClient.users.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      gender,
      birthdate,
      password: encryptedPassword,
      email,
    },
  });

  // Login
  const tokens = await createTokens(user);
  await updateRefreshToken(prismaClient, user.id, tokens.refreshToken);

  return { id: user.id, ...tokens };
};

export const logoutUser = async (
  prismaClient: PrismaClient,
  refreshToken: string
): Promise<void> => {
  if (!refreshToken) {
    throw new BadRequestError("Missing Authorization header");
  }

  const userInfo = (await jwtVerify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as Secret
  )) as JwtPayload;

  const userId: number = (userInfo as JwtPayload).id;
  const user = await getUser(prismaClient, userId);

  if (!user) {
    throw new UnauthorizedError("Could not find user");
  }

  if (
    !user.refresh_tokens
      .map(({ refresh_token }) => refresh_token)
      .includes(refreshToken)
  ) {
    console.log("Refresh token doesn't exist, clearing all tokens");

    await resetRefreshTokens(prismaClient, userId);
    throw new UnauthorizedError("Unknown refresh token");
  }

  await revokeRefreshToken(prismaClient, userId, refreshToken);
};

export const refreshAccessTokens = async (
  prismaClient: PrismaClient,
  refreshToken: string
): Promise<TokenPair> => {
  if (!refreshToken) {
    throw new BadRequestError("Missing Authorization header");
  }

  const userInfo = (await jwtVerify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as Secret
  )) as JwtPayload;

  const userId: number = (userInfo as JwtPayload).id;
  const user = await getUser(prismaClient, userId);

  if (!user) {
    throw new UnauthorizedError("Could not find user");
  }

  if (
    !user.refresh_tokens
      .map(({ refresh_token }) => refresh_token)
      .includes(refreshToken)
  ) {
    console.log("Refresh token doesn't exist, clearing all tokens");

    await resetRefreshTokens(prismaClient, userId);
    throw new UnauthorizedError("Unknown refresh token");
  }

  const { accessToken, refreshToken: newRefreshToken } = await createTokens(
    user
  );
  await updateRefreshToken(prismaClient, userId, newRefreshToken, refreshToken);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};
