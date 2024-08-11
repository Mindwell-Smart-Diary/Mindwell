import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../../middleware/auth";
import { createEventSchema } from "./schema";
import { saveEvent } from "../../../../services/events.service";

export const saveNewEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = req.user;
  try {
    const { event } = createEventSchema.parse(req.body);

    const savedEvent = await saveEvent(event, userId);

    res.json(savedEvent);
  } catch (e) {
    console.log(e);
    next(e);
  }
};
