import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Configuration } from "../../config/Configuration";
import { testAxios } from "../../testUtils/axiosInstance";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../prisma/prismaClient";
import { Chance } from "chance";
import { createEvent } from "../../testUtils/entityBuilders/events";
import { events, users } from "@prisma/client";
import { LOGGED_IN_USER_ID } from "../../../vitest-api-setup";

const { PORT } = Configuration.getInstance();

const getEvents = async (queryParams: Record<string, string>) => {
  const queryParamsString = new URLSearchParams(queryParams).toString();
  const res = await testAxios.get(
    `http://localhost:${PORT}/events?${queryParamsString}`,
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

describe("Events router", () => {
  describe("Get events", () => {
    describe("Should validate query params", () => {
      it("Should throw error when missing data", async () => {
        const response = await getEvents({});

        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        expect(response.data).toBe("Invalid query params: date is Required");
      });

      it.each([
        [
          "30.1",
          "Invalid query params: date is Expected integer, received float",
        ],
        [
          "string",
          "Invalid query params: date is Expected number, received string",
        ],
      ])(
        "Should throw error when for invalid date (%s)",
        async (date, error) => {
          const response = await getEvents({ date });

          expect(response.status).toBe(StatusCodes.BAD_REQUEST);

          expect(response.data).toBe(error);
        }
      );
    });

    describe("Should return data", () => {
      let preMadeUser: users;
      let preMadeEvents: events[];

      beforeEach(async () => {
        preMadeEvents = await prisma.$transaction(
          [...Array(200)].map(() =>
            createEvent(LOGGED_IN_USER_ID, {
              date: chance.date({ american: false, year: 2024 }) as Date,
            })
          )
        );
      });

      afterEach(async () => {
        prisma.users.delete({
          where: {
            id: LOGGED_IN_USER_ID,
          },
        });
      });

      it("Should return correct events", async () => {
        const date = chance.pickone(preMadeEvents.map(({ date }) => date));

        const response = await getEvents({ date: date.getTime().toString() });

        const EXPECTED = preMadeEvents
          .filter(
            ({ date: currDate }) =>
              new Date(currDate).getFullYear() === date.getFullYear() &&
              new Date(currDate).getMonth() == date.getMonth() &&
              new Date(currDate).getDate() === date.getDate()
          )
          .map(({ date, ...restOfEvent }) => ({
            ...restOfEvent,
            date: date.toISOString(),
          }));

        expect(response.status).toBe(StatusCodes.OK);
        expect(response.data).toStrictEqual(EXPECTED);
      });
    });
  });
});
