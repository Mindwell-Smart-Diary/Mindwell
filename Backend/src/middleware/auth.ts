import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { jwtVerify } from "../utils/jwtPromises";

export interface AuthRequest extends Request {
  user?: { userId: string };
}

export const authorizeUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  try {
    if (token == null) throw new UnauthorizedError("Missing access token");

    const user = await jwtVerify(token, process.env.JWT_SECRET!);
    req.user = user as { userId: string };

    next();
  } catch (err) {
    if (err instanceof ApiError) {
      next(err);
    } else {
      next(new UnauthorizedError("Invalid access token"));
    }
  }
};
