import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { jwtVerify } from "../utils/jwtPromises";
import { Configuration } from "../config/Configuration";

export interface AuthRequest extends Request {
  user?: { id: number };
}

export const authorizeUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { JWT_SECRET } = Configuration.getInstance();
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
  try {
    if (token == null) throw new UnauthorizedError("Missing access token");
    const user = await jwtVerify(token, JWT_SECRET!);
    console.log(user);
    req.user = user as { id: number };

    next();
  } catch (err) {
    if (err instanceof ApiError) {
      next(err);
    } else {
      next(new UnauthorizedError("Invalid access token"));
    }
  }
};
