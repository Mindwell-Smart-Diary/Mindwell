import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../../middleware/auth";
import { prisma } from "../../../../prisma/prismaClient";
import { suggestionPatchSchema } from "./schema";
import { NotFoundError } from "../../../../errors/NotFoundError";
import { BadRequestError } from "../../../../errors/BadRequestError";
import {
  getSuggestion,
  updateSuggestion,
} from "../../../../repository/suggestions.repository";

export const patchSuggestionHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.user;

  try {
    const patch = suggestionPatchSchema.parse(req.body);

    if (Object.keys(patch).length === 0) {
      throw new BadRequestError("Body must have at least one field");
    }

    const suggestionId = Number(req.params.id);
    const suggestion = await getSuggestion(prisma, suggestionId, {
      withEvent: true,
    });

    if (!suggestion || suggestion.event.user_id !== userId) {
      throw new NotFoundError("Couldn't find requested suggestion");
    }

    const newSuggestion = await updateSuggestion(prisma, suggestionId, patch);

    res.json(newSuggestion);
  } catch (e) {
    next(e);
  }
};
