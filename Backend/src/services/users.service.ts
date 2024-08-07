import { PrismaClient, users } from "@prisma/client";
import { getUser } from "../repository/users.repository";

export const getUserById = async (
  prisma: PrismaClient,
  userId: number
): Promise<users> => getUser(prisma, userId);

export const getUserAge = (user: users): number =>
  new Date().getFullYear() - new Date(user.birthdate).getFullYear();
