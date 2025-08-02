import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { adminRoutes } from '../modules/Admin/admin.routes';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { SpecialtyRoutes } from '../modules/Speciality/speciality.route';
import { DoctorRoutes } from '../modules/Doctor/doctor.route';

const mainRouter = express.Router();

// This array will hold all the routes from your different modules
const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes
  },
  {
    path: '/admin',
    route: adminRoutes
  },
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/specialty',
    route: SpecialtyRoutes
  },
  {
    path: '/doctor',
    route: DoctorRoutes
  }
];

moduleRoutes.forEach(route => mainRouter.use(route.path, route.route));

export default mainRouter;