import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { adminRoutes } from '../modules/Admin/admin.routes';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { SpecialtyRoutes } from '../modules/Speciality/speciality.route';

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
    path: '/speciality',
    route: SpecialtyRoutes
  }
];

moduleRoutes.forEach(route => mainRouter.use(route.path, route.route));

export default mainRouter;