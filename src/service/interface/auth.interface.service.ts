import { LoginDto } from "../../dto/request/authentication.request.dto";
import { AutheticationResponseDto } from "../../dto/response/authentication.response.sto";
import { Request,Response } from "express";

export interface AuthServiceInterface {
    login(loginDto:LoginDto):Promise<AutheticationResponseDto | null>;
    logout(refreshToken:string):Promise<void>;
    refreshToken(req: Request, res:Response):Promise<void>;
}