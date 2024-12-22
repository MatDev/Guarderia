import { sign, verify, decode, SignOptions } from 'jsonwebtoken';
import { ENV } from '../../configuration/enviorement.config';
import { User } from '../../entity/User';

export class JwtService {
    private jwtSecret: string;
    private jwtExpireAccess: string;
    private jwtExpireRefresh: string;

    constructor({ jwtSecret, jwtExpireAccess, jwtExpireRefresh }: { 
        jwtSecret: string; 
        jwtExpireAccess: string; 
        jwtExpireRefresh: string 
    }) {
        this.jwtSecret = jwtSecret;
        this.jwtExpireAccess = jwtExpireAccess;
        this.jwtExpireRefresh = jwtExpireRefresh;
    }
   
    public generateAccessToken(user: User): string {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        return sign(payload, this.jwtSecret, { expiresIn: this.jwtExpireAccess });
    }

    public generateRefreshToken(user: User): string {
        const payload = {
            id: user.id,
            email: user.email,
           
        };
        return sign(payload, this.jwtSecret, { expiresIn: this.jwtExpireRefresh });
    }

    public verify(token: string): any {
        return verify(token, this.jwtSecret);
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