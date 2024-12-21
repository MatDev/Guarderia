import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";


const authRoutes = Router();


const authController = new AuthController();


authRoutes.post('/login', (req, res) => authController.login(req, res));
authRoutes.post('/logout', (req, res) => authController.logout(req, res));
authRoutes.post('/refresh', (req, res) => authController.refreshToken(req, res));

export default authRoutes;


