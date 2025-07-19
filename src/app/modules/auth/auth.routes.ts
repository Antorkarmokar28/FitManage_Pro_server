import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { loginValidationSchema, userSchema } from './auth.validation';
import { authController } from './auth.controller';

const router = Router();

router.post(
  '/register',
  validationRequest(userSchema),
  authController.userRegistration,
);

router.post(
  '/login',
  validationRequest(loginValidationSchema),
  authController.userLogin,
);

export const authRouter = router;
