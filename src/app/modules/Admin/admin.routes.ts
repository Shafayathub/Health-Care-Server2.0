import express from 'express';
import { adminController } from './admin.controller';
import { adminValidationSchemas } from './admin.validations';
import validateRequest from '../../middlewares/ValidateRequest';
import auth from '../../middlewares/Auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get("/",auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminController.getAllAdmin);
router.get("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminController.getSingleAdmin) 
router.patch("/:id",auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), validateRequest(adminValidationSchemas.update), adminController.updateAdmin)
router.delete("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminController.deleteAdmin)
router.delete("/soft-delete/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), adminController.softDeleteAdmin)


export const adminRoutes = router;