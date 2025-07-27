import express, { NextFunction, Request, Response } from "express";
import { SpecialtiesController } from "./speciality.controller";
import { fileUploader } from "../../utility/fileUploader";
import validateRequest from "../../middlewares/ValidateRequest";
import { SpecialtiesValidtaion } from "./speciality.validation";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/Auth";

const router = express.Router();

// Task 1: Retrieve Specialties Data

/**
- Develop an API endpoint to retrieve all specialties data.
- Implement an HTTP GET endpoint returning specialties in JSON format.
- ENDPOINT: /specialties
*/
router.get("/", SpecialtiesController.getAllFromDB);

router.post(
  "/",
  fileUploader.upload.single("file"),
  validateRequest(SpecialtiesValidtaion.create),
  SpecialtiesController.inserIntoDB
);

// Task 2: Delete Specialties Data by ID

/**
- Develop an API endpoint to delete specialties by ID.
- Implement an HTTP DELETE endpoint accepting the specialty ID.
- Delete the specialty from the database and return a success message.
- ENDPOINT: /specialties/:id
*/

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  SpecialtiesController.deleteFromDB
);

export const SpecialtyRoutes = router;
