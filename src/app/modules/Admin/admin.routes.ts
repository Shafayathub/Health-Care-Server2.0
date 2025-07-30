import express from 'express';
import { adminController } from './admin.controller';
import { adminValidationSchemas } from './admin.validations';
import validateRequest from '../../middlewares/ValidateRequest';

const router = express.Router();

router.get("/", adminController.getAllAdmin)
router.get("/:id", adminController.getSingleAdmin) 
router.patch("/:id",validateRequest(adminValidationSchemas.update), adminController.updateAdmin)
router.delete("/:id", adminController.deleteAdmin)
router.delete("/soft-delete/:id", adminController.softDeleteAdmin)


export const adminRoutes = router;