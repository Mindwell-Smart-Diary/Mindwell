import { Router } from "express";
import { loginHandler } from "./routes/login/loginHandler";
import { validateDataMiddleware } from "../../middleware/zodValidate";
import { loginSchema } from "./routes/login/schema";
import { registerHandler } from "./routes/register/registerHandler";
import { logoutHandler } from "./routes/logout/logoutHandler";
import { refreshHandler } from "./routes/refresh/refreshHandler";
import { registerSchema } from "./routes/register/schema";

export const buildAuthRouter = () => {
  const router = Router();

  router.post(
    "/register",
    validateDataMiddleware(registerSchema),
    registerHandler
  );
  router.post("/login", validateDataMiddleware(loginSchema), loginHandler);
  router.get("/logout", logoutHandler);
  router.get("/refresh", refreshHandler);

  return router;
};
