import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { classRouter } from '../modules/class/class.routes';

const router = Router();

const routeModules = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/classes',
    route: classRouter,
  },
];
routeModules.forEach((route) => router.use(route.path, route.route));

export default router;
