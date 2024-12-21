import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../configuration/database.config";
import { TokenRepository } from "../../repository/impements/token.implements.repository";
import { JwtService } from "../service/jwt.service";
import { AuthConstant } from "../../utils/constants/auth.constant";
import { AuthenticationError } from "../../exeption/authentication.error";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

const jwtService= JwtService.getInstance();
const tokenRepository= new TokenRepository(AppDataSource);
export const AuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
console.info('AuthenticationMiddleware');
    try {
    
    const authorizationHeader: string | null = req.headers[AuthConstant.AUTHORIZATION_HEADER.toLowerCase()] as string | null;
    if (isInvalidAuthorizationHeader(authorizationHeader)) {
        console.error('Head Authorization not valid');
        throw new AuthenticationError('Authorization header not found');
    }
    const token = extractTokenFromHeader(authorizationHeader as string);
    try {
    const userId= jwtService.extractUserId(token);
    } catch (error) {
        if (error instanceof TokenExpiredError) {
        console.error('Token exprado:', error);
        throw new AuthenticationError('Token expirado');
        }else if(error instanceof JsonWebTokenError){
        console.error('Token invalido:', error);
        throw new AuthenticationError('Token invalido');
        }else{
        console.error('Error al verificar token:', error);
        throw new AuthenticationError('Error al verificar token');
        }
    }
    const tokenEntity = await tokenRepository.findByAccesToken(token);

    if (tokenEntity.expirado || tokenEntity.revocado) {
        console.error('Token invalido');
        throw new AuthenticationError('Token invalido');
    }

    console.log('Token valido:', tokenEntity);
    req.body.userId = tokenEntity.usuario.id;
    req.body.userRole = tokenEntity.usuario.role;

    next();



}catch (error) {
    console.error('Error AuthenticationMiddleware:', error);
    res.status(400).json({ message: 'Error AuthenticationMiddleware', error: error instanceof Error ? error.message : 'Unknown error' });
}

}


const isInvalidAuthorizationHeader = (authorizationHeader: string | null): boolean => {
    return authorizationHeader===null || !authorizationHeader.startsWith(AuthConstant.BEARER_PREFIX);
}

const extractTokenFromHeader = (authorizationHeader: string): string => {
    return authorizationHeader.split(' ')[1];
}

