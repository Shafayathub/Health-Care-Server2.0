import express from 'express';
import { adminController } from './admin.controller';

const router = express.Router();

router.get("/", adminController.getAllAdmin)
// router.get("/:id", adminController.getSingleAdmin) 


export const adminRoutes = router;