import express from "express";

import { validateBody, authenticate } from "../../middlewares";
import { authControllers } from "../../controllers";
import { schemas } from "../../models/user/user";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  authControllers.register
);

authRouter.post(
  "/login",
  validateBody(schemas.loginSchema),
  authControllers.login
);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

export default authRouter;
