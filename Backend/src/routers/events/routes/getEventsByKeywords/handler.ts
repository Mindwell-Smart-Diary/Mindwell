import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../../middleware/auth";
import { validateData } from "../../../../middleware/zodValidate";
import { queryParamsSchema } from "./schema";
import { getKeywordsByPrefix } from "../../../../services/events.service";

export const getKeywords = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.user;

  try {
    const options = validateData(
      queryParamsSchema,
      req.query,
      "Invalid query params"
    );

    const keywords = await getKeywordsByPrefix(userId, options.prefix);

    res.json({ keywords });
  } catch (e) {
    next(e);
  }
};
