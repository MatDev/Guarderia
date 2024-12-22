import * as bcrypt from 'bcrypt';

export class PasswordEncoder{
    private constructor(){
        throw new Error('No se puede instanciar la clase PasswordEncoder');
    }
    static async encodePassword(password: string): Promise<string>{
        return bcrypt.hash(password, 10);
    }
    static async comparePassword(password: string, hash: string): Promise<boolean>{
        return bcrypt.compare(password, hash);
    }

}