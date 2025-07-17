import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/Auth";
import { UserRole } from "@prisma/client";
import { fileUploader } from "../../utility/fileUploader";

const router = express.Router();

router.post("/create-admin", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), fileUploader.upload.single('file'), userController.createAdmin);



export const userRoutes = router;