import { Request, Response } from 'express';
import { AutheticationResponseDto } from '../../dto/response/authentication.response.sto';
import { JwtService } from '../../security/service/jwt.service';
import { UserRepository } from '../../repository/impements/user.implements.repository';
import { AuthConstant } from '../../utils/constants/auth.constant';
import { User } from '../../entity/User';
import { AuthenticationError } from '../../exeption/authentication.error';
import { NotFoundError } from '../../exeption/not.found.error';
import { AuthServiceInterface } from '../interface/auth.interface.service';
import { LoginDto } from '../../dto/request/authentication.request.dto';
import { TokenRepository } from '../../repository/impements/token.implements.repository';
import { Token } from '../../entity/Token';
import { TokenType } from '../../utils/enum/token.type';
import { AppDataSource } from '../../configuration/database.config';
import { PasswordEncoder } from '../../utils/password.encoder';


export class AuthService implements AuthServiceInterface {
    private userRepository:UserRepository;
    private jwtService:JwtService;
    private tokenRepository:TokenRepository;
    

    constructor(userRepository?:UserRepository, jwtService?:JwtService, tokenRepository?:TokenRepository){
        this.userRepository=userRepository || new UserRepository(AppDataSource);
        this.jwtService=jwtService || JwtService.getInstance();
        this.tokenRepository=tokenRepository || new TokenRepository(AppDataSource);
    }

    public async login(loginDto: LoginDto): Promise<AutheticationResponseDto | null> {
        console.info("autenticado usuario:", loginDto.email);
        const user = await this.userRepository.findByEmail(loginDto.email);
        if (!user) {
            console.error('User not found');
            throw new NotFoundError('User', loginDto.email);
        }
        if (!await this.isMatchPassword(loginDto.password, user.password)) {
            console.error('Password incorrect');
            throw new AuthenticationError('Password incorrect');
        }
        const accessToken = this.jwtService.generateAccessToken(user);
        const refreshToken = this.jwtService.generateRefreshToken(user);
        await this.revokeAllUserTokens(user);
        await this.saveUserToken(user, accessToken, TokenType.BEARER);
        await this.saveUserToken(user, refreshToken, TokenType.REFRESH);
        return this.buildAuthResponse(accessToken, refreshToken);

    }
    public async logout(refreshToken: string): Promise<void> {
        
    }


    public async refreshToken(req: Request, res: Response): Promise<void> {
        const authorizationHeader = req.headers[AuthConstant.AUTHORIZATION_HEADER.toLowerCase()];
        if (!authorizationHeader) {
            console.error('Authorization header not found');
            throw new AuthenticationError('Authorization header not found');
        }

        const token = this.extractTokenFromHeader(authorizationHeader as string);
        if (!token) {
            throw new AuthenticationError('Token not found');
        }

        const userId = this.jwtService.extractUserId(token);
        this.processRefreshToken(token, res, userId);
    }

    private extractTokenFromHeader(authorizationHeader: string): string {
        if (authorizationHeader.startsWith(AuthConstant.BEARER_PREFIX)) {
            return authorizationHeader.substring(AuthConstant.BEARER_PREFIX.length);
        }
        throw new AuthenticationError('invalid authorization header format');
    }

    private async processRefreshToken(refreshToken: string, response: Response, userId: string): Promise<void> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User', userId);
        }
        if (this.jwtService.isTokenValid(refreshToken, user)) {
            const accessToken = this.jwtService.generateAccessToken(user);
            const refreshToken = this.jwtService.generateRefreshToken(user);
            this.revokeAllUserTokens(user);
            this.saveUserToken(user, accessToken, TokenType.BEARER);
            this.saveUserToken(user, refreshToken, TokenType.REFRESH);
            this.writeAuthResponse(response, this.buildAuthResponse(accessToken, refreshToken));
        }
        
    }

    private writeAuthResponse(response: Response, authResponse: AutheticationResponseDto): void {
        response.setHeader(AuthConstant.CONTENT_TYPE_HEADER, 'application/json');
        response.status(200).json(authResponse);
    }

    private buildAuthResponse(token: string, refreshToken: string): AutheticationResponseDto {
        const response = new AutheticationResponseDto();
        response.token = token
        response.refreshToken = refreshToken
        return response;
    }


    private async revokeAllUserTokens(user: User): Promise<void> {
        var validUserTokens = await this.tokenRepository.findAllTokenValid(user);
        if (validUserTokens.length == 0) {
            console.info('No valid tokens found');
            return;
        }
        console.info('se encontraron' + validUserTokens.length + 'tokens validos');
        
        for (const token of validUserTokens) {
            console.info('Revoking token:', token.accessToken, token.revocado , token.expirado);
            token.revocado = true;
            token.expirado = true;
            console.info('Token revoked:', token.accessToken, token.revocado , token.expirado);
        }

        await this.tokenRepository.saveAllTokens(validUserTokens);
    }

    private async saveUserToken(user: User, accessToken: string, tokenType:TokenType): Promise<void> {
        const token = new Token();
        token.accessToken = accessToken
        token.usuario = user;
        token.tokenType = tokenType
        token.expirado = false;
        token.revocado = false;

        try {
            await this.tokenRepository.saveAllTokens([token]);
        } catch (error) {
            console.error('Error to save token', error);
            throw new Error('Error to save token');
        }



    }

    private async isMatchPassword(password: string, userPassword: string): Promise<boolean> {
        return await PasswordEncoder.comparePassword(password, userPassword);
    }




}