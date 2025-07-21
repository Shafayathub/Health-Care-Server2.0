import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/Auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../utility/fileUploader";
import validateRequest from "../../middlewares/ValidateRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post("/create-admin", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(userValidation.createAdminZodSchema), fileUploader.upload.single('file'), userController.createAdmin);
router.post("/create-doctor", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(userValidation.createDoctorZodSchema), fileUploader.upload.single('file'), userController.createDoctor);
router.post("/create-patient", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.PATIENT, UserRole.DOCTOR  ), validateRequest(userValidation.createPatientZodSchema), fileUploader.upload.single('file'), userController.createPatient);

export const userRoutes = router;