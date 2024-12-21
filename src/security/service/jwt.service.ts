import { sign, verify, decode, SignOptions } from 'jsonwebtoken';
import { ENV } from '../../configuration/enviorement.config';
import { User } from '../../entity/User';

export class JwtService {
    private static instance: JwtService;

    private constructor() { }

    public static getInstance(): JwtService {
        if (!JwtService.instance) {
            JwtService.instance = new JwtService();
        }
        return JwtService.instance;
    }

    public generateAccessToken(user: User): string {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        return sign(payload, ENV.JWT.SECRET, { expiresIn: ENV.JWT.EXPIRE.JWT });
    }

    public generateRefreshToken(user: User): string {
        const payload = {
            id: user.id,
            email: user.email,
           
        };
        return sign(payload, ENV.JWT.SECRET, { expiresIn: ENV.JWT.EXPIRE.REFRESH });
    }

    public verify(token: string): any {
        return verify(token, ENV.JWT.SECRET);
    }

    public decode(token: string): any {
        return decode(token);
    }

    public extractUserId(token: string): string {
        const payload = this.decode(token);
        return payload.id;
    }

    public isTokenValid(refreshToken:string, user:User): boolean {
        const payload = this.verify(refreshToken);
        if (payload.id !== user.id) {
            return false;
        }
        return true;
    }
}