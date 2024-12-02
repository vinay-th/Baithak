import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
const routes = Router();
// POST Login route
routes.post('/auth/login', AuthController.login);
export default routes;
