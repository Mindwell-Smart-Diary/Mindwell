import { events } from "@prisma/client";
import { prisma } from "../../prisma/prismaClient";
import { Chance } from "chance";
import { Mood } from "../../models/enums/mood.enum";

const chance = new Chance();

export const createEvent = (userId: number, base: Partial<events> = {}) => {
  return prisma.events.create({
    data: {
      user_id: userId,
      content: chance.paragraph(),
      date: chance.date({ american: false }),
      mood: chance.pickone(Object.values(Mood)),
      title: chance.sentence(),
      ...base,
    },
  });
};
