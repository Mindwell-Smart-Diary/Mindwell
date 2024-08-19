import { Router } from "express";
import { validateDataMiddleware } from "../../middleware/zodValidate";
import { patchUserHandler } from "./patchUser/handler";
import { userPatchSchema } from "./patchUser/schema";
import { userDetailsHandler } from "./getUserDetails/handler";

export const buildUsersRouter = () => {
  const router = Router();

  router.patch(
    "/:id",
    validateDataMiddleware(userPatchSchema),
    patchUserHandler
  );

  router.get("/:id", userDetailsHandler);

  return router;
};
