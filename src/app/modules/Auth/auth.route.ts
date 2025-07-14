import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/Auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/login", AuthController.loginUser);

router.post("/refresh-token", AuthController.refreshToken);

router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.PATIENT, UserRole.DOCTOR),
  AuthController.changePassword
);

export const AuthRoutes = router;
