import { AuthService } from "../service/implement/auth.service";
import { Request, Response } from "express";

export class AuthController {
    private authService: AuthService;

    constructor(authService?: AuthService) {
        this.authService = authService || new AuthService();
    }
    public async login(req: Request, res: Response) {
        try {
            const loginDto = req.body;
            const authResponse = await this.authService.login(loginDto);
            res.status(200).json(authResponse);
        } catch (error) {
            console.error('Error login:', error);
            res.status(400).json({ message: 'Error login', error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
    public async logout(req: Request, res: Response) {
        try {
            const refreshToken = req.body.refreshToken;
            await this.authService.logout(refreshToken);
        } catch (error) {
            console.error('Error logout:', error);
            res.status(400).json({ message: 'Error logout', error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
    public async refreshToken(req: Request, res: Response) {
        try {
            await this.authService.refreshToken(req, res);
        } catch (error) {
            console.error('Error refreshToken:', error);
            res.status(400).json({ message: 'Error refreshToken', error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
}