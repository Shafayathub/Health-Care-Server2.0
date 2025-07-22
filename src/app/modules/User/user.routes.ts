import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/Auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../utility/fileUploader";
import validateRequest from "../../middlewares/ValidateRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-admin",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.single("file"),
  validateRequest(userValidation.createAdminZodSchema),
  userController.createAdmin
);

router.post(
  "/create-doctor",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),

  fileUploader.upload.single("file"),
  validateRequest(userValidation.createDoctorZodSchema),
  userController.createDoctor
);
router.post(
  "/create-patient",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.PATIENT, UserRole.DOCTOR),
  validateRequest(userValidation.createPatientZodSchema),
  fileUploader.upload.single("file"),
  userController.createPatient
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userController.getAllUser
);

export const userRoutes = router;
