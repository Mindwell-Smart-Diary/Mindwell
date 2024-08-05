import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Configuration } from "../../config/Configuration";
import { testAxios } from "../../testUtils/axiosInstance";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../prisma/prismaClient";
import { Chance } from "chance";
import { createUser } from "../../testUtils/entityBuilders/users";
import { createEvent } from "../../testUtils/entityBuilders/events";
import { events, users } from "@prisma/client";
import { Mood } from "../../models/enums/mood.enum";
import { USER_ID } from "./moodRouterTestData";

const { PORT } = Configuration.getInstance();

const getMoodsCalendar = async (queryParams: Record<string, string>) => {
  const queryParamsString = new URLSearchParams(queryParams).toString();
  const res = await testAxios.get(
    `http://localhost:${PORT}/moods/calendar?${queryParamsString}`,
    {
      headers: {
        Authorization: "Bearer " + process.env.TESTS_ACCESS_TOKEN,
      },
    }
  );

  return {
    status: res.status,
    data: res.data,
  };
};

const chance = new Chance();

describe("Moods router", () => {
  describe("Get moods calendar", () => {
    describe("Should validate query params", () => {
      it("Should throw error when missing month", async () => {
        const response = await getMoodsCalendar({ year: "2024" });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.data).toBe("Invalid query params: month is Required");
      });

      it("Should throw error when missing year", async () => {
        const response = await getMoodsCalendar({ month: "1" });

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.data).toBe("Invalid query params: year is Required");
      });

      it.each([
        [
          "30",
          "Invalid query params: month is Number must be less than or equal to 12",
        ],
        [
          "0",
          "Invalid query params: month is Number must be greater than or equal to 1",
        ],
        [
          "string",
          "Invalid query params: month is Expected number, received string",
        ],
      ])(
        "Should throw error when for invalid month (%s)",
        async (month, error) => {
          const response = await getMoodsCalendar({ month, year: "2024" });

          expect(response.status).toBe(StatusCodes.BAD_REQUEST);

          expect(response.data).toBe(error);
        }
      );

      it.each([
        [
          "-19",
          "Invalid query params: year is Number must be greater than or equal to 0",
        ],
        [
          "string",
          "Invalid query params: year is Expected number, received string",
        ],
      ])(
        "Should throw error when for invalid year (%s)",
        async (year, error) => {
          const response = await getMoodsCalendar({ month: "2", year });

          expect(response.status).toBe(StatusCodes.BAD_REQUEST);

          expect(response.data).toBe(error);
        }
      );
    });

    describe("Should return data", () => {
      let preMadeUser: users;
      let preMadeEvents: events[];

      beforeEach(async () => {
        [preMadeUser, ...preMadeEvents] = await prisma.$transaction([
          createUser({ id: USER_ID }),
          ...[...Array(200)].map(() =>
            createEvent(USER_ID, {
              date: chance.date({ american: false, year: 2024 }) as Date,
            })
          ),
        ]);
      });

      afterEach(async () => {
        await prisma.$transaction([
          prisma.events.deleteMany({
            where: { user_id: USER_ID },
          }),
          prisma.users.delete({
            where: {
              id: USER_ID,
            },
          }),
        ]);
      });

      it("Should return correct moods", async () => {
        const response = await getMoodsCalendar({ year: "2024", month: "10" });

        const EXPECTED = preMadeEvents
          .filter(
            ({ date }) =>
              new Date(date).getFullYear() === 2024 &&
              new Date(date).getMonth() == 9
          )
          .reduce<Record<string, Mood[]>>((finalRes, currEvent) => {
            const day = new Date(currEvent.date).getDate();
            if (!finalRes[day]) {
              finalRes[day] = [];
            }

            finalRes[day].push(currEvent.mood as Mood);

            return finalRes;
          }, {});

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.data).toStrictEqual(EXPECTED);
      });
    });
  });
});
