import { DataSource, Equal, Repository } from "typeorm";
import { Token } from "../../entity/Token";
import { TokenInterfaceRepository } from "../interface/token.interface.repository";
import { NotFoundError } from "../../exeption/not.found.error";
import { User } from "../../entity/User";




export class TokenRepository implements TokenInterfaceRepository {
    private repository: Repository<Token>;
    constructor(datasource: DataSource) {
        this.repository = datasource.getRepository(Token);
    }
    public async findByAccesToken(accessToken: string): Promise<Token> {
        return this.repository.findOne({ where: { accessToken: accessToken } }).then(token => {
            if (!token) {
                throw new NotFoundError('Token', accessToken);
            }
            return token;
        });
        
    }
    public async findAllTokenValid(user:User): Promise<Token[]> {
        return this.repository.find({
            where: {
                usuario: user,
                revocado: false,
                expirado: false
            }
        });
    }

    public async saveAllTokens(tokens: Token[]): Promise<Token[]> {
        return this.repository.save(tokens);
    }
    

   
}
