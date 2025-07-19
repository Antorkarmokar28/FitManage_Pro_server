import { Router } from "express";
import validationRequest from "../../middlewares/validationRequest";
import { userSchema } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();
router.post(
  "/register",
  validationRequest(userSchema),
  authController.userRegistration
);

export const authRouter = router;
