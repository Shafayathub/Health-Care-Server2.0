import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/Auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/create-admin", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), userController.createAdmin)

export const userRoutes = router;