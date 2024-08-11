import { PrismaClient, PrismaPromise, users } from "@prisma/client";

export type suggestionByMood = {
  id: number;
  title: string;
  rank: number;
  execution_date: Date;
};

export const getUser = async (prisma: PrismaClient, userId: number) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      include: {
        refresh_tokens: true,
      },
    });

    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const findByEmail = async (prisma: PrismaClient, email: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      include: {
        refresh_tokens: true,
      },
    });

    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateRefreshToken = async (
  prismaClient: PrismaClient,
  userId: number,
  refreshToken: string,
  oldRefreshToken?: string
) => {
  const actions: PrismaPromise<any>[] = [
    prismaClient.user_refresh_tokens.create({
      data: {
        user_id: userId,
        refresh_token: refreshToken,
      },
    }),
  ];

  if (oldRefreshToken) {
    actions.push(
      prismaClient.user_refresh_tokens.deleteMany({
        where: {
          user_id: userId,
          refresh_token: oldRefreshToken,
        },
      })
    );
  }

  await prismaClient.$transaction(actions);
};

export const revokeRefreshToken = async (
  prismaClient: PrismaClient,
  userId: number,
  refreshToken: string
) => {
  await prismaClient.user_refresh_tokens.deleteMany({
    where: {
      user_id: userId,
      refresh_token: refreshToken,
    },
  });
};

export const resetRefreshTokens = async (
  prismaClient: PrismaClient,
  userId: number
) => {
  await prismaClient.user_refresh_tokens.deleteMany({
    where: {
      user_id: userId,
    },
  });
};
