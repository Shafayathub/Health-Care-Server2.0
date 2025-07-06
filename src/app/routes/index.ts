import express from 'express';
import { userRoutes } from '../modules/User/user.routes';


const mainRouter = express.Router();

// This array will hold all the routes from your different modules
const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes
  }
];

// This loop automatically registers all the module routes
moduleRoutes.forEach(route => mainRouter.use(route.path, route.route));

export default mainRouter;