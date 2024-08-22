import { Response, NextFunction } from "express";
import { AuthRequest } from "../../../../middleware/auth";
import { queryParamsSchema } from "./schema";
import { validateData } from "../../../../middleware/zodValidate";
import {
  getEvents,
  getKeywordsByPrefix,
} from "../../../../services/events.service";
import { prisma } from "../../../../prisma/prismaClient";
import { z } from "zod";

export const getEventsHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.user;

  try {
    const {
      keywords,
      keywordsPrefix,
      ...options
    }: z.infer<typeof queryParamsSchema> = validateData(
      queryParamsSchema,
      {
        withSuggestions: req.query.withSuggestions === "true",
        date: isNaN(Number(req.query.date))
          ? req.query.date
          : Number(req.query.date),
        keywords: req.query.keywords,
        keywordsPrefix: req.query.keywordsPrefix,
      },
      "Invalid query params"
    );

    const allKeywords = [
      ...(keywords?.split(",") ?? []),
      ...(keywordsPrefix?.split(",") ?? []),
      ...(await Promise.all(
        (keywordsPrefix?.split(",") ?? []).map((prefix) =>
          getKeywordsByPrefix(userId, prefix)
        )
      ).then((keywords) => keywords.flat())),
    ];

    const events = await getEvents(prisma, userId, {
      date: options.date,
      withSuggestions: options.withSuggestions,
      keywords: allKeywords,
    });

    res.json(events);
  } catch (e) {
    next(e);
  }
};
