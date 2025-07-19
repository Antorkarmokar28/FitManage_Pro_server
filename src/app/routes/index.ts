import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes";

const router = Router();

const routeModules = [
  {
    path: "/auth",
    route: authRouter,
  },
];
routeModules.forEach((route) => router.use(route.path, route.route));

export default router;
