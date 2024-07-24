import { Chance } from "chance";
import { prisma } from "../../prisma/prismaClient";
import { users } from "@prisma/client";

const chance = new Chance();

export const createUser = (base: Partial<users> = {}) => {
  return prisma.users.create({
    data: {
      first_name: chance.name(),
      last_name: chance.name(),
      birthdate: chance.date({
        american: false,
      }),
      email: chance.email(),
      gender: chance.pickone(["male", "female"]),
      password: chance.word(),
      ...base,
    },
  });
};
